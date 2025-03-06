# Use Node.js as the base image for building the app
FROM node:22-alpine3.21

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Vite will run on (5173)
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
