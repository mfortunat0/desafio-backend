FROM node:18.9.0-alpine3.16
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn prisma generate && yarn build
CMD yarn start:migrate:prod 