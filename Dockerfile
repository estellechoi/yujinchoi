FROM node:14

# install simple http server for serving static content
RUN npm install yarn -g
RUN yarn global add http-server

# make the 'app' folder
WORKDIR /app

# copy package.json & yarn.lock file
COPY package.json ./
COPY yarn.lock ./

# install packages
RUN yarn install

# copy project files and folders to the current working directory
# why in seperate step from packages installation? 
# see http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY . .

# build project
RUN yarn build

EXPOSE 8080

CMD [ "http-server", "dist" ]