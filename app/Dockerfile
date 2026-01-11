# import image node versi 18 alpine
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose app port (internal)
EXPOSE 5000

# Start application
CMD ["npm", "start"]

