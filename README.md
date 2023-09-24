https://lojban.pw website source code
## Deployment

* edit contents of `data/` folder
* commit&push changes
* CI/CD will deploy changes and publish them in gh-pages branch

## Local development
* populate `.env` file with:
```
GOOGLE_READONLY_API_KEY=your google api key to read google spreadsheet documents shared to the internet 
GOOGLE_LOJBAN_CORPUS_DOC_ID=1_vkiwqOIOIJPqZTiomzd4ApUSEQXhEY6CeyZD_6c-PA is an example of Lojban corpus Google spreadsheet
```
* `make build` - you can use it only once
* `make dev` - run the docker container
	* run `npm i` in the docker console
	* `npm run dev` - run the website in dev mode locally, access it at http://localhost:3298/
	* `npm run build && npm run start` - compile to a static folder and run it locally at http://localhost:3298/
