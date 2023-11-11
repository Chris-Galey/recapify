#!/bin/bash

# These environment variables are consumed by the docker-compose file.
# We can supply explicit defaults that are checked in with source code 
# since they are only used for local development.
export SECRET_KEY=$1
export DEBUG=True
export POSTGRES_DB=recapify_db
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export DB_HOST=db
export DB_PORT=5432
export MY_API_KEY=$2

docker-compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10 

docker exec recapify-api-1  python /src/manage.py makemigrations 
docker exec recapify-api-1  python /src/manage.py migrate