# Start from the latest Ubuntu image
FROM registry.access.redhat.com/ubi8/nodejs-18

ENV HOST 0.0.0.0

EXPOSE 3000

USER root

# Create directory for our application
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g yarn

# Copy package.json and pnpm-lock.yaml
COPY . .
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
# Install dependencies
RUN yarn install

# Build the application
RUN yarn prisma generate
RUN yarn build
# Start the application
# CMD ["pnpm", "start:prod"]
ENTRYPOINT ["bash","docker-entrypoint.sh"]
