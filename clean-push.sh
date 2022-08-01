git checkout --orphan newBranch
git add -A
git commit
git branch -D react
git branch -m react
git push -f origin react
git gc --aggressive --prune=all