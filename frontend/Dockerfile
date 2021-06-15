FROM node:14.17-alpine

RUN mkdir -p /app/frontend

WORKDIR /app/frontend

# Add node module binaries to path
ENV PATH ./node_modules/.bin:$PATH

# Install deps
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy application
COPY . .

# Start dev server
CMD ["npm", "run", "dev"]
