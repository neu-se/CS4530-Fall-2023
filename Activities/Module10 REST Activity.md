---
layout: page
title: Working with REST / OpenAPI
nav_exclude: true
---
# REST Transcript Activity

In this activity, you will use TSOA to build a REST client for our transcript database.

As usual, download the [starter code]({{ site.baseurl }}{% link Activities/module10-rest-transcript-activity.zip %}) and run `npm install`.

Then, run `npm start` to generate the OpenAPI specification, server boilerplate, and start the development server.
This command will automatically reload the server as you change files in this project.
To stop the server, press control-C in the terminal.

Once you see the message "Listening on 8081", you can access this URL in your browser: 
[http://localhost:8081/docs/#/transcript](http://localhost:8081/docs/#/transcript)

You should now see a "Swagger" transcript-server-openapi documentation page, with a few API endpoints defined. Expand the "GET /transcripts" endpoint, click "Try it out", and then "Execute". Now, the field "Response Body" should have text in it like:
```
[
  {
    "student": {
      "studentID": 1,
      "studentName": "avery"
    },
    "grades": [
      {
        "course": "DemoClass",
        "grade": 100
      },
      {
        "course": "DemoClass2",
        "grade": 100
      }
    ]
  },
```

This demonstrates that this endpoint of your REST API is functional.  In the rest of the activity, you will implement the remainder of the routes.  Details are in the README page of the starter code.

