FROM ubuntu:rolling

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

RUN apt-get update

RUN apt-get install -y build-essential software-properties-common curl

RUN apt-get install -y python3 python3-dev python3-pip

RUN apt-get install --yes wget curl git vim
RUN curl --silent --location https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install --yes nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg |  apt-key add - \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | dd of=/etc/apt/sources.list.d/yarn.list

RUN  apt-get install -y gnupg ca-certificates \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     # We install Chrome to get all the OS level dependencies, but Chrome itself
     # is not actually used as it's packaged in the node puppeteer library.
     # Alternatively, we could could include the entire dep list ourselves
     # (https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix)
     # but that seems too easy to get out of date.
     && apt-get install -y google-chrome-stable \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

RUN rm /etc/apt/sources.list.d/google-chrome.list

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable


RUN mkdir -p /app/src

COPY src/package*.json /app/

WORKDIR /app/

RUN npm i -g yarn
RUN yarn global add npm-check-updates

RUN apt-get install --yes git

WORKDIR /app/

RUN git config --global user.email "gleki.is.my.name@gmail.com" && git config --global user.name "lagleki"

WORKDIR /app/src

RUN chown -R 1000:1000 /root

RUN npm config set registry https://registry.npmjs.org/

# RUN yarn
