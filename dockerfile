# Dockerfile for backend
FROM node:20

# Install dependencies required to build bcrypt
RUN apt-get update && apt-get install -y python3 build-essential

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies and build bcrypt from source
RUN npm install bcrypt --build-from-source
RUN npm install

# Copy the app source code
COPY . .

# Build the project
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
