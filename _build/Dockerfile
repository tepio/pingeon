FROM node:argon

MAINTAINER Vanya Andreychuk "vanya@tep.io"

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

COPY .cache /var/www/html

COPY run.sh /root/run.sh

EXPOSE 8080

CMD ["/root/run.sh"]
