#!/bin/bash

# These environment variables are consumed by the docker-compose file.
# We can supply explicit defaults that are checked in with source code 
# since they are only used for local development.
export SECRET_KEY='django-insecure-%^ggk%_(2n5q0p79xg^2dm3x&*5cc&c5e^yipan0do*413h5ob'
export DEBUG=True
export POSTGRES_DB=recapify_db
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export MY_API_KEY=$1

docker-compose -f docker-compose.local.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10 

docker exec backend-api-1  python /src/manage.py makemigrations 
docker exec backend-api-1  python /src/manage.py migrate