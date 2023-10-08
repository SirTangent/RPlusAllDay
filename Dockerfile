# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

RUN git clone https://github.com/wkhammond/vinebot.git
WORKDIR /usr/src/app/vinebot

# COPY package*.json ./

RUN apt-get update && npm install

# Copy local code to the container image.
# COPY *.js .

COPY .env .


# Expose the port your app runs in
EXPOSE 3001

# Run the web service on container startup.
CMD [ "node", "bot.js" ]
