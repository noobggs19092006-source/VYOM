FROM node:20-alpine

ENV NODE_ENV="production"
WORKDIR /app

# Copy root configurations
COPY package.json ./

# Copy all source code (frontend and backend)
COPY . .

# Run the master monorepo build script
# (Installs frontend deps, builds React Vite project to dist/, installs backend deps)
RUN npm run build

# Expose default Fly.io port
EXPOSE 8080
ENV PORT=8080

# Spin up monolithic Express web server
CMD ["node", "server/server.js"]
