# Customer List Technical Exercise

Thomas Reis

## Overview

This application consists of a NextJS front-end and a Ruby on Rails API.

NextJS is a React framework that offers several advantages over other React toolchains like Create React App or Gatsby. I particularly appreciate the server-side rendering capabilities and default route-based code splitting of NextJS. It's very easy to get started with and doesn't require much effort up front for these additional benefits.

Rails is incredibly convenient for creating REST APIs. Given the simple initial requirements, I determined that a couple of basic REST endpoints (`/customers` and `/companies`) serving JSON data would be sufficient.

## Getting Started

Make sure Docker is installed and running on your system.

Start the application from the project root using:

`docker compose up --build`

Once the containers are running, access the app at localhost:3000.

## Design Considerations

### Docker compose

It's easier to spin up a multi-component environment for demonstration or development purposes in composed containers than individually. This generally avoids tooling and versioning problems. Also, I wanted to demonstrate a familiarity with containerization and Docker tools.

During development, I prefer to run tests outside of containers, so there are instructions below for setting up testing environments as well.

### Frontend code organization

NextJS uses Pages as a first class concept, so the frontend is centered around a `customers` page, which is pre-rendered on the server. The page includes a basic layout and a pre-fetched list of companies.

Since the requirements mostly center around querying for a subset of Customers with some state management for the search and filter options, I decided to only use a single stateful _container_ for all of that logic. The Customers Container is responsible for maintaining the list of Customers, the Customer search query and the Company filter option.

There are a few stateless functional components for presentation: the Customer Search input field, the Company filter dropdown and the Customer Results table. These are rendered by the Customers Container and basically provide inputs/outputs for the Container's internal logic.

### Testing frameworks

On the Rails side, I used a pretty standard RSpec setup. I've used both Minitest and RSpec. I prefer to read RSpec tests and I think it's slightly easier to configure.

Cypress is used for end-to-end integration tests. I like to practice Behavior Driven Development and often prefer using e2e browser tests for developing front-end features over component or snapshot tests. Cypress tests are easy to read and write and are a great way to make sure important features are actually working.

I also included several Jest tests for parts of the frontend application that are good candidates for unit test coverage: some presentational components, the API service, and an object manipulation utility.

### Active Model Serializers

There are more robust options for serializing records in a Rails API, such as jsonapi-resources, fast_jsonapi (recently deprecated), blueprinter, etc. Although AMS has been in a weird limbo state in terms of development, I've had success using the stable 0.10 version. It's easy to configure and has a very simple API, so it works well for simple REST APIs and MVPs.

### Material UI

Material UI is included to slightly improve the app's visual appearance. I have a lot of experience with older versions of Material UI, so it's somewhat familiar territory. When using server-side rendering (like with NextJS), Material UI requires some additional setup for custom styles. For the sake of time, I did not take these steps and didn't use Material UI's `ThemeProvider` or `withStyles`. It's just the default component styles supplemented by my own simple CSS modules.

## Issues/extensions/modifications

- This app was made for demo purposes and is not production ready:

  - The Dockerfiles are written with local usage in mind. The Rails API is exposed to the host machine by running the server on 0.0.0.0. This would be a security risk in production, but it enables easier communication between the front-end app and the API in development.

  - The frontend app is running a dev server. Running the dev server allows a developer to view changes to the code immediately, but it isn't suitable for production, where we would want to serve an optimized production build without the development tools.

  - There aren't any rate limits. This makes the app vulnerable to simple DoS attacks.

- Searching for customers triggers a lot of ajax requests to the API. This isn't scalable with a lot of users and isn't the best UX - the results update too quickly and the experience is a little jerky. There should be a mechanism to look for pauses in typing before executing the Customer search.

- Customer and Company data probably shouldn't be publicly accessibly - the app should include an Authentication mechanism. Maybe Devise & Devise JWT or similar.

- GraphQL + Apollo client could be used instead of the REST endpoints. This would be a good idea if new requirements demanded more traversing of connections between data models or several different combinations of fields from the same data models.

- Search could be made much more robust and sophisticated by using a dedicated search service like Elasticsearch or Solr.

- Terraform or AWS Cloudformation could be used to define and manage cloud infrastructure in order to actually deploy the app to the internet.

- If the UX became more complex with multiple stateful containers, nested containers and components or complicated UI state transitions, it might become necessary to use a state management tool like Redux.

## Testing

Note: If you use `asdf` version manager, you can run `asdf install` in the root directory to install the correct versions of NodeJS and Ruby.

### API

Requirements:

- Postgres 9.3 or higher
- Ruby 3.0.1

To test the Ruby on Rails Customers API ("Customer Service") on your local machine:

1. Navigate to the `/customer_service` directory.

2. Install gems:

   `bundle install`

3. Make sure Postgres is running

4. Create and migrate the `customer_service_test` database:

   `RAILS_ENV=test rails db:create`

5. Run the test suite:

   `rspec`

### Frontend Unit tests

Requirements:

- Node 14.17

1. Navigate to the `frontend` directory

2. Install all npm packages with `npm install`

3. Run tests with `npm run test`

### End-to-end tests

Requirements:

- Node 14.17

To run the end-to-end cypress integration tests:

1. Start the application using `docker compose up`

2. Navigate to the `/e2e_tests` directory

3. Run `npm install`

4. Use `npm run cypress:run` to run tests in a terminal

   or

   `npm run cypress:open` to open the Cypress GUI

These tests depend on seed data in the `/customer_service` Rails project. The seed data is loaded automatically when the Customer Service API container builds, but if that data is modified, it can cause these tests to fail. Reset the API seed data with:

```
docker compose down --volumes
docker compose up --build
```

_Note: the --volumes flag does not work for older versions of the compose CLI. In that case, use the `docker-compose down --volumes` form (with hyphen), or use `docker volume rm newrelic_challenge_db` to remove the volume manually._
