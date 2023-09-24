# Base image
FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy your files
COPY execute.js ./
COPY interpreter.js ./

# Start the app
CMD [ "node", "execute.js" ]
