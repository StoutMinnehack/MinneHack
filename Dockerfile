FROM ubuntu:rolling

RUN apt update
RUN apt upgrade -y
RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

ADD ./ /www
WORKDIR /www

RUN npm install
RUN npm install --global typescript
EXPOSE 3000/tcp
ENTRYPOINT ["npm", "run", "serve"]
