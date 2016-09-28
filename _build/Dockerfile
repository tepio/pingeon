FROM musedlab/alpine-node

MAINTAINER Vanya Andreychuk "vanya@tep.io"

RUN apk add --update curl make gcc g++ python \
    && mkdir -p /var/www/html

WORKDIR /var/www/html

COPY .cache /var/www/html

COPY run.sh /root/run.sh

RUN  npm install \
     && npm run build \
     && npm prune --production

EXPOSE 8080

HEALTHCHECK CMD curl -f 127.0.0.1:8080 || exit 1

CMD ["/root/run.sh"]
