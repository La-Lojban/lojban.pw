docker kill lme
docker rm -f lme
docker build -t lme .

docker run -d -it --name lme  \
-v $(pwd)/src:/app/src/:Z \
-v $(pwd)/docs:/app/docs/:Z \
-p 8000:8000 \
lme
# docker exec -it lme bash -c "mkdocs serve -a 0.0.0.0:8000"

docker exec -it lme bash