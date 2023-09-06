---
layout: assignment
title: "Individual Project 1"
permalink: /assignments/ip1
parent: Assignments
nav_order: 1
due_date: "TBD"
submission_notes: Submit via Autograder.io at neu.autograder.io
---

Welcome aboard to the Covey.Town team! We're glad that you're here and ready to join our development team as a new software engineer.
We're building an open source virtual meeting application, and are very happy to see that we have so many new developers who can help make this application a reality.
By the end of the semester, you'll be able to propose, design, implement and test a new feature for our project.
We understand that some of you may have some web development experience, but don't expect that most of you do, and hence, have created an individual project to help you get up to speed with our existing codebase and development environment.

Covey.Town is a web application that consists of some code that runs in each client's web browser, and also code that runs on a server.
Users join the application in a "town": a 2D arcade-style map with different rooms to explore.
Each town is also a video call: when two players get close to each other, they can see and hear each other; there is also a text chat available within the town.
In Winter of 2021, our lead software engineer, Avery, developed a prototype for Covey.Town, and since then, hundreds of students in this class have built on that codebase.
The most recent class-wide effort added a concept called [Poster Areas](https://neu-se.github.io/CS4530-Spring-2023/assignments/ip1), allowing players to upload a poster which is then dispalyed and discussed in a special part of the town.
Many student projects over the past few years (some of which are publicy showcased [from Spring 2022](https://neu-se.github.io/CS4530-Spring-2022/assignments/project-showcase) and [from Fall 2022](https://neu-se.github.io/CS4530-Fall-2022/assignments/project-showcase)) involved creating games within Covey.Town.
For example: students created implementations of soccer, blackjack, dance dance revolution and tic-tac-toe.

After studying all of the student projects and their implementation challenges, our lead software engineer, Avery, has refactored Covey.Town, designing a new abstraction to make it easier to create games like these. 
Avery's new abstraction, `GameArea`, is a region of the town that provides some core elements to allow players to play games within that area.
The abstraction cuts across the entire technology stack: `GameArea`s exist in the 2D map and the application automatically tracks when players enter and exit them.
By pressing the spacebar within an `GameArea`, the user can trigger an interaction with that area, which in turn can be easily used to display new content in the web app using React.
A `GameArea` in one user's browser can also emit events that are delivered in real-time to other players interacting with that same area.
The `GameArea` provides common functionalities that all games might want to provide: allowing players to join and observe a game, as well as tracking a leaderboard.

The objective for this semester's individual project is to implement this new `GameArea` abstraction, with one concrete implementation: `TicTacToeArea`. 
The `TicTacToeArea` will implement the gameplay for the classic game, [Tic-Tac-Toe](https://en.wikipedia.org/wiki/Tic-tac-toe).
This implementation effort will be split across two deliverables. In this first deliverable, you will implement and test the core backend components for this feature, and in the second deliverable, you will implement and test the frontend components. 

## Objectives of this assignment
The objectives of this assignment are to:
*  Get you familiar with the basics of TypeScript, VSCode, and the project codebase
*  Learn how to read and write code in TypeScript
*  Translate high-level requirements into code
*  Learn how to write unit tests with Jest

## Getting started with this assignment

Before you begin, be sure to check that you have NodeJS 18.x installed, along with VSCode. We have provided a [tutorial on setting up a development environment for this class]({{site.baseurl}}{% link tutorials/week1-getting-started.md %}) 
Start by [downloading the starter code]({{site.baseurl}}{% link /Assignments/ip1-handout.zip %}). Extract the archive and run `npm install` to fetch the dependencies. Avery has provided you with some very basic sanity tests that you can extend for testing your implementation as you go. You can run these tests with the command `npm test TicTacToe` (note that many tests are *expected* to fail until you have begun to implement the assignment).

## Grading
This submission will be scored out of 100 points, 90 of which will be automatically awarded by the grading script, with the remaining 10 manually awarded by the course staff.

Your code will automatically be evaluated for linter errors and warnings. Submissions that have *any* linter errors will automatically receive a grade of 0. **Do not wait to run the linter until the last minute**. To check for linter errors, run the command `npm run lint` from the terminal. The handout contains the same eslint configuration that is used by our grading script.

Your code will be automatically evaluated for functional correctness by a test suite that expands on the core tests that are distributed in the handout. 
Your tests will be automatically evaluated for functional correctness by a process that will inject bugs into our reference solution: to receive full marks your tests must detect a minimum number of injected bugs. 
Each submission will be graded against the same set of injected bugs (repeated submissions will not receive new/different injected bugs).
You will __not__ receive detailed feedback on which injected bugs you do or do not find.

The autograding script will impose a strict rate limit of 5 submissions per 24 hours.
Submissions that fail to grade will not count against the quota.
This limit exists to encourage you to start early on this assignment: students generally report that assignments like this take between 3-20 hours.
If you start early, you will be able to take full advantage of the resources that we provide to help you succeed: office hours, discussion on Piazza --- and the ability to have a greater total number of submission attempts.

Your code will be manually evaluated for conformance to our course [style guide]({{ site.baseurl }}{% link style.md %}). This manual evaluation will account for 10% of your total grade on this assignment. We will manually evaluate your code for style on the following rubric:

To receive all 10 points:
* All new names (e.g. for local variables, methods, and properties) follow the naming conventions defined in our style guide
* There are no unused local variables
* All public properties and methods (other than getters, setters, and constructors) are documented with JSDoc-style comments that describes what the property/method does, as defined in our style guide
* The code and tests that you write generally follows the design principles discussed in week one. In particular, your design does not have duplicated code that could have been refactored into a shared method.

We will review your code and note each violation of this rubric. We will deduct two points for each violation, up to a maximum of deducting all 10 style points.

## Overview of Relevant Classes
The UML class diagram below shows the three main classes that you will be implementing for this deliverable (`TicTacToeGameArea` and `TicTacToeGame`) along with several relevant classes for additional context. An `InteractableArea` represents a region of the 2D map that the player can interact with - existing implementations of this interface include `ConversationArea` and `ViewingArea`.

The new `GameArea` abstraction extends `InteractableArea`, adding state to track the current `Game` in the area and the history of past games using its `GameResult` array. Subclasses of `GameArea` must implement the `handleCommand` method of `InteractableArea`, which is how messages are passed from clients to the server.

The base `Game` abstract class tracks the state of the game, including who is playing it. The abstract class includes the glue that allows the socket protocol to serialize the game state such that it can be sent from the server to clients. Implementors of the `Game` abstract class implement the methods `applyMove`, `_join` and `_leave`.

<script src="{{site.baseurl}}/assets/js/mermaid.min.js"></script>
<div class="mermaid">
%%{init: { 'theme':'forest', } }%%
classDiagram
    class Game {
      +GameState state
      +GameInstanceID id
      ~Player[] _players
      ~GameResult _result
    + join(player: Player)
    + leave(player: Player)
    ~ _join(player: Player)
    ~ _leave(player: Player)
    + applyMove(move: GameMove)

    }
    class  GameArea {
        ~Game _game
        ~GameResult _history
    }
    class TicTacToeGame {

    }
    class TicTacToeGameArea {
    }
    class InteractableArea {
        +string id
       ~Player[] _occupants
       +string[] occupantsByID
       +boolean isActive
       +BoundingBox boundingBox
       +add(player: Player)
       +remove(player: Player)
       +addPlayersWithinBounds(allPlayers: Player[])
       +toModel()
       +contains(location: PlayerLocation)
       +overlaps(otherInteractable: Interactable)
       + handleCommand(command: InteractableCommand, player:Player)
       #_emitAreaChanged()
    }

    class GameResult {
        +GameInstanceID gameID
        +Map scores
    }
    GameArea o-- GameResult
    TicTacToeGame ..|> Game
    TicTacToeGameArea ..|> GameArea
    GameArea ..|> InteractableArea
    GameArea o-- Game
</div>

## Implementation Tasks
This deliverable has four parts; each part will be graded on its own rubric. You should complete the assignment one part at a time, in the order presented here.

**General Requirements**: Implement your code *only* in the files specified: `src/town/games/TicTacToeGame.ts`, `src/town/games/TicTacToeGame.test.ts` and `src/town/games/TicTacToeGameArea.ts`. You should not install any additional dependencies. The autograder will ignore any other files that you modify, and will not install any dependencies that you add to the project.

### Task 1: Joining and Leaving the TicTacToeGame (24 points)
The `TicTacToeGame` class extends the base `Game` class, implementing the semantics of the game Tic-Tac-Toe. Avery has provided a definition for the types that will be used to represent the state of a `TicTacToeGame` - `TicTacToeGameState`. That type definition is reproduced below:

{% highlight typescript %}
/**
 * Type for the state of a TicTacToe game
 * The state of the game is represented as a list of moves, and the playerIDs of the players (x and o)
 * The first player to join the game is x, the second is o
 */
export interface TicTacToeGameState {
  moves: ReadonlyArray<TicTacToeMove>;
  x?: PlayerID;
  o?: PlayerID;
  winner?: PlayerID;
  status: 'IN_PROGRESS' | 'WAITING_TO_START' | 'OVER';
}
/**
 * Type for a move in TicTacToe
 * The row and column are 0-indexed, so the top left square is (0,0) and the bottom right square is (2,2)
 */
export interface TicTacToeMove {
  gamePiece: 'X' | 'O';
  row: TicTacToeGridPosition;
  col: TicTacToeGridPosition;
}
export type TicTacToeGridPosition = 0 | 1 | 2;
{% endhighlight %}

As a gentle introduction to this abstraction, your first task is to implement the `_join` and `_leave` methods of `TicTacToeGame`. To implement these methods, you should not need to read any other parts of the codebase besides `Game.ts`.

{::options parse_block_html="true" /}
<details><summary markdown="span">View the specification for these methods</summary>
{% highlight typescript %}
  /**
   * Adds a player to the game.
   * Updates the game's state to reflect the new player.
   * If the game is now full (has two players), updates the game's state to set the status to IN_PROGRESS.
   *
   * @param player The player to join the game
   * @throws InvalidParametersError if the player is already in the game (PLAYER_ALREADY_IN_GAME_MESSAGE)
   *  or the game is full (GAME_FULL_MESSAGE)
   */
  public _join(player: Player): void

 /**
  * Removes a player from the game.
  * Updates the game's state to reflect the player leaving.
  * If the game has two players in it at the time of call to this method,
  *   updates the game's status to OVER and sets the winner to the other player.
  * If the game does not yet have two players in it at the time of call to this method,
  *   updates the game's status to WAITING_TO_START.
  *
  * @param player The player to remove from the game
  * @throws InvalidParametersError if the player is not in the game (PLAYER_NOT_IN_GAME_MESSAGE)
  */
  protected _leave(player: Player): void
{% endhighlight %}
</details>

*Testing*: Avery has provided you with some very simple (and incomplete) tests for `_join` and `_leave`. You can run these tests by running the command `npx jest --watch TicTacToeGame.test`, which will automatically re-run the tests as you update the file (note that tests for `applyMove` will also run - but you can ignore those at this point). You should improve the `_join` and `_leave` tests to check the entire specification. Please implement these additional tests in the file `src/town/games/TicTacToeGame.test.ts`.

Grading for implementation tasks:
* `_join`: 6 points
* `_leave`: 6 points

Grading for testing tasks:
* `_join`:
  * 6 points for detecting all 25 faults, or
  * 3 points for detecting 24 faults
* `_leave`: 6 points 

### Task 2: Tic-Tac-Toe Game Semantics (50 points total)
The next (and largest) task for this deliverable is to implement the method `TicTacToeGame.applyMove`, which applies a player's move to the game. This method is responsible for validating the move, and updating the game state to reflect the move. Given the complexity of this method, you should anticipate creating (at least one) private, helper method to implement its logic.

<details><summary markdown="span">View the specification for this method</summary>
{% highlight typescript %}
  /* 
   * Applies a player's move to the game.
   * Uses the player's ID to determine which game piece they are using (ignores move.gamePiece)
   * Validates the move before applying it. If the move is invalid, throws an InvalidParametersError with
   * the error message specified below.
   * A move is invalid if:
   *    - The move is on a space that is already occupied (use BOARD_POSITION_NOT_EMPTY_MESSAGE)
   *    - The move is not the player's turn (MOVE_NOT_YOUR_TURN_MESSAGE)
   *    - The game is not in progress (GAME_NOT_IN_PROGRESS_MESSAGE)
   *
   * If the move is valid, applies the move to the game and updates the game state.
   *
   * If the move ends the game, updates the game's state.
   * If the move results in a tie, updates the game's state to set the status to OVER and sets winner to undefined.
   * If the move results in a win, updates the game's state to set the status to OVER and sets the winner to the player who made the move.
   * A player wins if they have 3 in a row (horizontally, vertically, or diagonally).
   *
   * @param move The move to apply to the game
   * @throws InvalidParametersError if the move is invalid
   */
  public applyMove(move: GameMove<TicTacToeMove>): void
{% endhighlight %}
</details>

Grading for implementation tasks:
* Applying moves: 8 points
* Checking for invalid moves: 9 points
* Handling game-ending moves: 11 points
  
Grading for testing tasks:
* Applying moves: 6 points
* Checking for invalid moves:
  * 7 points for detecting all 35 faults
  * 4 points for detecting 34 faults
* Handling game-ending moves: 9 points

### Task 3: Implement the TicTacToeGameArea (16 points total)
The `TicTacToeGameArea` receives `InteractbleCommand`s from players who enter the area on their client. The main responsibility of this class is to interpet those commands, dispatching them as appropriate to the `TicTacToeGame` instance that it manages. Your final task is to implement the `handleCommand` method of `TicTacToeGameArea`.

There are three types of commands that the `TicTacToeGameArea` will receive, which map directly to the three methods of `TicTacToeGame` that you implemented in the previous task. 

Avery has provided a complete test suite for `handleCommand` - you do not need to write any additional tests.

<details><summary markdown="span">View the specification for this methods</summary>
{% highlight typescript %}
   /**
   * Handle a command from a player in this game area.
   * Supported commands:
   * - JoinGame (joins the game `this._game`, or creates a new one if none is in progress)
   * - GameMove (applies a move to the game)
   * - LeaveGame (leaves the game)
   *
   * If the command ended the game, records the outcome in this._history
   * If the command is successful (does not throw an error), calls this._emitAreaChanged (necessary 
   *  to notify any listeners of a state update, including any change to history)
   * If the command is unsuccessful (throws an error), the error is propagated to the caller
   *
   * @see InteractableCommand
   *
   * @param command command to handle
   * @param player player making the request
   * @returns response to the command, @see InteractableCommandResponse
   * @throws InvalidParametersError if the command is not supported or is invalid. Invalid commands:
   *  - LeaveGame and GameMove: No game in progress (GAME_NOT_IN_PROGRESS_MESSAGE),
   *        or gameID does not match the game in progress (GAME_ID_MISSMATCH_MESSAGE)
   *  - Any command besides LeaveGame, GameMove and JoinGame: INVALID_COMMAND_MESSAGE
   */
  public handleCommand<CommandType extends InteractableCommand>(
    command: CommandType,
    player: Player,
  ): InteractableCommandReturnType<CommandType> 
{% endhighlight %}
</details>

Grading for implementation tasks:
* Handling JoinGame: 4 points
* Handling GameMove: 6 points
* Handling LeaveGame: 5 points
* Handling invalid commands: 1 point

## Submission Instructions
Submit your assignment to the instance of Autograder.io running at [neu.autograder.io](https://neu.autograder.io).
Navigate to [neu.autograder.io](https://neu.autograder.io) in your web browser, click the "Sign in" button, and log in with your Northeastern account.
You should then see the course listed on the neu.autograder.io home page.
Please contact the instructors immediately if you have difficulty accessing the course on Autograder.io.
If you haven't been added to the course roster yet, you can access the assignment page at [this direct link](https://neu.autograder.io/web/project/10).

To submit your assignment: run the command `npm run zip` in the top-level directory of the handout. This will produce a file called `covey-town-townService.zip`. Submit that zip file on Autograder.io.

Autograder.io will provide you with feedback on your submission, but note that it will *not* include any marks that will be assigned after we manually grade your submission for code style (these marks will remain hidden until it is graded). It may take several minutes for the grading script to complete.

Autograder.io is configured to only provide feedback on at most 5 submissions per-24-hours per-student (submissions that fail to run or receive a grade of 0 are not counted in that limit). We strongly encourage you to lint and test your submission on your local development machine, and *not* rely on Autograder.io for providing grading feedback - relying on Autograder.io is a very slow feedback loop.
To check for linter errors, run the command `npm run lint` from the terminal. The handout contains the same eslint configuration that is used by our grading script.
