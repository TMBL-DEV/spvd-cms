# # Stage 1: Development
# FROM node:18 AS development

# # Create and set the working directory
# RUN mkdir /usr/src/app && chown node:node /usr/src/app
# WORKDIR /usr/src/app
# USER node

# # Copy package.json and yarn.lock to install dependencies
# COPY package*.json yarn.lock ./

# # Install all dependencies, including dev dependencies
# RUN yarn

# # Copy the rest of the source code
# COPY . .

# # Build the Nuxt.js application
# RUN yarn build

# # Stage 2: Production
# FROM node:18 AS production

# # Set the NODE_ENV environment variable
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# # Create and set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and yarn.lock to install production dependencies
# COPY package*.json yarn.lock ./

# # Install only production dependencies
# RUN yarn --only=production

# # Copy the built Nuxt.js application from the "development" stage
# COPY --from=development /usr/src/app/dist ./dist

# # Specify the command to run the application in production
# CMD ["node", "dist/main"]


FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat


FROM node:18-alpine AS builder
WORKDIR /nuxt
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /nuxt


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

COPY --from=builder --chown=nuxtjs:nodejs /nuxt/.nuxt ./.nuxt
COPY --from=builder /nuxt/node_modules ./node_modules
COPY --from=builder /nuxt/package.json ./package.json

USER nuxtjs

CMD ["yarn", "dev"]