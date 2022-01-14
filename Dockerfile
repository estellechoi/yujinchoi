FROM node:14

WORKDIR /frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

EXPOSE 8080