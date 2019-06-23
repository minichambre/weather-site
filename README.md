# Gowing weather

## Description

Weather site that displays the temperature and general weather overview of a location entered into the search bar. Uses Weatherbit as the API.

## Requirements
- NPM & NODE
- Weatherbits API Key

## Install
- Clone repo.
- Node_modules already included, no real need to npm install.
- Create a .env file in the root and add "APIKEY=" and "environment=" on seperate lines.
- Paste your API key after the APIKEY=, and set environment to either "dev" or "production". Dev mode uses preloaded JSON API responses to prevent too many queries to weatherbit.
- Run npm start to start the server and go to localhost:8080
