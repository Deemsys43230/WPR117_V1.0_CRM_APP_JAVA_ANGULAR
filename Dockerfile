# ==========================================
# Stage 1: Build the Angular Application
# ==========================================
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency manifests first for optimal layer caching
COPY package.json package-lock.json ./

# Clean installation of dependencies
RUN npm ci

# Copy application source files
COPY . .

# Build Angular app for production (outputs to dist/crm)
RUN npm run build -- --configuration production

# ==========================================
# Stage 2: Serve with Nginx
# ==========================================
FROM nginx:alpine

# Remove default Nginx welcome assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts from build stage
COPY --from=build /app/dist/crm /usr/share/nginx/html

# Copy custom Nginx configuration for Angular SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 8081

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

