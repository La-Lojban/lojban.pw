# Variables
DOCKER_IMAGE_NAME = lojban_made_easy
DOCKER_CONTAINER_NAME = lojban_made_easy

# Build the Docker image
build:
	docker build -t $(DOCKER_IMAGE_NAME) .

# Rebuild the Docker image without cache
rebuild:
	docker build --no-cache -t $(DOCKER_IMAGE_NAME) .

# Install dependencies and Playwright
install:
	docker exec -it $(DOCKER_CONTAINER_NAME) npx playwright install

# Start the development environment
dev:
	docker kill $(DOCKER_CONTAINER_NAME) 2> /dev/null ; \
	docker rm -f $(DOCKER_CONTAINER_NAME) 2> /dev/null ; \
	docker run -d -it --name $(DOCKER_CONTAINER_NAME) \
		--env-file ${CURDIR}/.env \
		-v ${CURDIR}/data/config:/app/src/config/:Z \
		-v ${CURDIR}/data/pages:/app/src/md_pages/:Z \
		-v ${CURDIR}/data/assets:/app/src/public/assets/:Z \
		-v ${CURDIR}/data/DNS:/app/service/DNS/:Z \
		-v ${CURDIR}/data/.cache:/vreji/:Z \
		-v ${CURDIR}/tmp:/tmp/:Z \
		-v ${CURDIR}/src:/app/src/:Z \
		-w /app/src \
		-p 3298:3000 \
		$(DOCKER_IMAGE_NAME) ; \
	docker exec -it $(DOCKER_CONTAINER_NAME) bash

# Stop the development container
stop:
	docker stop $(DOCKER_CONTAINER_NAME)

# Remove the development container
clean:
	docker rm -f $(DOCKER_CONTAINER_NAME)

.PHONY: build rebuild dev install stop clean