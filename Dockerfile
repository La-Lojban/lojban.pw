FROM alpine

ENV PYTHONUNBUFFERED=1
RUN apk add --update python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --upgrade pip setuptools

RUN apk add \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn \
      git vim curl bash

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.

USER pptruser

RUN mkdir -p /app/src

WORKDIR /app/

RUN yarn global add npm-check-updates npx

WORKDIR /app/

RUN git config --global user.email "gleki.is.my.name@gmail.com" && git config --global user.name "lagleki"

WORKDIR /app/src

# RUN chown -R 1000:1000 /root

RUN yarn config set registry https://registry.npmjs.org/

# RUN yarn
