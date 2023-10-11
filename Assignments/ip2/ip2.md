---
layout: assignment
title: "Individual Project 2"
permalink: /assignments/ip2
parent: Assignments
nav_order: 2
due_date: "Wednesday October 18, 11:00am EDT"
submission_notes: Submit via Autograder.io at neu.autograder.io
---

The objective for this semester's individual project is to implement this new `GameArea` abstraction, with one concrete implementation: `TicTacToeArea`. 
The `TicTacToeArea` will implement the gameplay for the classic game, [Tic-Tac-Toe](https://en.wikipedia.org/wiki/Tic-tac-toe).
This implementation effort will be split across two deliverables. In this second deliverable, you will implement and (partially) test the core frontend components. 

## Change log
* 10/11 Updated handout `TicTacToeArea.test.tsx` to correctly update `gameAreaController.mockIsOurTurn` in each relevant test. 

To update your code without downloading the entire zip file, simply add the line below to the 'Updates whose turn it is when the game is updated' and 'Displays a message "Game in progress, {numMoves} moves in" and indicates whose turn it is when it is the other player\'s turn' tests in `TicTacToeArea.test.tsx`.
```ts
gameAreaController.mockIsOurTurn = false;
```
* 10/3: Updated handout `TicTacToeArea.test.tsx` to add the line `gameAreaController.mockIsOurTurn = true;`, which may be required to be set for your implementation of `TicTacToeArea`
* 9/30: Updated handout `TicTacToeBoard.test.tsx` to add missing `await` calls on lines 234 and 243 (if missing, could cause the test runner to crash if the assertions failed)
* 9/30: UpdatedUpdated handout `TicTacToeAreaController.test.ts`, adding a mock implementation of `mockTownController.getPlayer`, which you might or might not choose to use in your implementation (and without which the tests would fail). If you run into this issue and would like to directly update your code, that mock implementation is added to the bottom of `ticTacToeAreaControllerWithProp`, and is:
```
      mockTownController.getPlayer.mockImplementation(playerID => {
        const p = mockTownController.players.find(player => player.id === playerID);
        assert(p);
        return p;
```

## Objectives of this assignment
The objectives of this assignment are to:
* Investigate and understand a large, existing codebase
* Write new TypeScript code that uses asynchronous operations
* Write test cases that utilize mocks and spies
* Write React components and hooks that make use of state


## Getting started with this assignment
Start by [downloading the starter code]({{site.baseurl}}{% link /Assignments/ip2/ip2-handout.zip %}). Extract the archive and run `npm install` to fetch the dependencies. 

**Configuring Jest and VSCode**: If you would like to use the built-in Jest test runner for VSCode (where it shows the tests and their status in the sidebar), the easiest way to accomplish this for this project is to open *just* the "frontend" directory or just the "townService" directory in VSCode - not the top-level "ip2-handout" directory. If you have a quick-fix to make it work with the whole project at once, please feel free to share on Piazza and we will incorportate that here.

**NPM install failures**: The libraries used for React require some native binaries to be installed -- code written and compiled for your computer (not JavaScript). If you run into issues with `npm install` not succeeding, please try installing the following libraries using either [Homebrew (if on Mac)](https://brew.sh), apt-get, or your favorite other package manager: `pixman`, `cairo`, `pkgconfig` and `pango`. For example, run `brew install pixman cairo pkgconfig pango`. If you are on a newer Mac with an M1 or M2 chip, you may need to use `arch -arm64 brew install pixman cairo pango`. On Windows: Students have reported seeing the failure `error /bin/bash: node: command not found` upon `npm install` in the `frontend` directory. If you encounter this error, please try to delete the `node_modules` directory and re-run `npm install` in the `frontend` directory from a bash shell instead of a windows command prompt.

**Running the app**: We strongly encourage you to interactively experiment as you develop by running the entire application in your development environment. See the instructions in README.md for how to run the app.

## Grading
This submission will be scored out of 200 points, 180 of which will be automatically awarded by the grading script, with the remaining 20 manually awarded by the course staff.

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

To receive all 20 points:
* All new names (e.g. for local variables, methods, and properties) follow the naming conventions defined in our style guide
* There are no unused local variables
* All public properties and methods (other than getters, setters, and constructors) are documented with JSDoc-style comments that describes what the property/method does, as defined in our style guide
* The code and tests that you write generally follows the design principles discussed in week one. In particular, your design does not have duplicated code that could have been refactored into a shared method.

We will review your code and note each violation of this rubric. We will deduct four points for each violation, up to a maximum of deducting all 20 style points.

## Implementation Tasks
This deliverable has four parts; each part will be graded on its own rubric. You should complete the assignment one part at a time, in the order presented here.

**General Requirements**: Implement your code *only* in the files specified:
* Task 1: `frontend/src/classes/interactable/TicTacToeAreaController.ts`
* Task 1: `frontend/src/classes/interactable/TicTacToeAreaController.test.ts`
* Task 2: `frontend/src/components/Town/interactables/TicTacToe/TicTacToeArea.tsx`
* Task 3: `frontend/src/components/Town/interactables/TicTacToe/TicTacToeBoard.tsx`
* Task 4: `frontend/src/components/Town/interactables/Leaderboard.tsx`

You should not install any additional dependencies. The autograder will ignore any other files that you modify, and will not install any dependencies that you add to the project.

### Task 1: The TicTacToeAreaController (30 points)
The `TicTacToeAreaController` is a class that is responsible for managing the state of a single TicTacToe game. It is responsible for communicating with the TownService backend. Frontend components will interact with the `TicTacToeAreaController` to get the current state of the game, and to send commands to the backend to update the game state. The `TicTacToeAreaController` also will emit events when the state of the game changes, so that frontend components can update their state accordingly.

`TicTacToeAreaController` extends the base `GameAreaController` class.
The base class tracks the game model (`this._model`), the set of players in the game (`this.players`), and the set of observers in the game (`this.observers`). It also provides methods for joining and leaving the game, as well as a base implementation of `_updateFrom`, which is responsible for updating the game state when the backend notifies the frontend of a change.

Your first task is to implement each of the properties and methods of the `TicTacToeAreaController` class (`frontend/src/classes/interactable/TicTacToeAreaController.ts`). The specification for these properties and methods appears below:

{::options parse_block_html="true" /}
<details><summary markdown="span">View the specification for these methods</summary>
{% highlight typescript %}
  {
  /**
   * Returns the current state of the board.
   *
   * The board is a 3x3 array of TicTacToeCell, which is either 'X', 'O', or undefined.
   *
   * The 2-dimensional array is indexed by row and then column, so board[0][0] is the top-left cell,
   * and board[2][2] is the bottom-right cell
   */
  get board(): TicTacToeCell[][]
  /**
   * Returns the player with the 'X' game piece, if there is one, or undefined otherwise   */
  get x(): PlayerController | undefined
  /**
   * Returns the player with the 'O' game piece, if there is one
   */
  get o(): PlayerController | undefined 
  /**
   * Returns the player with the 'O' game piece, if there is one, or undefined otherwise
   */
  get moveCount(): number
  /**
   * Returns the winner of the game, if there is one
   */
  get winner(): PlayerController | undefined
  /**
   * Returns the player whose turn it is, if the game is in progress
   * Returns undefined if the game is not in progress
   */
  get whoseTurn(): PlayerController | undefined
  /**
   * Returns true if it is our turn to make a move in the game
   * Returns false if it is not our turn, or if the game is not in progress
   */
  get isOurTurn(): boolean
  /**
   * Returns true if the current player is a player in this game
   */
  get isPlayer(): boolean
  /**
   * Returns the game piece of the current player, if the current player is a player in this game
   *
   * Throws an error PLAYER_NOT_IN_GAME_ERROR if the current player is not a player in this game
   */
  get gamePiece(): 'X' | 'O'
  /**
   * Returns the status of the game.
   * Defaults to 'WAITING_TO_START' if the game is not in progress
   */
  get status(): GameStatus
  /**
   * Returns true if the game is in progress
   */
  public isActive(): boolean
  /**
   * Updates the internal state of this TicTacToeAreaController to match the new model.
   *
   * Calls super._updateFrom, which updates the occupants of this game area and
   * other common properties (including this._model).
   *
   * If the board has changed, emits a 'boardChanged' event with the new board. If the board has not changed,
   *  does not emit the event.
   *
   * If the turn has changed, emits a 'turnChanged' event with true if it is our turn, and false otherwise.
   * If the turn has not changed, does not emit the event.
   */
  protected _updateFrom(newModel: GameArea<TicTacToeGameState>): void
  /**
   * Sends a request to the server to make a move in the game.
   * Uses the this._townController.sendInteractableCommand method to send the request.
   * The request should be of type 'GameMove',
   * and send the gameID provided by `this._instanceID`.
   *
   * If the game is not in progress, throws an error NO_GAME_IN_PROGRESS_ERROR
   *
   * @param row Row of the move
   * @param col Column of the move
   */
  public async makeMove(row: TicTacToeGridPosition, col: TicTacToeGridPosition) 
{% endhighlight %}
</details>

*Testing*: Avery has provided you with tests for everything in `TicTacToeController` *except* for `makeMove` and `_updateFrom`. Please implement these additional tests in the file `frontend/src/classes/interactable/TicTacToeAreaController.test.ts`. You can run the tests by running the command `npx jest TicTacToeAreaController` in the `frontend` directory (for convenience, you may want to use `npx jest --watch` ...).

The grading script will assign full marks for each implementation task if all of the tests for that task pass. The grading script will assign full marks for each testing task if all of the faults in that task are detected by your tests. There is no partial credit.

Grading for implementation tasks:
* All properties and methods besides `_updateFrom`: 10 points
* `_updateFrom`: 10 points

Grading for the testing tasks:
* Tests for `_updateFrom`: 5 points
* Tests for `makeMove`: 5 points

### Task 2: Tic-Tac-Toe Area (95 points total)
The next task is to implement the React component that will render the Tic-Tac-Toe game area. This component will show information about the game area, and the current state of the game. It displays the `TicTacToeBoard`` (which you'll implement in the next task), and also the `Leaderboard` component (which you'll implement in the task after that).

This component is located in the file `frontend/src/components/Town/interactables/TicTacToe/TicTacToeArea.tsx` - you should implement component class in this file.

<details><summary markdown="span">View the specification for this component</summary>
{% highlight typescript %}
/**
 * The TicTacToeArea component renders the TicTacToe game area.
 * It renders the current state of the area, optionally allowing the player to join the game.
 *
 * It uses Chakra-UI components (does not use other GUI widgets)
 *
 * It uses the TicTacToeAreaController to get the current state of the game.
 * It listens for the 'gameUpdated' and 'gameEnd' events on the controller, and re-renders accordingly.
 * It subscribes to these events when the component mounts, and unsubscribes when the component unmounts. It also unsubscribes when the gameAreaController changes.
 *
 * It renders the following:
 * - A leaderboard (@see Leaderboard.tsx), which is passed the game history as a prop
 * - A list of observers' usernames (in a list with the aria-label 'list of observers in the game', one username per-listitem)
 * - A list of players' usernames (in a list with the aria-label 'list of players in the game', one item for X and one for O)
 *    - If there is no player in the game, the username is '(No player yet!)'
 *    - List the players as (exactly) `X: ${username}` and `O: ${username}`
 * - A message indicating the current game status:
 *    - If the game is in progress, the message is 'Game in progress, {moveCount} moves in, currently {whoseTurn}'s turn'. If it is currently our player's turn, the message is 'Game in progress, {moveCount} moves in, currently your turn'
 *    - Otherwise the message is 'Game {not yet started | over}.'
 * - If the game is in status WAITING_TO_START or OVER, a button to join the game is displayed, with the text 'Join New Game'
 *    - Clicking the button calls the joinGame method on the gameAreaController
 *    - Before calling joinGame method, the button is disabled and has the property isLoading set to true, and is re-enabled when the method call completes
 *    - If the method call fails, a toast is displayed with the error message as the description of the toast (and status 'error')
 *    - Once the player joins the game, the button dissapears
 * - The TicTacToeBoard component, which is passed the current gameAreaController as a prop (@see TicTacToeBoard.tsx)
 *
 * - When the game ends, a toast is displayed with the result of the game:
 *    - Tie: description 'Game ended in a tie'
 *    - Our player won: description 'You won!'
 *    - Our player lost: description 'You lost :('
 *
 */
function TicTacToeArea({ interactableID }: { interactableID: InteractableID }): JSX.Element
{% endhighlight %}
</details>

You can begin to implement these tasks in whatever order you see fit, but we would suggest completing them in the order shown in the specification.

There is significant ambiguity in the specification when it comes to exactly how this looks. We will not evaluate your submission on the basis of how closely it looks like our referencence implementation: it need only be functionally correct (as defined by the included test cases).

Grading for implementation tasks:
* Correctly registering the listeners: 20 points
* Display the leaderboard component: 10 points
* Join game button: 30 points
* List of observers watching game: 15 points
* List of players in game: 10 points
* Display the game status: 10 points

All of the tests are provided in the handout. Run the tests for this task by running the command `npx jest TicTacToeArea.test` in the `frontend` directory (for convenience, you may want to use `npx jest --watch` ...). You will also likely find it convenient to run the app in your browser while you work on this task for interactive debugging.

The grading script will assign full marks for each implementation task if all of the tests for that task pass.  There is no partial credit. 

### Task 3: Implement the Tic-Tac-Toe Board (40 points total)
This task is to implement the `TicTacToeBoard` component, which will render the actual (interactive) board. It is located in the file `frontend/src/components/Town/interactables/TicTacToe/TicTacToeBoard.tsx`.

<details><summary markdown="span">View the specification for this component</summary>
{% highlight typescript %}
/**
 * A component that renders the TicTacToe board
 *
 * Renders the TicTacToe board as a "StyledTicTacToeBoard", which consists of 9 "StyledTicTacToeSquare"s
 * (one for each cell in the board, starting from the top left and going left to right, top to bottom).
 * Each StyledTicTacToeSquare has an aria-label property that describes the cell's position in the board,
 * formatted as `Cell ${rowIndex},${colIndex}`.
 *
 * The board is re-rendered whenever the board changes, and each cell is re-rendered whenever the value
 * of that cell changes.
 *
 * If the current player is in the game, then each StyledTicTacToeSquare is clickable, and clicking
 * on it will make a move in that cell. If there is an error making the move, then a toast will be
 * displayed with the error message as the description of the toast. If it is not the current player's
 * turn, then the StyledTicTacToeSquare will be disabled.
 *
 * @param gameAreaController the controller for the TicTacToe game
 */
export default function TicTacToeBoard({ gameAreaController }: TicTacToeGameProps): JSX.Element
{% endhighlight %}
</details>

There is significant ambiguity in the specification when it comes to exactly how this looks. We will not evaluate your submission on the basis of how closely it looks like our referencence implementation: it need only be functionally correct (as defined by the included test cases).

Grading for implementation tasks:
* Drawing the board for observers: 15 points
* Drawing the interactive board for players: 25 points

All of the tests are provided in the handout. Run the tests for this task by running the command `npx jest TicTacToeBoard` in the `frontend` directory (for convenience, you may want to use `npx jest --watch` ...). You will also likely find it convenient to run the app in your browser while you work on this task for interactive debugging.

The grading script will assign full marks for each implementation task if all of the tests for that task pass.  There is no partial credit. 

### Task 4: Implement the Leaderboard (15 points total)

This task is to implement the `Leaderboard` component, which will render a list of `GameResult`s as a leaderboard. It is located in the file `frontend/src/components/Town/interactables/Leaderboard.tsx`.

<details><summary markdown="span">View the specification for this component</summary>
{% highlight typescript %}

/**
 * A component that renders a list of GameResult's as a leaderboard, formatted as a table with the following columns:
 * - Player: the name of the player
 * - Wins: the number of games the player has won
 * - Losses: the number of games the player has lost
 * - Ties: the number of games the player has tied
 * Each column has a header (a table header `th` element) with the name of the column.
 *
 * The table is sorted by the number of wins, with the player with the most wins at the top.
 *
 * @returns
 */
export default function Leaderboard({ results }: { results: GameResult[] }): JSX.Element
{% endhighlight %}
</details>

There is significant ambiguity in the specification when it comes to exactly how this looks. We will not evaluate your submission on the basis of how closely it looks like our referencence implementation: it need only be functionally correct (as defined by the included test cases).

Grading for implementation tasks:
* Implementing the leaderboard: 15 points

All of the tests are provided in the handout. Run the tests for this task by running the command `npx jest Leaderboard` in the `frontend` directory (for convenience, you may want to use `npx jest --watch` ...). You will also likely find it convenient to run the app in your browser while you work on this task for interactive debugging.

The grading script will assign full marks for each implementation task if all of the tests for that task pass.  There is no partial credit. 

## Submission Instructions
Submit your assignment to the instance of Autograder.io running at [neu.autograder.io](https://neu.autograder.io).
Navigate to [neu.autograder.io](https://neu.autograder.io) in your web browser, click the "Sign in" button, and log in with your Northeastern account.
You should then see the course listed on the neu.autograder.io home page.
Please contact the instructors immediately if you have difficulty accessing the course on Autograder.io.
If you haven't been added to the course roster yet, you can access the assignment page at [this direct link](https://neu.autograder.io/web/project/11).

To submit your assignment: run the command `npm run zip` in the top-level directory of the handout. This will produce a file called `covey-town.zip`. Submit that zip file on Autograder.io.

Autograder.io will provide you with feedback on your submission, but note that it will *not* include any marks that will be assigned after we manually grade your submission for code style (these marks will remain hidden until it is graded). It may take several minutes for the grading script to complete.

Autograder.io is configured to only provide feedback on at most 5 submissions per-24-hours per-student (submissions that fail to run or receive a grade of 0 are not counted in that limit). We strongly encourage you to lint and test your submission on your local development machine, and *not* rely on Autograder.io for providing grading feedback - relying on Autograder.io is a very slow feedback loop.
To check for linter errors, run the command `npm run lint` from the terminal. The handout contains the same eslint configuration that is used by our grading script.
Submission limit resets at 11am EST.
