---
layout: assignment
title: "Individual Project 1"
permalink: /assignments/ip1
parent: Assignments
nav_order: 1
due_date: "Wednesday January 25, 11:00am ET"
submission_notes: Submit via GradeScope
---
**THIS IS THE SPRING 2023 VERSION**{.label .label-color: red}

# Individual Project (Deliverable) 1

Welcome to the Covey.Town team! 
We're glad you're ready to join our development team as a software engineer. 
We're building an open source virtual meeting app, and are happy to see so many new developers who can help make it a reality. 
By semester's end, you'll be able to propose, design, implement and test a new feature for us.
We understand that most of you have limited web development experience, hence, we created a project to help you get up to speed with our codebase and development environment.

Covey.Town is a web app that runs in each client's web browser and also has server. 
Players join the app in a *town*: a 2D arcade-style map with different rooms.
Each town is also a video call, where players near each other can see/hear each other; a text chat is  globally available in town. 
The town has several types of *areas*" that provide interactive functionality for players within their borders. 
The `InteractableArea` is an abstraction that represents the shared functionality for interactive areas. 
Last term, we worked on adding a concept called [Viewing Areas](https://neu-se.github.io/CS4530-Fall-2022/assignments/ip2), allowing players to have "watch parties".
Many student projects (some are [showcased](https://neu-se.github.io/CS4530-Fall-2022/assignments/project-showcase)) involved creating other kinds of flexible interactions such as game areas for several different multi-player games, and file sharing, among others.

This semester, we'll add a new kind of area: a `PosterSessionArea`, which allows players to upload the image of a poster, and for others in the area to discuss that poster in a dedicated chat channel and to *star*" a poster (like stars on GitHub).

Previously, there was a single chat for the entire Town: this term, players will implement a chat for the area they are in -- this means that messages between players in the same area are visible to each other, but not to players outside this area. 
This is implemented as a modification of the `ChatMessage` type to include information about what area it originated from, and inclusion of this information when sending messages from within an area.

The goals for our project are to modify the `ChatMessage` to include area-specific Id and to implement the .`PosterSessionArea`.  This effort will be split across two deliverables. 
In our first deliverable, you will implement and test the backend components for the new `PosterSessionArea`, and in the next deliverable, you will connect these components to the rest of the backend, and implement the frontend components. 

## Objectives

* Learn the basics of VSCode, and our codebase
* Learn how to read and write code in TypeScript
* Translate high-level requirements into code
* Learn how to write unit tests with Jest

## Changelog
* 1/11/23: Updated UML diagram to include `PosterSessionArea` and `ChatMessage` classes
* 1/13/23: Divided the `TownsController.test.ts` tests into 2 files: `TownsController.test.ts` the old file now only has the integration tests for the non-poster-session-area components, and `PosterSessionController.test.ts` has the new tests for `createPosterSessionArea` and the other functions specified in Task 3. Students now need to extend `PosterSessionController.test.ts` with their own tests, and don't need to submit `TownsController.test.ts` (the reason for this split: fixing timeout errors on the test suite) 

## Getting started 

Download the [starter code]({{site.baseurl}}{%link /Assignments/ip1/ip1-handout.zip %}), extract the archive, and run `npm install` to fetch the dependencies. 
We have some basic sanity tests that you will extend.

## Overview of relevant classes

This UML class diagram shows the `PosterSessionArea` and `ChatMessage` classes you will implement, along with  extracts from relevant classes that you will interact with. 
<script src="{{site.baseurl}}/assets/js/mermaid.min.js" />
<div class="mermaid">
 %%{init: { 'theme':'forest', } }%%
classDiagram 
class InteractableArea { 
    +string id 
    ~Player[] _occupants 
    +string[] occupantsByID 
    +boolean isActive 
    +BoundingBox boundingBox 
    +add(player: Player) +remove(player: Player) 
    +addPlayersWithinBounds(allPlayers: Player[]) 
    +toModel() 
    +contains(location: PlayerLocation) 
    +overlaps(otherInteractable: Interactable) #_emitAreaChanged() 
} 
class ViewingArea { 
    +string video 
    +number progress 
    +boolean isPlaying 
    +updateModel(updatedModel:ViewingAreaModel) 
    +fromMapObject(mapObject, townEmitter) 
} 
class ConversationArea { 
    +string? topic 
    +fromMapObject(mapObject, townEmitter) 
} 
class PosterSessionArea { 
    +string imageContents 
    +number stars 
    +string title 
    +updateModel(updatedModel:PosterSessionAreaModel) 
    +fromMapObject(mapObject, townEmitter) 
}
class BoundingBox {
    +number x 
    +number y 
    +number width 
    +number height 
} 
class Player { 
    +PlayerLocation location 
    +string id 
    +string username 
} 
class PlayerLocation { 
    +number x 
    +number y 
    +Direction rotation 
    +boolean moving 
    +string? interactableID 
} 
class Town { 
    +string townID 
    +string friendlyName 
    +InteractableArea[] interactables 
    +Player[] players 
    +void initializeMap(mapFile: string) 
} 
class TownEmitter { 
    +void emit(eventName: ServerToClientEvents, eventData) 
} 
class ServerToClientEvents { 
    +void playerMoved(movedPlayer: Player) 
    +void interactableUpdate(updatedInteractable: Interactable) 
} 
class ChatMessage {
    +string author
    +string sid
    +string body
    +Date dateCreated
    +string? interactableId
}
ViewingArea ..|> InteractableArea 
ConversationArea ..|> InteractableArea 
PosterSessionArea ..|> InteractableArea
InteractableArea o-- BoundingBox 
InteractableArea o-- Player 
InteractableArea o-- TownEmitter 
Player o-- PlayerLocation 
Town o-- Player 
Town o-- InteractableArea 
Town o-- TownEmitter 
TownEmitter -- ServerToClientEvents

</div>

## Grading

You will be scored out of 100 points, 90 of which are automatically awarded by the grading script, the remaining 10 are manually awarded.

Your code will be evaluated for linter errors and warnings. Submissions that have *any* linter errors will automatically receive a grade of 0. **Do not wait to run the linter until the last minute**. To check for linter errors, run the command `npm run lint` from the terminal. The handout contains the eslint configuration used by our grading script.

Your code will be automatically evaluated for functional correctness by a test suite that expands on the core tests that are distributed in the handout. 

Your tests will be automatically evaluated for functional correctness by a process that will inject bugs into our reference solution: to receive full marks your tests must detect a minimum number of injected bugs. 

You will __not__ receive detailed feedback on which injected bugs you do or do not find, and you will __not__ receive detailed feedback on which tests you do or do not pass.

The autograding script will impose a strict rate limit of 5 submissions per 24 hours.
Submissions that fail to grade will not count against the quota.
This limit exists to encourage you to start early on this assignment: from experience this assignment should take between 3-15 hours.

If you start early, you will be able to take full advantage of the resources that we provide to help you succeed: office hours, Piazza and a greater total number of submission attempts.

Your code will be manually evaluated for conformance to our course [style guide]({{ site.baseurl }}{% link style.md %}) (10 points):
* Names (e.g. local variables, methods, etc.) follow our naming conventions
* No unused variables
* Public properties and methods (other than getters, setters, and constructors) are documented with JSDoc-style comments
* No duplicated code that could have been refactored into a shared method.

We will deduct two points for each violation.

## Implementation Tasks

This deliverable has four parts.  Complete the work one part at a time, in order.

### Task 1: Extend chat messages (10 points total)

The `ChatMessage` type represents the information passed along with the message contents when a `Player` sends a message.
To enable area-specific chats, we are adding the identifier of the `InteractableArea` as an `interactableId` field to the `ChatMessage` (or `undefined` if the `Player` is not in an `InteractableArea`). 
The server should forward messages only if the `interactableId` of the message is the same as that of player's location. 

To demonstrate your understanding, add tests to `Town.test.ts`. As an example, we’ve included the test `'Forwards chat messages to players with the same ID as the message ID'`. 

Grading:
* modify server to send messages to clients with the same `interactableId` as the player/message (3 points).
* message-passing test in `Town` should run, once the new field is added (2 points)
* add new tests for `InteractableArea` to `Town.test.ts` (5 points)

### Task 2: Add the PosterSessionArea (40 points total)

The `PosterSessionArea` specializes `InteractableArea` to store three properties: poster (a string with the contents of the poster file to be viewed or undefined if none is set), stars (the number of stars that other players have given this poster, starting at 0), and title (a string with the title of the poster or undefined if no poster is set).

Like the other areas, the `PosterSessionArea` specializes the behavior of `remove`, in this case setting the poster image and title properties to `undefined`, stars to 0, and emitting this update to the players in the town when the last player leaves the `PosterSessionArea`.

The `PosterSessionArea`, like the `ViewingArea`, adds a new method, `updateModel`, used in the next deliverable to update the state while clients are interacting with the poster (e.g., starring it).
{::options parse_block_html="true" /}
<details><summary markdown="span">View the specification for these methods</summary>
{% highlight typescript %}

/**
 * Removes a player from this poster session area.
 * When the last player leaves, this method clears the poster 
 * and its title, resets stars, and emits to all players in the Town.
 * @param player to be removed
 */
public remove(player: Player): void;

/**
 * Updates the state of this instance, setting the poster, title, 
 * and stars properties
 * @param posterSessionArea updated model 
 */
public updateModel({ poster, title, stars}: PosterSessionAreaModel);

/**
 * Convert this instance to a simple PosterSessionAreaModel suitable 
 * for transporting over a socket to a client (i.e., serializable).
 */
public toModel(): PosterSessionAreaModel;

/**
 * Creates a new PosterSessionArea object in the town map.
 * @param mapObject a ITiledMapObject that is the rectangle in which this viewing 
 * area exists
 * @param townEmitter An emitter used to broadcast updates to players in the town
 */
public static fromMapObject(obj: ITiledMapObject, emitter: TownEmitter): PosterSessionArea;

{% endhighlight %}
</details>

Grading for implementation tasks: 20 points total
* add the correct fields/getters/setters to the class: 3 points
* implement `remove`: 5 points
* implement `updateModel`: 5 points
* implement `toModel`: 2 points
* implement `fromMapObject`: 5 points

Grading for testing tasks: 20 points total
* test `updateModel`: 5 points
* test `toModel`: 5 points
* test `fromMapObject`: 5 points
* test `remove`: 5 points

### Task 3: Add a REST API (30 points total)

We now turn to the public-facing web service APIs that the client can directly invoke.

These methods are located in two files:
* `src/town/Town.ts` (`socket.on('interactableUpdate')` handler and `addPosterSessionArea`)
* `src/town/TownsController.ts` (`createPosterSessionArea`, `incrementPosterAreaStars`, `getPosterAreaImageContents`)
The `socket.on` handler is automatically invoked by the socket-io library when an event is received from a remote client. 
The `createPosterSessionArea` function is automatically invoked by the tsoa REST middleware when a REST request is made by a remote client. For this deliverable, you will not need to write any code for the middleware and we will be discussing these in future lectures.

To run the tests for this part, run the command `npm test TestName`, where `TestName` is either `Town.test` or `PosterSessionController` (which runs the tests for the new functions in `TownsController`).

<details><summary markdown="span">View the specification for these methods</summary>
{% highlight typescript %}


/**
   * File: src/town/Town.ts
   * Creates a new poster session area in this town if there is not currently an 
   * active one with the same Id. The poster session area Id must match the name 
   * of a poster session area that exists in this town's map, and the poster 
   * session area must not already have a poster image set.
   *
   * If successful creating the poster session area, this method:
   *   - Adds any players who are in the region defined by the poster 
   * session area to it
   *   - Notifies players in the town that the area has been updated 
   * by emitting an interactableUpdate event
   *
   * @param area Information describing the poster session area to create.
   *
   * @returns True if the area was created or false if there is no known poster 
   * session area with that Id or if there is already an active area with that 
   * Id or if there is no poster image and title specified
   */
  public addPosterSessionArea(area: PosterSessionAreaModel): boolean

  /**
   * File: src/town/PosterSessionController.ts
   * Creates a poster session area in a given town
   *
   * @param townID ID of the town in which to create the new poster area
   * @param sessionToken session token of the player making the request, must
   *        match the session token returned when the player joined the town
   * @param requestBody The new poster session area to create
   *
   * @throws InvalidParametersError if the session token is not valid, or if 
   * the poster session area could not be created
   */
  @Post('{townID}/posterSessionArea')
  @Response<InvalidParametersError>(400, 'Invalid values specified')
  public async createPosterSessionArea(
    @Path() townID: string,
    @Header('X-Session-Token') sessionToken: string,
    @Body() requestBody: PosterSessionArea,
  ): Promise<void>

/**
   * Gets the image contents of a given poster session area in a given town
   *
   * @param townID ID of the town in which to get the poster session area image 
   * contents
   * @param posterSessionId interactable ID of the poster session
   * @param sessionToken session token of the player making the request, must
   *        match the session token returned when the player joined the town
   *
   * @throws InvalidParametersError if the session token is not valid, or if 
   * the poster session specified does not exist
   */
   @Patch('{townID}/{posterSessionId}')
   @Response<InvalidParametersError>(400, 'Invalid values specified')
   public async getPosterAreaImageContents(
     @Path() townID: string,
     @Path() posterSessionId: string,
     @Header('X-Session-Token') sessionToken: string,
   ): Promise<string | undefined>

/**
   * Increment the stars of a given poster session area in a given town, as long as 
   * there is a poster image
   *
   * @param townID ID of the town in which to get the poster session area image 
   * contents
   * @param posterSessionId interactable ID of the poster session
   * @param sessionToken session token of the player making the request, must
   *        match the session token returned when the player joined the town
   *
   * @throws InvalidParametersError if the session token is not valid, or if the
   * poster session specified does not exist, or if the poster session specified 
   * does not have an image 
   */
    @Patch('{townID}/{posterSessionId}')
    @Response<InvalidParametersError>(400, 'Invalid values specified')
    public async incrementPosterAreaStars(
      @Path() townID: string,
      @Path() posterSessionId: string,
      @Header('X-Session-Token') sessionToken: string,
    ): Promise<void>

// File: src/town/Town.ts
// Set up a listener to process updates to interactables.
// Currently only knows how to process updates for ViewingAreas 
// and PosterSessionAreas, and ignores any other updates for any 
// other kind of interactable. 
// For ViewingAreas and PosterSessionAreas: Uses the 'newPlayer' 
// object's 'townEmitter' to forward the interactableUpdate to the 
// other players in the town. Also dispatches an updateModel call 
// to the viewingArea or posterSessionArea that corresponds to the 
// interactable being updated. Does not throw an error if the 
// specified viewing area or poster session area does not exist.
  socket.on('interactableUpdate', (update: Interactable) => {});

{% endhighlight %}

</details>

Grading for implementation tasks: 20 points total
* `socket.on(`interactableArea')`: 4 points
* `addPosterSessionArea`: 4 points
* `createPosterSessionArea`: 4 points
* `getPosterAreaImageContents`: 4 points
* `incrementPosterAreaStars`: 4 points
  
Grading for testing tasks: 10 points total
* `createPosterSessionArea`: 3 points
* `getPosterAreaImageContents`: 3 points
* `incrementPosterAreaStars`: 4 points


### Task 4: Add method createInteractablesFromMap (10 points total)

Your last task is to implement a function to validate the `InteractableArea`s defined in the town's map file and populate the `Town` with instances of `ViewingArea`, `ConversationArea`, and `PosterSessionArea` to represent those areas. Implement this function in the method `initializeFromMap` in `src/town/Town.ts`. 

We provided you with a test case for some of the basic functionality of this function. Add tests in the same `describe` block as the existing one in `src/town/Town.test.ts`. To run these tests, type `npx jest --watch Town.test`.

The function takes a `ITiledMap` object; you can learn more about the structure from reviewing the type definition, from the [Tiled JSON Map Format Specification](https://doc.mapeditor.org/en/stable/reference/json-map-format/), and from the example provided in the test case for `initializeFromMap`. The specific *layer* of the map that you are looking for will be of the type `ITiledMapObjectLayer`. The object layer will list all of the objects. The `type` property of each object in that layer identifies it as a `ViewingArea`, `ConversationArea`, `PosterSessionArea` or other - you can ignore any others.

The grading script will run two integration tests as part of grading this task. The integration tests check every method that you were required to complete. These two tests are clearly identified as integration tests in the grading output. 
Do *not* try to replicate these integration tests in your tests for `initializeFromMap`. We will *only* grade your tests for `initializeFromMap` on their ability to find defects in our implementation of `initializeFromMap`, and *not* in any other functions.

Grading:
* correct implementation (6 points)
* tests (4 points)

## Submission Instructions

Submit your assignment in GradeScope. The easiest way to get into GradeScope the first time is to first sign into 
[Canvas](https://northeastern.instructure.com/courses/133054) and then click the link on our course for "GradeScope". 
You should then also have the option to create an account on GradeScope (if you don't already have one) so that you can log in to GradeScope directly.
Please contact the instructors immediately if you have difficulty accessing the course on GradeScope.

To submit your assignment: upload *only* the files:
* `src/town/InteractableArea.ts` 
* `src/town/PosterSessionArea.ts` 
* `src/town/PosterSessionArea.test.ts` 
* `src/town/Town.test.ts` 
* `src/town/Town.ts` 
* `src/town/PosterSessionController.test.ts` 
* `src/town/TownsController.ts` 

The grading script accepts any subset of these files. 
GradeScope will *not* include code style points, it will show 0 for this until graded manually. Grading can take time if the machine is busy. 
GradeScope can provide feedback on at most 5 submissions per-24-hours per-student. Test on your local machine; do *not* rely on GradeScope for providing grading feedback.
