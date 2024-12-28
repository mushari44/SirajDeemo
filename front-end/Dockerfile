# Step 1: Use an official Node.js runtime as the base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (for npm install)
COPY package*.json ./   

# Install dependencies
RUN npm install

# Copy the rest of your React app's files
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the app with a lightweight web server
FROM nginx:alpine

# Copy the build folder from the previous step to the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that the app will run on
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
