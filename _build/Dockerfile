FROM node:7.10.0-alpine

MAINTAINER Vanya Andreychuk "vanya@tep.io"

WORKDIR /var/www/html

COPY .cache /var/www/html

COPY run.sh /root/run.sh

RUN npm install --production

EXPOSE 8080


HEALTHCHECK CMD curl -f 127.0.0.1:8080 || exit 1

CMD ["/root/run.sh"]
