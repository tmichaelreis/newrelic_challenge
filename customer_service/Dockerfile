FROM ruby:3.0.1-slim-buster

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir -p /app/customer_service
WORKDIR /app/customer_service

COPY Gemfile /app/customer_service/Gemfile
COPY Gemfile.lock /app/customer_service/Gemfile.lock

RUN gem install bundler
RUN bundle install

COPY . /app/customer_service

# Cleanup
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN chmod +x /app/customer_service/entrypoint.sh

ENTRYPOINT [ "sh", "/app/customer_service/entrypoint.sh" ]

CMD [ "bundle", "exec", "rails", "s", "-p", "4000" ]