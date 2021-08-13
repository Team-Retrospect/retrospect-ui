# Retrospect UI

A simple yet powerful user interface for using Retrospect

## Installation with docker-compose.yml file

Download the [docker-compose.yml](https://github.com/Team-Retrospect/docker-files) file

```sh
docker-compose up
```

The UI should start automatically in the browser. If not, it will be running on port 3200. If you are running the application locally, navigate to localhost:3200.

## Manual Installation

- Clone this repo and cd into it
- Run `npm install`
- cd into the client directory
- Run `npm install`
- cd back into the main directory then cd into the server directory
- Run `npm install`
- cd into the routes directory and open `api.js`
- update the `url` string on line 5 to be the domain hosting your [api server](https://github.com/Team-Retrospect/api-server)
  - ex. `'https://localhost'` or `'https://my-api-domain.com'`
- Run `npm run dev`
