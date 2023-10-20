---
layout: page
title: Sockets
permalink: /tutorials/sockets
parent: Tutorials
nav_order: 4
---

This tutorial covers the basics of Socket architecture. By the end of this tutorial, you will have an understanding of how sockets work and how they are applied in real-world examples, such as Covey.Town.

Contents:

- [Understanding Sockets](#understanding-sockets)
- [Implementing sockets](#implementing-sockets)
  - [Events](#events)
  - [Emitting Events](#emitting-events)
  - [Handling Events](#event-handlers)
- [Sockets in Covey.Town](#sockets-in-coveytown)
- [What's Next?](#whats-next)

# Understanding Sockets
Sockets are powerful networking tools that are used to establish two-way communication between two programs. The relationship between those programs ultimately varies across applications, but oftentimes you'll see sockets utilized in a client-server architecture. 

# Implementing sockets
Sockets can take on many forms, but at a minimum, they must allow for asynchronous communication between two independent program instances. Consider the following example:

```ts
import { EventEmitter } from "events"
import TypedEmitter from "typed-emitter"
type ClockEvents = {
    reset: () => void
    tick: (time: number) => void, // carries the current time
}

class SampleEmitterServer {
    private emitter = new EventEmitter as TypedEmitter<ClockEvents>
    public getEmitter():TypedEmitter<ClockEvents> {return this.emitter}
    public demo() {
        this.emitter.emit('tick', 1); this.emitter.emit('reset')
    }
}
class SampleEmitterClient {
    constructor (server:SampleEmitterServer) {
    const emitter = server.getEmitter()
        emitter.on('tick', (t:number) => {console.log(t)})
        emitter.on('reset', () => {console.log('reset')})
    }
}
```

There's a lot of moving parts here, so let's break it down step by step.

## Events
Events serve a key role in allowing sockets to be versatile; they allow sockets to emit/listen to specific events at the developer's discretion, allowing for more control over their application's interactions. Let's again consider the previous example.

```ts
type ClockEvents = {
    reset: () => void
    tick: (time: number) => void, // carries the current time
}
```

The above `ClockEvents` type defines 2 events for any socket that decides to use them. The function signature following the event name refers to the type of data that is passed when the event is emitted. For example, when a `tick` event is emitted, a number representing the time is emitted along with it, and event handlers can use this time however they please. This concept will make more sense when we talk about emitting and handling events below.

## Emitting an Event
Now that we understand what events are, let's see how our programs emit and handlers, starting with emitting. 

```ts
class SampleEmitterServer {
    private emitter = new EventEmitter as TypedEmitter<ClockEvents>
    public getEmitter():TypedEmitter<ClockEvents> {return this.emitter}
    public demo() {
        this.emitter.emit('tick', 1); 
        this.emitter.emit('reset')
    }
}
```

In this class, an emitter is defined with the events discussed in the previous section (`TypedEmitter` is an interface that allows for socket connections using TypeScript). Following this, the `getEmitter()` method provides the emitter object to any clients that wish to listen to events from the server. When the `demo` method is invoked, any clients that are listening to the `tick` and `reset` events will be notified, and those clients can handle those however they please. In this specific example, the `tick` event is being emitted with `time = 1`, and the `reset` event is not emitted with any additional data as per the `ClockEvents` definition.

## Event Handlers
But how do the clients handle the events?

```ts
class SampleEmitterClient {
    constructor (server:SampleEmitterServer) {
    const emitter = server.getEmitter()
    emitter.on('tick', (t:number) => {console.log(t)})
    emitter.on('reset', () => {console.log('reset')})
    }
}
```
As previously discussed, this client accesses the emitter object using the `getEmitter` function provided by the server. Following this, the client sets up event handlers; for `tick`, we simply `console.log` the `time` that was emitted by the server, and for `reset`, we just `console.log` the word 'reset' as there is no additional data emitted with this event.

**Note: This specific example is a simple one-way communication between the server and the client. However, we can create a two-way communication by additionally emitting from the client and having event handlers in the server class.

# Sockets in Covey.Town
As you may have noticed, there are numerous instances within the Covey.Town application that take advantage of the socket architecture. One of the most significant examples of this is the `interactableUpdate` event, which is used numerous times throughout the application. Consider this socket event handler from `TownController.ts`.

```ts
this._socket.on('interactableUpdate', interactable => {
      try {
        const controller = this._interactableControllers.find(c => c.id === interactable.id);
        if (controller) {
          const activeBefore = controller.isActive();
          controller.updateFrom(interactable, this._playersByIDs(interactable.occupants));
          const activeNow = controller.isActive();
          if (activeBefore !== activeNow) {
            this.emit('interactableAreasChanged');
          }
        }
      } catch (err) {
        console.error('Error updating interactable', interactable);
        console.trace(err);
      }
    });
```

In this event handler, the `TownController` is responsible for updating the state of an interactable. An interactable will notify the `TownController` that there is a change to be made to the given interactable, and this controller will make those changes and notify other parts of the app as necessary by emitting more events. There are plenty of other events that are defined for use throughout the Covey.Town application, and each event will have its own listeners to update the state of the town as necessary.



## What's Next?
This covers everything you need to know about sockets within the scope of the course. If you are interested in more real world applications of sockets or learning how you might use a socket in your own applications, you are strongly encouraged to check out the [Socket.IO docs](https://socket.io/docs/v4/), as Socket.IO is one of the most popular libraries for integrating sockets into various web applications, and it is the library that Covey.Town uses for its socket handlers.