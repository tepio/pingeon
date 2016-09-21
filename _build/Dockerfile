FROM mhart/alpine-node:4

MAINTAINER Vanya Andreychuk "vanya@tep.io"

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

COPY .cache /var/www/html

COPY run.sh /root/run.sh

EXPOSE 8080

HEALTHCHECK CMD curl -f 127.0.0.1 || exit 1

CMD ["/root/run.sh"]
