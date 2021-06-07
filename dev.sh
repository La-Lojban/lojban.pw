docker kill lme
docker rm -f lme

docker run -d -it --name lme  \
-v ~/.ssh:/root/.ssh:Z \
-v $(pwd)/src:/app/src/:Z \
-v $(pwd)/.git:/app/.git/:Z \
-v $(pwd)/.gitignore:/app/.gitignore:Z \
-v $(pwd)/docs:/app/docs/:Z \
-p 3000:3000 \
lme
docker exec -it lme bash