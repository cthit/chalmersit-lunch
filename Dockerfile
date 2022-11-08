FROM node:lts-alpine

WORKDIR /app
COPY package.json yarn.lock ./
COPY . .
RUN apk add --no-cache git
RUN yarn install
RUN yarn build
EXPOSE 8080
CMD ["yarn", "start"]