---
layout: page
title: User Stories and Conditions of Satisfaction
permalink: /tutorials/week1-user-stories
parent: Tutorials
nav_order: 3
---
This tutorial provides examples for user stories, consitions of satisafation and how a minimum viable product can be defined.

Contents:
* [User Stories and Conditions of Satisfaction](#user-stories-and-conditions-of-satisfaction)
* [User Stories and Project Planning](#user-stories-and-project-planning)
* [User Stories and Test-Driven Development](#user-stories-and-test-driven-development)
* [Examples](#examples)


# User Stories and Conditions of Satisfaction

A user story is an informal, general explanation of a software feature written from the perspective of the **end user or customer**. 

As a <code>&lt;role&gt;</code> I can <code>&lt;perform action&gt;</code> so that I can <code>&lt;receive benefit&gt;</code>

User stories represent something the user/customer might want. There will be many ways to give the user/customer the benefit that they want.

We need to refine these in order to determine what to build. We call these refinements “conditions of satisfaction” (COS)

A COS should be a specific capability or behavior that the user expects, in the user’s terms.  It should be visible to and verifiable by the user.

The COS is a guide to the implementation team. It should be specific enough so that the implementation team has a clear idea of what they are building.
There still may be many ways to implement a COS. For example, a COS probably would not specify any of the graphic or layout details; these would likely be left to the implementation team.

# User Stories and Project Planning

In planning a project, need to assign priorities to each user story and Condition of Satisfaction. Priorities tell us the order in which COS and their associated engineering tasks should be addressed, and how much effort should be devoted to each of them. 
There are many ways to describe priorities. For example, a user story might be described as Essential, Desirable, or Extension:
* **Essential** means the project is useless without it.
* **Desirable** means the project is less usable without it, but is still usable.
* **Extension** describes a User story or COS that is desirable, but may not be achievable within the scope of the project.

## Minimum Viable Product (MVP)
An MVP is a product that consists of all essential user stories. Developers should prioritize those above others. 

# User Stories and Test-Driven Development

We model the development process as a cycle of refinements:

1. User Stories
2. Conditions of Satisfaction
3. Testable behaviors
4. Executable Tests
5. Engineering Tasks (Code)

As we proceed down these refinements, we will likely go back and revisit design decisions that we made at earlier stages. This is the topic of Module 02.

# Examples

## User Stories:
### User Story #1: 
As a manager, I want to track my subordinates’ progress, so that the organization’s business goals are met. [Probably too general; in the agile terminology, this might be an “epic”, which is then refined into a set of user stories]
### User Story #2: 
As a player in covey.town, I want to be able to play a game of connect4 with another player, so that I can pass the time enjoyably. (Essential)

### User Story #3: 
As a player in covey.town, I want to see how well I’m doing at connect4 compared to other players, so I can feel superior to them. (Desirable)

### User Story #4: 
As a player in covey.town, I want to learn different strategies for connect4, so I can win more games. (Extension)

### User Story #5: 
As a user of Covey.Town, I want to be able to interact with other users in different activities like private chat, playing games, etc. while providing ability to customize user avatars to make the town more fun.  (Essential but too general. Best to split it in 3 different stories one for private chat, one for games and one for customization.)

## Conditions of Satisfaction:
### For User Story #2:
* There should be a Conncect4 area in the town, where players can play Connect4. (Essential)
* Whenever there are two players in the same Connect4 area, a Connect4 game is started between them. (Essential)
* The status of the Connect4 game is presented in graphical form on the screen (Essential).
* When one player wins (or there is a draw), both players are notified of the result. (Essential)
* When a player makes a move in the Connect4 game, the tile visibly drops onto the game board, and a suitable sound effect is emitted (Extension)
* If other players enter a Connect4 area while a game is going on, they can see the status of the game also (Desirable)

[**Note:** these COSs do not describe the game board in detail, though that is pretty standard. They also do not describe what happens to the two players when the game is over. Do they stay in the area and spectate? Do the next two players play? Does the first spectator play the winner of the game? etc. etc.]
* There should be a way for one player to challenge another to play the game of Connect4, no matter where they are in the town. (This might be an Extension, or it might be a different user story).

### For User Story #3:
* There should be a leaderboard showing the Connect4 ranking of all the players in the town. (Essential).
* The leaderboard should show the current score of all the Connect4 games currently in progress. (Desirable)
* The leaderboard should show the current score of all the Connect4 games currently in progress, and any player can click on the entry for a game and spectate that game. (Desirable; might be Extension, depending on the expertise of the team).
* The leaderboard should show the lifetime standings of all the players who have ever logged in to this town. (Extension)

### For User Story #5:
* User will be able to join an interactable area which includes leaderboards for all activities (This is too general and should be split in several conditions of satisfactions. For example, joining an area itself can be independent of being able to view leaderboard. Also each activity's leaderboard should have its own condition of satisfaction. There could be several conditions for leaderboard alone to describe how data is organized)
* User is able interact with an instance of interactable area created by another player (This COS is vague. What does interact mean? Does it mean enter an area or do something else?) 
* User is allowed to join an interactable area of another player in a town if the user was not invited (this sounds wrong, opposite to what the system should be doing)
* User is allowed to join an interactable area (Desirable, The priority is wrong. For a user story that requires joining an interable area before anything else, this condition should be considered essential, instead of desirable)


[Reference](https://www.simplilearn.com/tutorials/agile-scrum-tutorial/user-stories#how_to_write_user_stories)
