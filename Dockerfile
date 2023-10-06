# Use the official Node.js Alpine image as base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the local code to the working directory
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

#
