FROM node:latest
LABEL author="Jerry"


WORKDIR /usr/src/server


COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 3456

# Use an official Redis image as the base image
FROM redis:latest

# Expose the default Redis port (6379)
EXPOSE 6379

CMD [ "node", "server.js" ]