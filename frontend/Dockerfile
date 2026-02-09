# --- Stage 1: Build the React App ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine
# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the standard Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]