# Use the official Node.js slim image with a version higher than 22
FROM node:22-slim

  # Set the working directory inside the container
WORKDIR /usr/src/app

  # Copy package.json and package-lock.json to the working directory
COPY package*.json ./

  # Install dependencies
RUN npm config set registry https://registry.npmjs.org/ && npm install

  # Copy the rest of the application code to the working directory
COPY . .

  # Expose port 3000 inside the container
EXPOSE 3000

  # Start the application
CMD ["npm", "start"]

