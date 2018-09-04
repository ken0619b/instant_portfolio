FROM node:8.9.3-alpine

# install simple http server for serving static content
RUN npm install -g http-server npx

# make the 'app' folder the current working directory
WORKDIR /app

# install project dependencies
RUN npm install

EXPOSE 8080
# CMD [ "http-server", "dist" ]