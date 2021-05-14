docker kill lme
docker rm -f lme

docker run -d -it --name lme  \
-v $(pwd)/src:/app/src/:Z \
-v $(pwd)/docs:/app/docs/:Z \
-p 8000:8000 \
lme
docker exec -it lme bash -c "mkdocs build -d /app/docs"
git add . ; git commit -m "fix" ; git push