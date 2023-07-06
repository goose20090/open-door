#!/usr/bin/env bash
# exit on error
set -o errexit

rm -rf public
npm install --prefix client && npm run build --prefix client

cp -a client/dist. public/

# bundle exec rake assets:precomplie 
# bundle exec rake assets:clean
bundle install
bundle exec rake db:migrate
bundle exec rake db:seed