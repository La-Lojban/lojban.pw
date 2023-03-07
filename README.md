https://lojban.pw website source code
## Deployment

* edit contents of `data/` folder
* commit&push changes
* CI/CD will deploy changes and publish them in gh-pages branch

## Local development

* `make build` - you can use it only once
* `make dev` - run the docker container
	* run `yarn` in the docker console
	* `yarn dev` - run the website in dev mode locally, access it at http://localhost:3298/
	* `yarn compile` - compile to a static folder
