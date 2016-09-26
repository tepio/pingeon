FROM mhart/alpine-node:4

MAINTAINER Vanya Andreychuk "vanya@tep.io"

WORKDIR /var/www/html
COPY .cache /var/www/html
COPY run.sh /root/run.sh

RUN apk add --no-cache make gcc g++ python
RUN npm install
RUN npm prune --production

EXPOSE 8080
CMD [ "npm", "start" ]
