FROM node:boron

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/client

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/client

# Copy dependency definitions
COPY package.json /usr/src/client

# Install dependecies
RUN npm install -g yarn
RUN yarn

# Get all the code needed to run the app
COPY . /usr/src/client

EXPOSE 8080

# Serve the app
CMD ["yarn", "dev"]
