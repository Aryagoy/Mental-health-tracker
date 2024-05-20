### Mental Health Progress Tracker  
Table of Contents
Objective
Features
Tech Stack
Setup Instructions
Usage


### Objective
The objective of this project is to create a simple, secure, and user-friendly web application for tracking daily mental health statuses. This application is designed to help patients log their mental health status daily and view trends over time.

### Features

## Frontend (React)
User Authentication: Login with Google for authentication.
Daily Log Form: A form where users can submit their daily mental health status, including:
    1. Mood Ratings: Self-reported mood on a scale from very sad to very happy.
    2. Anxiety Levels: Self-assessed anxiety levels.
    3. Sleep Patterns: Hours of sleep, quality of sleep, and any disturbances.
    4. Physical Activity: Type and duration of physical activity.
    5. Social Interactions: Frequency of social engagements.
    6. Stress Levels: Self-reported stress levels.
    7. Symptoms of Depression or Anxiety: Presence and severity of specific symptoms.
Data Visualization: Charts summarizing the user’s weekly trends for any mood, sleep and anxiety levels.

## Backend (Node.js)
API Endpoints:
User authentication endpoints.
POST /log: Endpoint to submit daily logs.
GET /logs: Retrieve logs for visualization.
GET /logs/weekly: Get the weekly data for the user
Database Integration: Used SQLite to store user credentials and daily logs.

## Setup Instructions
Prerequisites
Node.js and npm installed
SQLite installed
Google Cloud project setup for OAuth 2.0


## Usage
Backend
1. Run `npm install`
2. Create a .env file to store the secrets:
        GOOGLE_CLIENT_ID=your-google-client-id
        GOOGLE_CLIENT_SECRET=your-google-client-secret
3. Run `npx sequelize-cli db:migrate`    
4. Run `node server.js`        
5. Run the backend server at [http://localhost:5001] to view the JSON response

Frontend        
1. Run `npm install`
2. Run `npm start`
3. Runs the app in the development mode.\
        Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

