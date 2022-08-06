# ProductsService
Performance | Installation | Testing

Tech stack used: 

This service replaces the API to store and retrieve product data. Each query was stress tested locally using K6 and after deployment using Loader.io. Queries and database structure were optimized at every stage and the service was scaled in order to handle webscale traffic.

# Performance
After deploying the database and server in separate AWS instances, each query was stress tested using Loader.io and could handle ~1000-1500 RPS. After adding a second server and load balancer, each query could handle ~3000 RPS. 

# Installation
To start this application, run the following commands in the terminal: 
$ npm install (installs dependencies)
$ npm start (runs the server on localhost:3000)

# Testing
To test the functionality of each query, run 
$ npm run test
To stress test each query with K6, run
$ k6 run <script.js>
