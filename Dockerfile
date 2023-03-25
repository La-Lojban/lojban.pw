FROM ubuntu:latest

RUN apt-get update 

# install common
RUN apt-get install -y vim bash curl gnupg2

# install python
RUN apt-get install -y python3 python3-pip

# install pdf-related
RUN apt-get install -y ghostscript

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get update && \
    apt-get install -y nodejs
RUN npm install -g yarn

# install fonts
RUN apt-get install -y fonts-noto-color-emoji fonts-freefont-ttf

# cleanup
RUN apt-get autoclean && rm -rf /var/lib/apt/lists/*

#create workspace
RUN mkdir -p /app/src
WORKDIR /app/src

# RUN npx playwright install chromium && npx playwright install-deps

# RUN yarn
