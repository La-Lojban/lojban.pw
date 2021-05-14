git checkout --orphan new-master master
git commit -m "Initial commit"

git diff new-master master

git branch -D master
git branch --move new-master master
git push --set-upstream origin master -f