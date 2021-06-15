# Customer List Technical Exercise

## Overview

This application consists of a NextJS front-end and Ruby on Rails API.

NextJS is a React framework that offers several advantages over other React toolchains like Create React App or Gatsby. I particularly appreciate the server-side rendering capabilities and default route-based code splitting of NextJS. It's very easy to get started with and doesn't require much effort up front for these additional benefits.

Rails is incredibly convenient for creating REST APIs. Given the simple initial requirements for the customers endpoint, I determined that a couple of simple JSON endpoints (`/customers` and `/companies`) would be sufficient.

## Getting Started

Make sure Docker is installed and running on your system.

Start the application from the project root using:

`docker compose up -d --build`

Then access the app at localhost:3000.

## Testing

### API

Requirements:

- Postgres 9.3 or higher
- Ruby 3.0.1

To test the Ruby on Rails Customers API ("Customer Service") on your local machine:

1. Navigate to the `/customer_service` directory.

2. Install gems:

   `bundle install`

3. Create and migrate the `customer_service_test` database:

   `RAILS_ENV=test rails db:create`

4. Run the test suite:

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

3. Use `npm run cypress:run` to run tests in a terminal

   or

   `npm run cypress:open` to open the Cypress GUI

These tests depend on seed data in the `/customer_service` Rails project. The seed data is loaded automatically when the Customer Service API container builds, but if that data is modified, it can cause these tests to fail. Reset the API seed data with:

```
docker-compose down --volumes
docker compose up --build
```

_Note: --volumes doesn't work for the compose CLI yet, so use the docker-compose version for that command, or use `docker volume rm newrelic_challenge_db` to remove the volume manually_
