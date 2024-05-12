# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Build the React app (modify this command based on your project setup)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment variable for React app
ENV NODE_ENV=production

# Command to start the React app
CMD ["npm", "start"]
