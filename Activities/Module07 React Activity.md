---
layout: page
title: React
nav_exclude: true
---

## React Activity - Todo Tracker

This activity is designed to give you practice with React.  You will enhance the ToDo app that was discussed in lecture. 

### Steps

To get started, download the [starter Code]({{ site.baseurl }}{% link Activities/module07-react-activity.zip %}). Run the command `npm install`, and then `npm run dev`. The development server should start, and If you open your browser it will start running the app in `pages/page.tsx` If your browser does not open up in the todo app, modify `pages/page.tsx` to point to `./Apps/ToDoApp`

In the ToDoApp, make the following three enhancements:

1. Currently the "priority" field will accept any value.  Modify it so that the priority must be a number.  (Hint: `NumberInput` is your friend)
2. Add a button that will sort the todo items by priority, lowest number first
3. Add an entry field that will take a number and delete all the todo items with priorities greater than that number.  (We are assuming that priority 1 means the thing that has to be done first.)


When you are done, submit your work as required by your instructor.  This may vary from section to section.
