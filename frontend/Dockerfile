FROM node:14.17-alpine

RUN mkdir -p /app/frontend

WORKDIR /app/frontend

# Add node module binaries to path
ENV PATH /app/node_modules/.bin:$PATH

# Install deps
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# Copy application
COPY . /app/frontend

# Start dev server
CMD ["npm", "run", "dev"]
