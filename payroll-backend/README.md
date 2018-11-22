This repository uses node.js and it's ecosystem.

System prerequisites:
1. Docker
2. Docker Compose

## Build/Run Instructions
### Development
To run the development server
1. cd to `payroll-backend` directory
2. Run the command `cp .env.dev .env`
3. Run the command `docker-compose -f docker-compose.dev.yml up --build`
4. Stop the docker-compose now(This is required only for first time and not in subsequent running, an interesting problem)
5. Run the previous command again `docker-compose -f docker-compose.dev.yml up --build`

The server will be running on `4242` port on `localhost`.

Note:
Run the frontend from frontend repo

### Notes on implementation
#### Preface
+ It is easy to work individually but hard to collborate in teams if specific guidelines are not agreed upon.
+ The application has been build from the perspective of working in team by following coding standards, easy development and deployment of code.

#### Tech stack
+ Node.js (Server)
+ MongoDB (Database)
+ Mocha & Chai (Testing)
+ Docker & Docker Compose (Development/Deployment)

#### Modular and resuable
+ Code is modular, usable and with separation of concern.

#### Database
+ There are two models WorkLog and JobGroupRate.
+ Worklog stores the uploaded data for archival reason and generating payroll report
+ JobGroupRate stores pay per hour rate as per job group. It could have been constants but rates can be modified and added on the fly. This perspective will be huge plus.
+ All models have required fields for proper validation.
#### Code Guide
+ ESLint is configured and followed very strictly via Airbnb's ESLint with few modifications

#### Testing
+ Testing is important, each API has atleast one test in `test` folder, tests can be run via `npm run test`

#### Docs
+ API docs can be found `gh-pages` branch or generated via `npm run apidoc:generate`. These docs will be used for frontend's API integration and other peers.
+ Similarly common utility has their own doc in `out` folder in `gh-pages` branch and can be generated via `npm run jsdoc:generate`.

#### Debugging
+ Logging is essential for debugging especially in production,  catching the errors earlier, easier it is to fix them and debug.
+ Error handling is extensive throughout the code.
+ Error reporting is done via Sentry.

#### Easy Development
+ Docker compose configures database and app automatically, no hassle of managing different services.

#### Secure Deployment
+ Deployment and development has been separated by individual environment, docker and docker compose files.
+ Each dev, test, production has own environment and databases.

#### User focussed
+ Appropriate message have been provided for each API to frontend.
+ Proper API validation is done on each request

It is important to setup automation, coding standards and have strong foundation early on since more and more people are going to contribute to code base. This will immensely help in reducing/avoiding technical debt.

As always feedback and suggestions are heartly welcomed.

### Acknowledgements
+ Following [guidelines](https://github.com/ashokdey/guidelines/) from the discussion with [Ashok](https://github.com/ashokdey/)
+ Other open source projects
