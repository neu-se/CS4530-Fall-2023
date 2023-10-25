---
layout: page
title: Project Overview
permalink: /assignments/project-overview
parent: Assignments
nav_order: 3
---

# Project Overview
The individual and team project for this class are designed to mirror the experiences of a software engineer joining a new development team:
you will be "onboarded" to our codebase, make several individual contributions, and then form a team to propose, develop and implement a new feature.
The codebase that we are be developing on is a remote collaboration tool called [Covey.Town](https://www.covey.town).
Covey.Town provides a virtual meeting space where different groups of people can have simultaneous video calls, allowing participants to drift between different conversations, just like in real life.
Covey.Town is inspired by existing products like [Gather.Town](https://gather.town), [Sococo](https://www.sococo.com), and [Gatherly.IO](https://www.gatherly.io) --- but it is an open source effort, and the features will be proposed and implemented by you!
All implementation will take place in the TypeScript programming language, using React for the user interface.

Select projects from Fall 2022 are hosted [in our project showcase](https://neu-se.github.io/CS4530-Fall-2022/assignments/project-showcase).


### Overview of Project Deliverables

| Date | Deliverable | Description | 
| -----| ----------- | ----------- |
| 09/27/23| Team Formation Survey | Specify preferences for teammates |
| 10/02/23| Project Kick-off Meeting | Schedule a meeting with your Mentor TA during this week |
| 10/11/23 | [Preliminary Project Plan]({{ site.baseurl }}{% link Assignments/project-plan.md %}) | Propose a new feature for Covey.Town that can be planned and implemented within 7 weeks |
| 10/25/23 | Revised Project Plan | Refine the scope of your feature based on staff feedback, define detailed requirements and project acceptance criteria. |
| 11/29/23 | Project Delivery - Implementation and Documentation | Deliver your new feature, including design documentation and tests |

### Summary of Project Grading
Your overall project grade (which will account for 40% of your final grade in this course) will be the weighted average of each of the deliverables.

* Planning (20%)
  * This includes the Preliminary Project Plan and the Revised Project Plan.
* Process (20%)
  * This includes: use of a structured development process, including code reviews, timely completion of progress reports and individual/team surveys, and weekly meetings with TA Mentor.
  * This also includes appropriate division of labor within the project (i.e., roughly equal). For full credit, each member of the team must have at least 4 commits in the final delivered code.
* Product (40%)
  * 20% Successful delivery of your Minimum Viable Product as defined in your project plan
  * 10% Desirable delivered features
  * 10% Test suite of your features.
* Reports (20%)
  * 10% Final Report
  * 10% Poster and Demo

  
In cases where team members do not equally contribute to the project, we may assign different grades to different individuals, up to an extreme of deducting 50% of the team project grade for a student.
We will evaluate each individual's contribution on the basis of a variety of factors, including progress reports at weekly meetings, through inspecting version control history, through each students' self-reflection, and through each students' peer evaluations (during and/or at the end of the project).
We will make regular efforts to collect and distribute this feedback throughout the project — our ultimate goal is for all students to participate and receive full marks.

### Team Formation
All projects will be completed in a team of 3-4 students.
The very first deliverable for the project will be a team formation survey: you will be able to indicate
your preferences for teammates. The instructors will assign students to the teams based on a number of factors including your responses to the survey.
All students in each team must be in the same section of the class.


### Team Meetings with TA Mentor
Each team will be assigned a TA to act as a mentor, who will also serve as your point of contact for project grading and will work closely with you for the entire project.

During Week5, you will have a "Kickoff Meeting" with your TA mentor, where you will meet your TA mentor and have the opportunity to share any early ideas that you might want feedback on before submitting the your preliminary project plan.

Once project begins in full force, you will have weekly meetings with your TA mentor (scheduled at your team's and the TA's convenience) in order to help ensure that you are making progress on the project, and to help address problems that you encounter (be they technical or non-technical problems).

###  Preliminary Project Plan
All projects will involve frontend and backend development of a new feature for Covey.Town.
Once teams have been formed, you and your team will decide what kind of new feature you would like to build.
Your feature should be something that can be implemented within the timeframe allotted (5-7 weeks), and will be implemented in a fork of the main Covey.Town codebase.
Given that you will be up-to-speed on the Covey.Town codebase (and have been introduced to TypeScript, React, NodeJS, and testing frameworks),
and that you will have a team of three or four, we expect that the feature that you propose will be more complex than the feature implemented in the individual assignments.

The project plan will focus on two sections:
* User stories and conditions of satisfaction that describe the feature that you plan to implement. **EACH CONDITION OF SATISFACTION MUST HAVE A PRIORITY (Essential, Desirable, or Optional)**.  The set of Essential items will constitute the "Minimum Viable Product" discussed above.
* Work breakdown: Map your user stories to engineering tasks. Assign each task to a team member (or pair of team members), provide an estimate for how long each task will take, a rationale for that estimate, and schedule those stories into sprints.

### Creating a GitHub Repository
Your team's development must take place within a GitHub repository in our GitHub Classroom. This repository will be private, and visible only to your team and the course staff. After the semester ends, you are welcome to make it public - you will have complete administrative control of the repository.

We will provide instructions to set up these repositoties for all groups and will also provide the starter code for the project (after the revised project plans are submitted).

### Revised Project Plan
Based on the feedback that you receive from the course staff, you will revise your preliminary project plan, creating a more detailed plan to implement your new feature.

The project plan will include:
* Revised user stories and conditions of satisfaction (based on feedback on the preliminary project plan)
* Revised work breakdown (based on feedback on the preliminary project plan)

Your team will self-organize, as agile teams do, and will use the work breakdown and schedule as the basis for weekly check-ins with your team's TA.

### Software Development Process
Each team is expected to use of a structured development process, including code reviews. You will also need to ensure appropriate division of labor within the project (i.e., roughly equal). Teams will also be expected to complete regular progress reports (or sprint retrospectives), and individual/team surveys. Peer evaluation may also be used (for Week 6, 8, 10-14). 
Please note that one of the most important factors in successfully completing a team project is having effective communication. 

### Project Implementation and Documentation

Your final team deliverable will be a "release" of your new feature on GitHub (with tests), and will be accompanied by a demo.
*Optionally,* you may also open a pull request to merge your feature into our main repository (submitting a pull request, or the pull request being merged into our codebase is independent of the grade you receive, but provides a platform for more visiblity of your project). 

Your final team deliverable will include:
* The implementation of your new feature
* Automated tests for your new feature
* A Final Report
* A Poster & Demo (each instructor will provide specifics of the demo, which might very for each section)
    
Accompanying the final team deliverable will be an *individual reflection*, which every student must submit on their own, which will include your reflections on:
* The evolution of your project concept: How does the project that you delivered compare to what you originally planned to deliver? What caused these deviations?
* The software engineering processes that you feel could have been improved in your project: were there any procesess that in hindsight, you wish that you followed, or wish that you followed better?
* Your team dynamic: Provide a frank (and ideally, blameless) postmortem of your and your teammates collaborative performance and participation. If you had to do this same project over with the same teammates, what would *you* have done differently (or not) to improve your team's overall performance?

The details for the final project deliverable will be released by Week 9.
