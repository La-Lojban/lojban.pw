build:
	docker build -t lojban_made_easy .

dev:
	docker kill lojban_made_easy 2> /dev/null ; \
	docker rm -f lojban_made_easy 2> /dev/null ; \
	docker run -d -it --name lojban_made_easy \
		-v ${CURDIR}/data/config:/app/src/config/:Z \
		-v ${CURDIR}/data/pages:/app/src/md_pages/:Z \
		-v ${CURDIR}/data/assets:/app/src/public/assets/:Z \
		-v ${CURDIR}/data/DNS:/app/service/DNS/:Z \
		-v ${CURDIR}/data/.cache:/vreji/:Z \
		-v ${CURDIR}/src:/app/src/:Z \
		-w /app/src \
		-p 3298:3000 \
		lojban_made_easy ; \
	docker exec -it lojban_made_easy bash