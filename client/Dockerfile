FROM node:9.3-alpine

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json yarn.lock /usr/src/app/

RUN yarn --pure-lockfile && yarn cache clean --force

COPY . /usr/src/app

CMD ["npm", "start"]
