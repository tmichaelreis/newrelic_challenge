#!/bin/sh
set -e

# Clean up previous server pids
rm -f tmp/pids/server.pid

# Ensure gems are installed
bundle check || bundle install

# Run migrations & populate seed data
bundle exec rake db:prepare

exec "$@"