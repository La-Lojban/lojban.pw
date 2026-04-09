FROM mcr.microsoft.com/playwright:v1.45.3-focal

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
    fonts-noto-color-emoji \
    fonts-freefont-ttf

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
# `data/pages`, `data/config`, etc., so overlays win.
ENV IN_DOCKER=true
RUN mkdir -p /app/src
WORKDIR /app/src
