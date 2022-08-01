docker kill lojban_made_easy 2> /dev/null
docker rm -f lojban_made_easy 2> /dev/null
docker run -d -it --name lojban_made_easy  \
-v $(pwd)/src:/app/src/:Z \
-v $(pwd)/.git:/app/.git/:Z \
-v $(pwd)/.gitignore:/app/.gitignore:Z \
-v $(pwd)/docs:/app/docs/:Z \
-p 3000:3000 \
lojban_made_easy
docker exec -it lojban_made_easy sh