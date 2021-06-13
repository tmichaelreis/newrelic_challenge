# Customer List Technical Exercise

## Overview

This application consists of a NextJS front-end and Ruby on Rails API.

NextJS is a React framework that offers several advantages over other React toolchains like Create React App or Gatsby. I particularly appreciate the server-side rendering capabilities and default route-based code splitting of NextJS. It's very easy to get started with and doesn't require much effort up front for these additional benefits.

Rails is incredibly convenient for creating REST APIs. Given the simple initial requirements for the customers endpoint, I determined that a single JSON REST endpoint (`/customers`) would be sufficient.

## Getting Started

Make sure Docker is installed and running on your system.

Start the application from the project root using:

`docker compose up --build`

Then access the app at localhost:3000.

## Testing

### API

Requirements:

- Postgres 9.3 or higher
- Ruby 3.0.1

To test the Ruby on Rails Customers API ("Customer Service") on your local machine,

1. Install gems:

   `bundle install`

2. Create and migrate the `customer_service_test` database:

   `RAILS_ENV=test rails db:create`

3. Run the test suite:

   `rspec`
