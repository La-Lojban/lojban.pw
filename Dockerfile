# Noble = Ubuntu 24.04 (newer Chromium deps, glibc, and apt pandoc with native `-t typst`).
# Tag matches npm: `src/package.json` (@playwright/test, playwright-core) and root `package.json` (playwright).
FROM mcr.microsoft.com/playwright:v1.59.1-noble

# Set timezone to avoid questions in CLI
ENV TZ=Europe/London
ENV IN_DOCKER=true
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install additional common dependencies
RUN apt-get update && apt-get install -y \
    vim \
    bash \
    curl \
    gpgv \
    python3 \
    python3-pip \
    ghostscript \
    lsof \
    pandoc \
    fonts-noto-color-emoji \
    fonts-freefont-ttf \
    xz-utils

# Typst CLI for PDF_BACKEND=typst (Learn Lojban pilot and future books)
ARG TYPST_VERSION=0.14.2
RUN curl -fsSL "https://github.com/typst/typst/releases/download/v${TYPST_VERSION}/typst-x86_64-unknown-linux-musl.tar.xz" -o /tmp/typst.tar.xz \
    && tar -xJf /tmp/typst.tar.xz -C /usr/local/bin --strip-components=1 "typst-x86_64-unknown-linux-musl/typst" \
    && rm /tmp/typst.tar.xz \
    && typst --version

# Install Node.js 24 (app and CI use Node 24)
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs

# Cleanup to reduce image size
RUN apt-get autoclean && rm -rf /var/lib/apt/lists/*

# Install pnpm (matches packageManager in src/package.json)
RUN npm install -g pnpm@10.33.0

# Workspace: bind-mount the repo’s `src/` here, then overlay `data/` paths (see Makefile and
# `.github/workflows/main.yml`). No COPY of the app — `src/public/assets` is a symlink to
# `../../data/assets` in git; in Docker, mounting `data/assets` onto `/app/src/public/assets`
# replaces that link with real files. Mount order must be: `src` first, then `data/assets`,
# `data/pages` → `/app/src/md_pages`, `data/config`, etc., so overlays win. Typst PDF builds
# (`build-learn-lojban.ts`) resolve repo root as `/app` using `src/md_pages` + `src/public/assets`.
ENV IN_DOCKER=true
RUN mkdir -p /app/src
WORKDIR /app/src
