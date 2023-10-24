---
layout: page
title: CI/CD for Covey.Town
permalink: /activities/continuous-development
nav_order: 1
---

# Continuous Development Pipelines for Covey.Town

In this activity, you will configure a continuous development pipeline using [GitHub Actions](https://github.com/features/actions) and [Render.com](https://www.render.com). Our pipeline will use GitHub Actions to build and test your Covey.Town fork, and use Render.com to deploy the application.

Only one member of each team needs to do these steps - the resulting deployment will be shared by the whole team.

## Pre-requisites
There are two pre-requisites for this activity: you must have a GitHub.com repository generated and you must have a Twilio account. 

### Creating a GitHub Repository
Your team's development must take place within a private GitHub repository in our GitHub Classroom. To create your repository, each member of your team should follow these instructions:
1. Sign in to [GitHub.com](https://www.github.com/), and then [use our invitation to create a repository with the covey.town codebase](https://classroom.github.com/a/7Ax0k2SR). Check to see if one of your groupmates has created a group already - if so, select it to join it. Otherwise, you should enter your group number (e.g. "Group XYY") as the team name where X is your section number and YY is your group number. 
2. Refresh the page, and it will show a link to your new repository, for example: `https://github.com/neu-cs4530/fall23-team-project-group-xyy`. Click the link to navigate to your new repository. This is the repository you will use for the project.

This repository will be private, and visible only to your team and the course staff. After the semester ends, you are welcome to make it public - you have complete administrative control of the repository. 

If you run into the error "refusing to allow an OAuth App to create or update workflow" when trying to push to GitHub, the fix is to [update your saved authentication credentials for GitHub](https://stackoverflow.com/questions/64059610/how-to-resolve-refusing-to-allow-an-oauth-app-to-create-or-update-workflow-on). For instance, you can follow [these instructions to update your credentials in the MacOS Keychain](https://docs.github.com/en/github/using-git/updating-credentials-from-the-macos-keychain). If all else fails, you can [connect to GitHub with SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) instead of HTTPS, which will also solve this problem. This error seems to only occur when pushing a change to the GitHub Actions configuration file, so you could also side-step the problem by having a team mate push this change to GitHub instead (who may not run into this issue).

### Creating a Twilio account and recording the credentials
If you have not configured a Twilio account yet, follow these instructions to set one up:
1. Go to [Twilio's website](https://www.twilio.com/) and sign up for an account. You do not need to provide a credit card to create a trial account, but will need to provide a cell phone number.
	a. When you create your account, to the question "Which Twilio product are you here to use", answer "Video", to "What do you plan to build..." answer "Other", to "Preferred Language" select JavaScript, and to "Would you like Twilio to host your code?" select "No". (It is OK to select other answers, but selecting these will bring you directly to the "programmable video" part of Twilio's admin console. 
2. Create an API Key: Select the "Account" menu from the top toolbar, and then select "API keys & tokens". If prompted, re-enter your password.
3. Take note of the "Live Credentials" in the box lower on this page. The "Account SID" and "Auth token" will be necessary for step 5.
4. Click "Create new API key". Enter any descriptive name that you would like for the "friendly name", and use the other default settings (US region, "standard" key type). Save the "SID" (this will be referenced later as the `TWILIO_API_KEY_SID`) and the "Secret" (this will be referenced later as the `TWILIO_API_KEY_SECRET`).
You'll need this for your local development environment. You can share a single Twilio account with all of the members in your team (sharing the `.env` file), but please be careful to avoid posting the contents of your `.env` file publicly anywhere - someone else might find your credentials and run out all of the free minutes on your account. To set up GitHub Actions and Heroku, we'll need the values from your `.env` file - so be sure to get them working before proceeding.
5. Create a `.env` file in the `services/townService` directory, setting the values as follows:

| Config Value            | Description                               |
| ----------------------- | ----------------------------------------- |
| `TWILIO_ACCOUNT_SID`    | Visible on your twilio account dashboard. Starts with AC...|
| `TWILIO_API_KEY_SID`    | The SID of the new API key you created. Starts with SK...  |
| `TWILIO_API_KEY_SECRET` | The secret for the API key you created.   |
| `TWILIO_API_AUTH_TOKEN` | Visible on your twilio account dashboard. |

You should now be able to start the backend and fronted in your local development environment and have functioning video chat.

## Set up Render.com for the backend towns service
We will configure GitHub Actions to automatically deploy the site to Render.com, after the tests have passed. This way, you can have a publicly available version of your backend service, which will automatically update with any changes that you push to Git.
Note that it is possible to set up Heroku to automatically deploy every new change that you push to GitHub (without setting up GitHub Actions). Instead, we'll configure our GitHub Actions pipeline to deploy to Heroku *only* if our test suite passes.
 
1. Go to [Render.com](https://www.render.com) and create an account that is linked to the same GitHub account that you used to create your fork of the starter code.
2. After signing in, create a new app by clicking the "new" button. Select "Web Service" as the type of the app.
3. For how to deploy the service, select "Build and deploy from a Git repository," and click "Next"
4. Use the "Connect a repository" picker to select your fork of the starter code. Click next.
5. Configure the service:
	* Choose a name for your app that is somewhat descriptive - it will become part of the URL that you'll use to access the service
	* Leave region and branch at their default values
	* For "root directory" enter `townService`
	* Select "Node" as the "runtime"
	* For "build command", enter `npm install && npm run prestart`
	* For "start command", enter `npx ts-node src/Server.ts`
	* Select the "Free" instance type
	* Click "Advanced" to expand the advanced settings
	* Click "Add environmental variable" four times to create the four twilio environmental variables to match those that you put in your local `.env` file. For example, add the key `TWILIO_ACCOUNT_SID` and set the value to be the token that you created (starts with AC...) 
	* Click through to create the service.
6. Wait for the service to build and deploy.
7. To confirm that your service is successfully deployed, try to visit it in your browser. Use the URL that is displayed at the top of the Render.com settings page for the service (for example, `https://covey-deployment-example.onrender.com`). Append `towns` to the URl, and visit it in your browser (e.g. `https://covey-deployment-example.herokuapp.com/towns`). After a short delay, you should see the response `[]`.

## Set up Render.com for the frontend application
The last step to our continuous development pipeline will be to automatically deploy our frontend to Render.com. Render.com will create an optimized production build of your frontend (by running `npm run build`) and host it in their globally-distributed content delivery network. 
 
1. After following the instructions to set up the townService on Render.com above, create a new static site on Render.com. Connect it to the same team repository that you are using for the townervice.
2. Configure the site:
	* Choose a name for your app - this will become part of the URL that you'll use to access the application
	* Leave branch at `main`, and root directory blank
	* For build command, enter `npm install && cd frontend && npm run build && npm run export` 
	* For publish directory, enter `frontend/out`
	* Click "Advanced" to expand the advanced settings
	* Click "Add environmental variable" and add a variable with the key `NEXT_PUBLIC_TOWNS_SERVICE_URL`, setting the value to be the URL of your townService (e.g. `https://covey-deployment-example.onrender.com`)
	* Click "Create static site" to create the site.
3. Render.com will take several minutes to build your site. Once it is deployed, visit the site and confirm that it's working. If you see an error in the JavaScript log like `process is not defined`, this indicates that the site was not built with the `NEXT_PUBLIC_TOWNS_SERVICE_URL` variable set - confirm that it is correctly set, and then rebuild the site on Render.com. 
