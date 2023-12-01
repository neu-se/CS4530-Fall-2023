---
layout: page
title: Emitters
permalink: /tutorials/emitters
parent: Tutorials
nav_order: 4
---

This tutorial covers the basics of the emitter design pattern. By the end of this tutorial, you will have an understanding of the fundamentals of emitters, serving as a foundation for more advanced topics such as sockets.

Contents:

- [Understanding Emitters](#understanding-emitters)
- [Implementing Emitters](#implementing-emitters)
  - [Events](#events)
  - [Emitting Events](#emitting-events)
  - [Handling Events](#event-handlers)
- [Emitters in Covey.Town](#emitters-in-coveytown)
- [What's Next?](#whats-next)

# Understanding Emitters
Emitters use a "publisher-subscriber" relationship to facilitate asynchronous communication between two programs.One program acts as the emitter (the publisher), and other programs can listen to the events emitted by the emitter (i.e. these programs subscribe to the publisher)

# Implementing Emitters
Consider the following example:

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
Events allow emitters to emit/listen to specific events at the developer's discretion, allowing for more control over their application's interactions. Let's again consider the previous example.

```ts
type ClockEvents = {
    reset: () => void
    tick: (time: number) => void, // carries the current time
}
```

The above `ClockEvents` type defines 2 events for any emitter that decides to use them. The function signature following the event name refers to the type of data that is passed when the event is emitted. For example, when a `tick` event is emitted, a number representing the time is emitted along with it, and event handlers can use this time however they please. This concept will make more sense when we talk about emitting and handling events below.

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

In this class, an emitter is defined with the events discussed in the previous section (`TypedEmitter` is an interface that allows for emitter implementations using TypeScript). Following this, the `getEmitter()` method provides the emitter object to any listeners that wish to listen to events from the server. When the `demo` method is invoked, any listeners that are listening to the `tick` and `reset` events will be notified, and those listeners can handle those however they please. In this specific example, the `tick` event is being emitted with `time = 1`, and the `reset` event is not emitted with any additional data as per the `ClockEvents` definition.

## Event Handlers
But how do the listeners handle the events?

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

# Emitters in Covey.Town
As you may have noticed, there are numerous instances within the Covey.Town application that take advantage of the socket architecture. One of the most significant examples of this is the `interactableUpdate` event, which is used numerous times throughout the application. Consider this event handler from `TownController.ts`.

```ts
 private set _players(newPlayers: PlayerController[]) {
    this.emit('playersChanged', newPlayers);
    this._playersInternal = newPlayers;
  }
```
This function emits a `playersChanged` event whenever the players in the Town have been updated. Now we consider one of the listeners to this event:

```ts
export function usePlayers(): PlayerController[] {
  const townController = useTownController();
  const [players, setPlayers] = useState<PlayerController[]>(townController.players);
  useEffect(() => {
    townController.addListener('playersChanged', setPlayers);
    return () => {
      townController.removeListener('playersChanged', setPlayers);
    };
  }, [townController, setPlayers]);
  return players;
}
```
When the `playersChanged` event is invoked, this custom hook sets the players using `setPlayers`, allowing any components that use this hook to maintain an updated list of the players.



## What's Next?
Now that you have a solid understanding of how emitters are implemented and utilized, we can consider one of the most widely used applications of this pattern: sockets.