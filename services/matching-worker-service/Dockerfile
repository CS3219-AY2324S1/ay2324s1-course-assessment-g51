# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to cache dependencies
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Stage 2: Production
FROM node:18-alpine AS production

WORKDIR /app

# Copy files from the build stage
COPY --from=build /app/tsconfig.json ./
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/prisma ./prisma

# Build the application
RUN npm run compile

# Remove dev dependencies
RUN npm prune --production

# Run Prisma migration
RUN npx prisma migrate deploy

# Start the application 
CMD ["npm", "run", "start"]
