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
- update the `url` variable on line 5 to be the domain hosting your [api server](https://github.com/Team-Retrospect/api-server)
  - ex. `'https://localhost'` or `'https://my-api-domain.com'`
- Run `npm run dev`

## Usage

### Home Page

![retrospect_screenshot_home_page](https://user-images.githubusercontent.com/52018189/129396740-12e9be47-32b4-439b-9066-299778a19630.png)

The home page displays a count of Client-Side, Server-Side, and Frontend Errors. Client-Side errors are spans with a 4xx level status code. Server-Side errors are spans with a 5xx level status code. Frontend Errors are console.error browser events.

The home page also displays a list of those client-side and server-side errors and a list of the frontend errors. Clicking on a row will bring you to the chapter associated with that error.
