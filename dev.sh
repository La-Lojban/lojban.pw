docker kill lojban_made_easy 2> /dev/null
docker rm -f lojban_made_easy 2> /dev/null
docker run -d -it --name lojban_made_easy  \
-v $(pwd)/data/config:/app/src/config/:Z \
-v $(pwd)/data/pages:/app/src/md_pages/:Z \
-v $(pwd)/data/public/assets:/app/src/public/assets/:Z \
-v $(pwd)/data/DNS:/app/src/public/DNS/:Z \
-v $(pwd)/data/.cache:/app/src/public/vreji/:Z \
-v $(pwd)/src:/app/src/:Z \
-v $(pwd)/.git:/app/.git/:Z \
-v $(pwd)/.gitignore:/app/.gitignore:Z \
-p 3298:3000 \
lojban_made_easy
docker exec -it lojban_made_easy sh