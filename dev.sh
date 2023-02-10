docker kill lojban_made_easy 2> /dev/null
docker rm -f lojban_made_easy 2> /dev/null
docker run -d -it --name lojban_made_easy  \
-v $(pwd)/data/config:/app/src/config/:Z \
-v $(pwd)/data/pages:/app/src/md_pages/:Z \
-v $(pwd)/data/assets:/app/src/public/assets/:Z \
-v $(pwd)/data/DNS:/app/service/DNS/:Z \
-v $(pwd)/data/.cache:/vreji/:Z \
-v $(pwd)/src:/app/src/:Z \
-p 3298:3000 \
lojban_made_easy
docker exec -it lojban_made_easy sh