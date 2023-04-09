# Dockerfile

# Use the official Node.js image as the base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the project dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
