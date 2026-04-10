# Noble = Ubuntu 24.04 (newer Chromium deps, glibc). Pandoc is pinned to match local dev/CI
# typst-book output (`pandoc -f html -t typst`); Ubuntu’s package is often older and emits
# different Typst (`#blockquote[` vs `#quote(block: true)[`, etc.).
# Tag matches npm: `src/package.json` (`playwright-core`).
FROM mcr.microsoft.com/playwright:v1.59.1-noble

# Set timezone to avoid questions in CLI
ENV TZ=Europe/London
ENV IN_DOCKER=true
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install additional common dependencies (Pandoc: see next RUN — pinned release .deb)
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
    fonts-freefont-ttf \
    xz-utils

# Pin Pandoc to the same series as local `pandoc --version` (HTML→Typst writer stability).
ARG PANDOC_VERSION=3.1.11.1
RUN curl -fsSL "https://github.com/jgm/pandoc/releases/download/${PANDOC_VERSION}/pandoc-${PANDOC_VERSION}-1-amd64.deb" -o /tmp/pandoc.deb \
    && apt-get install -y /tmp/pandoc.deb \
    && rm /tmp/pandoc.deb \
    && pandoc --version | head -1

# Typst CLI for book PDFs (Learn Lojban and future books)
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
