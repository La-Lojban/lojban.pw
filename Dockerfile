FROM ubuntu:focal

# set timezone to avoid questions in CLI 
ENV TZ=Europe/London
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# install common
RUN apt-get update && apt-get install -y vim bash curl gpgv

# install python
RUN apt-get update && apt-get install -y python3 python3-pip

# install pdf-related
RUN apt-get update && apt-get install -y ghostscript

# install nodejs
RUN set -uex; \
    apt-get update; \
    apt-get install -y ca-certificates curl gpgv; \
    mkdir -p /etc/apt/keyrings; \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
     | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg; \
    NODE_MAJOR=21; \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" \
     > /etc/apt/sources.list.d/nodesource.list; \
    apt-get update; \
    apt-get install nodejs -y;

# install fonts
RUN apt-get update && apt-get install -y fonts-noto-color-emoji fonts-freefont-ttf

# cleanup
RUN apt-get autoclean && rm -rf /var/lib/apt/lists/*

#create workspace
RUN mkdir -p /app/src
WORKDIR /app/src

RUN npx playwright install chromium
RUN npx playwright install-deps

# RUN yarn