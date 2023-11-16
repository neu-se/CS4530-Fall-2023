---
layout: page
title: Final Project Grading
permalink: /assignments/project-grading
parent: Assignments
nav_order: 7
---
# Grading
Each project will be graded by the team's assigned TA mentor and the instructor. For most of the submission components below, we provide two benchmark rubrics: one for a submission that is satisfactory (full marks), and one that would be meeting our minimum expectations (a pass). In practice, when grading projects we will usually assign numeric grades and provide partial credit, using these rubrics as guidelines for those two extremes. Rubric for remaining components will be provided by individual instructors. 

### Adjustments in project scope
We are hopeful that all teams will deliver all essential AND desired features proposed in their revised project plans. However, it is possible that there might be some minor deviations from the origional plan - in the five-week implementation period, there are sure to be some teams that encounter unexpected technical hurdles. As described in greater detail in the rubrics below, teams that have regular communication with their TA regarding their project status may have the opportunity to request variances to their project scope. 

### Individual Contributions to the project
In cases where team members do not equally contribute to the project, we may assign different grades to different individuals, up to an extreme of deducting 50% of the marks from a student. In the event that a group member does not contribute at all to the project, student might receive 0. We will evaluate each individual's contribution on the basis of a variety of factors, including progress reports at weekly meetings, through inspecting version control history, through each team's (or student's) peer evaluations during and/or at the end of the project, and through each student's self-reflection. We will make regular efforts to collect and distribute this feedback throughout the project. Our ultimate goal is for all students to participate and receive full marks.

## Summary of grading 

From [Project Overview]({{ site.baseurl }}{% link Assignments/project-overview.md %})

* Planning (20%)
  * This includes the Preliminary Project Plan and the Revised Project Plan.
* Process (20%)
  * This includes: use of a structured development process, including code reviews,  timely completion of sprint progress reports and individual/team surveys, and weekly meetings with TA Mentor.
  * This also includes appropriate division of labor within the project.  For full credit, each member of the team must have at least 4 commits in the final delivered code.
* Product (40%)
  * 20% Successful delivery of your Minimum Viable Product as defined in your project plan
  * 10% Additional desirable features
  * 10% Test suite of your features.
* Reports (20%)
  * 10% Final Report
  * 10% Poster and Demo

This adds up to 100%; this sum is worth 40% of the course grade.

## Detailed Rubrics
Here are the detailed rubrics for the final deliverables:

### Minimum Viable Product (20%) 
### Additional Desirable Features (10%)
We will grade each of these using the following rubric:

#### Satisfactory:
* Implemented feature satisfies the conditions of satisfaction as proposed by the team and as agreed to by the course staff. If technical difficulties resulted in features being dropped, the project may still earn full marks on "delivered features," but these difficulties must have been documented with the course staff as you encountered them during development.
* Implemented feature is deployed to a publicly-accessible URL, using Netlify and Heroku and/or Render.com for hosting (or as per deployement instructions provided).
* Implemented feature contains no ESLint warnings or errors; does not include any eslint-disable or ts-ignore flags

#### Meets minimum requirements:
* Implemented feature largely satisfies acceptance criteria as proposed by the team, but may not meet the course staff’s interpretation of those criteria.
* Implemented feature is deployed to a publicly-accessible URL, using Netlify and Heroku /Render for hosting (or as per deployement instructions provided).
* The implementation may have some obvious flaws, but largely works without crashing.
* Implemented feature does not include any eslint-disable or ts-ignore flag

### Testing (10%)
The project must include evidence of testing. Ideally, all new features will be accompanied by fully automated tests, but in some circumstances (particularly when engaging with Phaser, the game library, or Tiled, the map editor), this may not be feasible. If automated tests are not possible, include a discussion of your manual testing strategy, including a script that a future developer could use to manually test the feature.

#### Satisfactory:
* Any new or modified backend features include tests that validate that the feature works as intended. These tests cover the changed code, and also contain well-written assertions that thoroughly check the expected behaviors.
* Tests contains no ESLint warnings or errors; does not include any eslint-disable or ts-ignore flags

#### Meets minimum requirements:
* Any new or modified backend features include at least one test, which may or may not be an effective test.
* Tests may contain ESlint warnings (but no errors); does not include any eslint-disable or ts-ignore flags

### Process (20%)
The Process grade includes: use of a structured development process, including code reviews, timely completion of sprint progress reports/retrospectives, individual/team surveys, peer evaluations and weekly meetings with TA Mentor (for Week 6, 8-13). It also includes appropriate division of labor within the project. For full credit, each member of the team must have at least 4 commits in the final delivered code. 
* Ongoing development progress including code reviews, github commits, etc. count 10% of the grade
* Peer evaluations, TA meeting, submission of surveys/reports counts 10% of the project grade. 
These items will be evaluated using the rubrics below. 

#### Satisfactory:
* There is a clear development history visible from the git repository: features were delivered incrementally, and not in a single (or several) commits at the end of the project
* There is evidence of code review - for example, pull requests that have comments on them. Teams are expected to merge their developvemeent branches to main only after code review. 
* There is a correspondence between commit messages and the technical tasks that they are associated with; there are few (if any) commits with meaningless commits messages like `.` or `Add files via upload`.
* Each team member has made at least 4 commits over the lifespan of the project
* The team meets regularly with the TA mentor.  All or most members attend all meetings. Members who are absent from a TA Meeting send an excuse in advance.
* Progress reports and other weekly reports and surveys are submitted in a timely fashion, not filled in later.
* TA Meetings include demos or other evidence of progress.

#### Meets minimum requirements:
* There is a clear development history visible from the git repository: features were delivered incrementally, and not in a single (or several) commits at the end of the project
* Each team member has made at least 2 commits over the lifespan of the project
* Attendance at TA meetings may be irregular, but enough to give the TA a sense of the the team's progress.
  
#### Individual grading for Process component
Team members with unexcused absences from TA Meetings, or with fewer than 4 commits during the lifespan of the project, may receive a lowered grade for the Process component. 

### Final Report (10%)
The final report should consist of three sections:
* Feature Overview and User Manual
* Technical Overview
* Process Overview

The allocation of the 10% credit will be as follows: Overview and manual will be worth 4%, technical and process overviews will be worth 3% each.

### * Feature Overview and User Manual

#### Satisfactory:
* The Feature section contains sufficient documentation for a user to build and interact with your updated version of Covey.Town.
  * The documentation covers all the steps that a user would need to build a working version of your project.
  * The documentation includes a link to the deployed version of your project
* The documentation covers all steps that the user would need to take to exercise all of your user stories.
* Screenshots are included that capture the key interactions between a user and your new feature.
* Course staff were able to follow these instructions to successfully interact with your project implementation.
* URL of the deployed app.
* The section is at most 4 pages (roughly 2,000 words maximum), NOT including figures. Fewer pages are absolutely acceptable; consider this a rough limit

#### Meets minimum requirements:
* The Feature contains documentation for a user to interact with your updated version of Covey.Town, but perhaps does not fully describe how.
* The documentation includes at least one or two screenshots, but screenshots do not capture interactions with all of the user stories.
* The course staff were able to figure out how to use it through trial and error.
* URL of the deployed app.
* The section is at most 4 pages, NOT including figures. Fewer pages are absolutely acceptable; consider this a rough limit

### * Technical Overview
#### Satisfactory:
* Technical Overview contains a description of any substantive changes to the existing Covey.Town codebase, and of the architecture of your new code.
* It uses UML diagrams, CRC cards, state diagrams or other techniques that help describe the structure.
* It provides a well-reasoned rationale for why this is the "right" design. 
* The document is at most 2 pages (fewer pages are absolutely acceptable, consider this a rough limit) 
* 
#### Meets minimum requirements:
* Technical Overview includes a description of all major changes to the code compared to our existing Covey.Town codebase.
* The document is at most 2 pages (fewer pages are absolutely acceptable, consider this a rough limit) 

### * Process Overview
#### Satisfactory:
* Process overview contains a detailed description of the manner in which agile project management processes were used during the project (i.e., sprints, sprint reviews, retrospectives and blameless reviews).
* It provides a summary of what was planned to happen in each sprint vs what actually happened, with a discussion of what was revised as a result. 
* The document is at most 2 pages (fewer pages are absolutely acceptable, consider this a rough limit) 

#### Meets minimum requirements:
* It provides a summary of what was planned to happen in each sprint vs what actually happened, with a discussion of what was revised as a result. 
* The document is at most 2 pages (fewer pages are absolutely acceptable, consider this a rough limit) 

### Posters and Demo (10%)
Each team will be required to submit a poster. In addition, some sections may have a demo (live in-person, via zoom or by recorded video). Each instructor will provide details regarding expectations for the demo and/or presentation. The schedule and manner of these demos might also vary from section to section.  The specifications for the different sections are listed below:
* [Sections 2, 4, 7 - Prof. Bhutta](https://neu-se.github.io/CS4530-Fall-2023/assignments/sec-247-demos)
* [Section 6 - Prof. Wand](https://neu-se.github.io/CS4530-Fall-2023/assignments/sec-6-demos)

Select projects may be hosted in our project showcase. Here are selected projects from Fall 2022 [project showcase](https://neu-se.github.io/CS4530-Fall-2022/assignments/project-showcase).

## Individual Reflection

Accompanying the final team deliverable will be an individual reflection, which every student must submit on their own.
Satisfactory completion of all parts of this reflection is required to receive an "A" grade in the course, and may be used to calibrate project scores across multiple team members.
The individual reflection also provides an opportunity for students to provide confidential feedback on the performance of their teammates.

### Project Concept

Reflect on the evolution of your project concept: How does the project that you delivered compare to what you originally planned to deliver? What caused these deviations?

#### Satisfactory:
* Is at least 2 paragraphs long;
* Includes at least 1 paragraph describing all variances from original project concept;
* Includes at least 1 paragraph of personal reflection on the cause of any variances from the project concept.

### Project Process

Reflect on the evolution of your development process: How did the process by which you designed and implemented evolve from your original project plan? Were there any processes that in hindsight, you wish that you followed, or wish that you followed better?

#### Satisfactory:
* Is at least 2 paragraphs long;
* Includes at least 1 paragraph describing all variances from the software development processes envisioned in your original project plan;
* Includes at least 1 paragraph describing software processes (described in class or not) that you wish you had followed, or wish you had followed better, supported by evidence from your personal experience working on the project.

### Project Team

Reflect on your team dynamic: Provide a frank (and ideally, blameless) postmortem of your and your teammates collaborative performance and participation. If you had to do this same project over with the same teammates, what would you have done differently (or not) to improve your team’s overall performance? Do you think that each of your teammates are deserving of the same grade as you?

#### Satisfactory:
* Is at least 2 paragraphs long;
* Includes at least 1 paragraph reflecting on your own performance as a team member on this project, including what you would have done differently, given what you know now;
* Includes at least 1 paragraph reflecting on your overall team dynamic, including strengths and weaknesses. Reflect on how you might have organized your team differently given what you know now.
