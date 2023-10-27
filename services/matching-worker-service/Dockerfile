# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to cache dependencies
COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies
RUN npm install --omit=dev

# Copy the application code
COPY . .

# Stage 2: Development
FROM build AS dev

# Install development dependencies
RUN npm install

# Stage 3: Production
FROM node:18-alpine AS production

WORKDIR /app

# Copy only production-ready files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src

# Build the application
RUN npm run compile

# Start the application 
CMD ["npm", "run", "start:migrate:prod"]
