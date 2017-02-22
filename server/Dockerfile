FROM node:boron

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/server

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/server

# Copy dependency definitions
COPY package.json /usr/src/server

# Install dependecies
RUN npm install -g yarn
RUN yarn

# Get all the code needed to run the app
COPY . /usr/src/server

EXPOSE 3000

# Serve the app
CMD ["yarn", "start"]
