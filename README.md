# ProductsService
[Performance](https://github.com/Elemental-Designs/ProductsService/blob/main/README.md#performance) | [Installation](https://github.com/Elemental-Designs/ProductsService/blob/main/README.md#installation) | [Testing](https://github.com/Elemental-Designs/ProductsService/blob/main/README.md#testing) | [Contributor](https://github.com/Elemental-Designs/ProductsService/blob/main/README.md#contributor)

Tech stack used: ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)

This service replaces the API to store and retrieve product data. Each query was stress tested locally using K6 and after deployment using Loader.io. Queries and database structure were optimized at every stage and the service was scaled in order to handle webscale traffic.

# Performance
After deploying the database and server in separate AWS instances, each query was stress tested using Loader.io and could handle ~1000-1500 RPS. 

After adding a second server and load balancer, each query could handle ~3000 RPS. 

# Installation
To start this application, run the following commands in the terminal: 
```
$ npm install (installs dependencies)

$ npm start (runs the server on localhost:3000)
```
# Testing
To test the functionality of each query, run 
```
$ npm run test
```
To stress test each query with K6, run
```
$ k6 run <script.js>
```
# Contributor
<table>
  <tr>
    <th>Jessica Chen</th>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/codingavatar">
        <img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
      </a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://www.linkedin.com/in/jessica-chen-md/">
        <img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
      </a>
    </td>
  </tr>
</table>
