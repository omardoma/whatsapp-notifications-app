FROM node:9

## Add metadata
LABEL version=1.0
LABEL maintainer="Omar Doma"

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /app

## Install packages using NPM 5 (bundled with the node:9 image)
COPY package.json /app
COPY package-lock.json /app
RUN npm install --quiet
RUN npm i -g pm2 --quiet

## Add application code
COPY . /app

## Set environment variables
ENV NODE_ENV production
ENV REDIS_HOST redis
ENV REDIS_PORT 6379

## Allows port 3000 to be publicly available
EXPOSE 3000

## The command uses pm2 to run the application
# CMD ["npm", "start"]
CMD ["pm2-docker", "start", "./bin/www"]