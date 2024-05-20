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
## Vault 
Vault securely stores and manages access to sensitive data like API keys, passwords, certificates, and encryption keys using strong encryption mechanisms. It also enables better compliance with SOC certifications. Vault can generate secrets on-demand, such as database credentials, which are unique, time-limited, and automatically revoked after use, reducing the risk of long-lived credentials.

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
Real time data analysis: Real time data updates on dashboard.

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
Vault Setup
1. Install vault from [https://developer.hashicorp.com/vault/tutorials/getting-started/getting-started-install] or use `npm install         node-vault dotenv`
2. Run `vault server -dev`
3. The above command will give a root token. Copy that root token.
4. Run these 2 commands in terminal and replace the `s.your-root-token` with the token you copied above:
        `export VAULT_ADDR='http://127.0.0.1:8200'`
        `export VAULT_DEV_ROOT_TOKEN_ID='s.your-root-token'`
5. Enable the KV (Key-Value) secrets engine at the default path
        `vault secrets enable -path=secret kv`
6. Store the secrets in vault:
        `vault kv put secret/google-oauth GOOGLE_CLIENT_ID=your-client-id GOOGLE_CLIENT_SECRET=your-client-secret`
7. Run `vault kv list secret/` to see the secrets which you have stored.

Backend
1. Run `npm install`
2. Run `npx sequelize-cli db:migrate`    
3. Run `node server.js`        
4. Run the backend server at [http://localhost:5001] to view the JSON response

Frontend        
1. Create a .env file and put the environment variable as REACT_APP_UNSPLASH_ACCESS_KEY=your-unsplash-access-key
2. Run `npm install`
3. Run `npm start`
4. Runs the app in the development mode.\
        Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

