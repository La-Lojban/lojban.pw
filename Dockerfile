FROM mcr.microsoft.com/playwright:v1.45.3-focal

# Set timezone to avoid questions in CLI
ENV TZ=Europe/London
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

# Cleanup to reduce image size
RUN apt-get autoclean && rm -rf /var/lib/apt/lists/*

# Create workspace
RUN mkdir -p /app/src
WORKDIR /app/src

# Optionally, copy package.json and package-lock.json if you want to install npm dependencies
# COPY package*.json ./
# RUN npm install

# Optionally, copy application source code
# COPY . .

# Expose necessary ports
# EXPOSE 3000

# Command to run your application (modify as per your application)
# CMD ["node", "app.js"]
