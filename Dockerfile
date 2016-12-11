FROM node:6.9
ARG port=3000

MAINTAINER tuanvuong <vanhtuan0409@gmail.com>

# Enviroment variable
ENV APP=/usr/app PORT=$port
RUN echo $PORT

# Create working directory
RUN mkdir -p $APP
WORKDIR $APP

# Install yarn
ADD package.json yarn.lock $APP/
RUN npm install -g yarn

# Clean directory
RUN rm -rf node_modules && yarn install && yarn cache clean && npm cache clean && rm -rf ~/tmp/*

# Copy file
ADD . $APP
RUN yarn run build

EXPOSE $PORT
CMD yarn run start