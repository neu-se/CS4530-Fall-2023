---
layout: page
title: Sockets
permalink: /tutorials/sockets
parent: Tutorials
nav_order: 4
---

This tutorial covers the basics of Socket architecture. By the end of this tutorial, you will have an understanding of how sockets work and how they are applied in real-world examples, such as Covey.Town.
*Note: this tutorial assumes you have an understanding of the emitter pattern. If you need a review, please see the Emitters Tutorial on the course site.

Contents:

- [Understanding Sockets](#understanding-sockets)
- [Implementing sockets](#implementing-sockets)
  - [Writing a Socket Client](#events)
  - [Writing a Socket Server](#emitting-events)
  - [Putting it All Together](#event-handlers)
- [Sockets in Covey.Town](#sockets-in-coveytown)
- [What's Next?](#whats-next) 


# Understanding Sockets
Sockets are a powerful networking tool that allows for bidirectional communication between a client and server. They are used widely throughout various applications, such as chat apps and online games. Whereas a traditional server-client relationship for a chat server may require clients to constantly check with the server if any new messages have been posted, sockets allow a client to push a message to the server, then have the server push that message to all connected clients, hence taking advantage of the bidirectionality of a socket.

In this tutorial, we will discuss how sockets are used in Covey.Town.

# Implementing Sockets
For this tutorial, we will look at example implementations of sockets in Covey.Town:


## Socket Message Structure

Socket messages (i.e. the actual data being passed through the socket) have a structure that is defined by the developer to suit the application's needs. While this structure may vary from application to application, there are a few key items to consider:
- Messages should have a unique identifier so that they can be acknowledged (if necessary)
- Messages should have a "type" associated with them
- Events should be clearly defined so that we know what message type to send with each event

To emphasize this point, we'll take a look at how Covey.Town implements sockets on both the client and server.

## Writing a Socket Client

This is a simple definition of a Socket from `socket.io-client`. The snippet below
```ts
import { Socket } from 'socket.io-client';
/* eslint-disable import/no-relative-packages */
import { ClientToServerEvents, ServerToClientEvents } from '../../../shared/types/CoveyTownSocket';
/* eslint-disable import/no-relative-packages */
export * from '../../../shared/types/CoveyTownSocket';

export type CoveyTownSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
```
As we can see above, `CoveyTownSocket` uses the socket import from `socket.io-client`. The type parameters for a Socket.IO socket are \<ListenEvents, EmittedEvents\>, and as such, this socket has been parameterized with `ServerToClientEvents` (the events the client is listening to) and `ClientToServerEvents` (the events the client is emitting). Below we have the definition of these events:

```ts
export interface ServerToClientEvents {
  playerMoved: (movedPlayer: Player) => void;
  playerDisconnect: (disconnectedPlayer: Player) => void;
  playerJoined: (newPlayer: Player) => void;
  initialize: (initialData: TownJoinResponse) => void;
  townSettingsUpdated: (update: TownSettingsUpdate) => void;
  townClosing: () => void;
  chatMessage: (message: ChatMessage) => void;
  interactableUpdate: (interactable: Interactable) => void;
  commandResponse: (response: InteractableCommandResponse) => void;
}

export interface ClientToServerEvents {
  chatMessage: (message: ChatMessage) => void;
  playerMovement: (movementData: PlayerLocation) => void;
  interactableUpdate: (update: Interactable) => void;
  interactableCommand: (command: InteractableCommand & InteractableCommandBase) => void;
}
```

By creating these interfaces, our socket supports a fixed set of events that each have their own meaning and data types associated with them. Keeping in line with the message structure guidelines mentioned above, all of these events specify the type of data that is being passed through the socket, and the events that require acknowledgement have a unique identifier embedded into the type definition. For example, the `interactableCommand` event expects a response after , so we add an `commandID` attribute to the `InteractableCommandBase` type to accommodate this:
```ts
interface InteractableCommandBase {
  /**
   * A unique ID for this command. This ID is used to match a command against a response
   */
  commandID: CommandID;
  /**
   * The ID of the interactable that this command is being sent to
   */
  interactableID: InteractableID;
  /**
   * The type of this command
   */
  type: string;
}
```

## Writing a Socket Server
After setting up the

```ts
// Create the server instances
const app = Express();
app.use(CORS());
const server = http.createServer(app);
const socketServer = new SocketServer<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: { origin: '*' },
});
```

As seen above, the socket server sets up the same events as the client-side socket does, but the type parameters are reversed, as the server is listening for `ClientToServerEvents` and emitting `ServerToClientEvents`. Note that the socket defined above is a different import than the one used for the client:
```ts
import { Server as SocketServer } from 'socket.io';
```

## Putting it All Together
Now that we know how to define our sockets for both the client and server, let's look at an example of these sockets communicating. Below we have the `sendInteractableCommand` from the `townController` on the frontend, meaning the socket being used here refers to the client-side socket.
```ts
/**
   * Sends an InteractableArea command to the townService. Returns a promise that resolves
   * when the command is acknowledged by the server.
   *
   * If the command is not acknowledged within SOCKET_COMMAND_TIMEOUT_MS, the promise will reject.
   *
   * If the command is acknowledged successfully, the promise will resolve with the payload of the response.
   *
   * If the command is acknowledged with an error, the promise will reject with the error.
   *
   * @param interactableID ID of the interactable area to send the command to
   * @param command The command to send @see InteractableCommand
   * @returns A promise for the InteractableResponse corresponding to the command
   *
   **/
  public async sendInteractableCommand<CommandType extends InteractableCommand>(
    interactableID: InteractableID,
    command: CommandType,
  ): Promise<InteractableCommandResponse<CommandType>['payload']> {
    const commandMessage: InteractableCommand & InteractableCommandBase = {
      ...command,
      commandID: nanoid(),
      interactableID: interactableID,
    };
    return new Promise((resolve, reject) => {
      const watchdog = setTimeout(() => {
        reject('Command timed out');
      }, SOCKET_COMMAND_TIMEOUT_MS);

      const ackListener = (response: InteractableCommandResponse<CommandType>) => {
        if (response.commandID === commandMessage.commandID) {
          clearTimeout(watchdog);
          this._socket.off('commandResponse', ackListener);
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.payload);
          }
        }
      };
      this._socket.on('commandResponse', ackListener);
      this._socket.emit('interactableCommand', commandMessage);
    });
  }
```
The above function may seem complex, but it
- Create a message to send to the server
- Set up a timer in the event that the server takes too long to respond (i.e. the command times out)
- Set up a listener 
- Add the listener as , and emit the command to the server

This timer step is critical to the smooth operation of these sockets. Acknowledgement is a common networking problem, and so the client needs safeguards in place in the event that the server takes too long to respond. As previously mentioned, the `commandID` attribute is added to this message type so that the server can "acknowledge" this specific command.

Now let's see how the server-side socket handles these events:
```ts
socket.on('interactableCommand', (command: InteractableCommand & InteractableCommandBase) => {
      const interactable = this._interactables.find(
        eachInteractable => eachInteractable.id === command.interactableID,
      );
      if (interactable) {
        try {
          const payload = interactable.handleCommand(command, newPlayer);
          socket.emit('commandResponse', {
            commandID: command.commandID,
            interactableID: command.interactableID,
            isOK: true,
            payload,
          });
        } catch (err) {
          if (err instanceof InvalidParametersError) {
            socket.emit('commandResponse', {
              commandID: command.commandID,
              interactableID: command.interactableID,
              isOK: false,
              error: err.message,
            });
          } else {
            logError(err);
            socket.emit('commandResponse', {
              commandID: command.commandID,
              interactableID: command.interactableID,
              isOK: false,
              error: 'Unknown error',
            });
          }
        }
      } else {
        socket.emit('commandResponse', {
          commandID: command.commandID,
          interactableID: command.interactableID,
          isOK: false,
          error: `No such interactable ${command.interactableID}`,
        });
      }
    });
    return newPlayer;
  }
```
Again, this function may seem complicated, but the key takeaway is that when this socket receives the `interactableCommand` event, it dispatches the events necessary (in this case, we find the interactable associated with the `interactableCommand` and let that interactable handle the command) and sends a `commandResponse` event back to the client to signify that the `interactableCommand` has been acknowledged.

*Note: Covey.Town uses TypedEmitters (discussed in the Emitters tutorial on the course page) as an abstraction for socket communication. An example of this is that `TownController` extends `TypedEmitter` but has-a `CoveyTownSocket` (a SocketIO socket) as a private field.
 
# Next Steps
This covers everything you need to know about sockets within the scope of the course. If you are interested in more real world applications of sockets or learning how you might use a socket in your own applications, you are strongly encouraged to check out the [Socket.IO docs](https://socket.io/docs/v4/), as Socket.IO is one of the most popular libraries for integrating sockets into various web applications, and it is the library that Covey.Town uses for its socket handlers.