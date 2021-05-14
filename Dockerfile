FROM ubuntu:rolling

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update

RUN apt-get install -y build-essential software-properties-common curl

RUN apt-get install -y python3 python3-dev python3-pip nodejs npm

RUN apt-get install -y vim nano

RUN pip3 install mkdocs mkdocs-material mkdocs-minify-plugin

RUN echo 'alias build="cd /app/src && mkdocs build -d /app/docs"' >> ~/.bashrc

WORKDIR /app/src
