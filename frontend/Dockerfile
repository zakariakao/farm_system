# Use official Node.js image as the base
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Don't build - just run dev server
# (Comment out the build step)
# RUN npm run build

# Expose the frontend port
EXPOSE 4200

# Start the Angular app in dev mode
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]