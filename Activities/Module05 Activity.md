---
layout: page
title: Async Activity
nav_exclude: true
---

# Simple Activity using async/await

Learning Objectives for this activity:
* Practice applying asynchronous programming concepts: promises, async/await
* Experiment with applying different ordering constraints in asynchronous code

## Overview
In this activity, you will experiment with asynchronous programming constructs in TypeScript.

### Before you get started
Be sure to review the code examples discussed during the lecture. You can find the source code linked at the module page.  


### Getting started
Download [starter Code]({{ site.baseurl }}{% link Activities/module05-async_activity.zip %}) 
Run `npm install` to download the dependencies for this project, and then open it in your IDE of choice. 
Run `npm run client` to run the client as-is, the output should be something like:

```
Creating a student
Import grades completed, and returned:
[
  {
    "student": {
      "studentID": 17,
      "studentName": "test student"
    },
    "grades": [
      {
        "course": "demo course",
        "grade": 100
      }
    ]
  }
]

```

### Stringing together many async calls: bulk importing grades
Your task is to write a new, `async` function, `importGrades`, which takes in input of the type `ImportTranscript[]`.
`importGrades` should create a student record for each `ImportTranscript`, and then post the grades for each of those students.
After posting the grades, it should fetch the transcripts for each student and return an array of transcripts. 

You should implement `importGrades` in the file `examples.ts` - note that there is already a function stub there.
As you get started, examine the transcript server client in `client.ts`, and take note of the API calls that are available to you.

Here is the type definition for `ImportTranscript` and its dependencies:
```
type ImportTranscript = {
  studentName: string;
  grades: CourseGrade[];
};
type CourseGrade = { course: Course, grade: number };
type Course = string;
```

Example input:
```
[
    {
        studentName: "Avery",
        grades: [{course: "Software Engineering", grade: 100}, {course: "Chemistry", grade: 70}],
    },
    {
        studentName: "Ripley",
        grades: [{course: "Underwater Basket Weaving", grade: 100}, {course: "Kayaking", grade: 90} ]
    }
]
```

Implement this three ways:
1. Insert a student, insert each of their grades (in order), then insert the next student, then their grades, etc. until all students are inserted, then fetch transcripts
2. Insert a student, then insert each of their grades (in order), then fetch their transcript. Do this set of operations asynchronously (concurrently) for all students
3. Insert a student, then insert each of their grades asynchronously (concurrently). After all students have all of their grades submitted, fetch all fo the transcripts asynchronously (concurrently)
