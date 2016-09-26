FROM mhart/alpine-node:4

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN apk add --no-cache make gcc g++ python
RUN npm install
RUN npm prune --production

EXPOSE 8080
CMD [ "npm", "start" ]
