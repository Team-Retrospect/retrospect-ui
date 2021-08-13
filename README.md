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

### Event Search


The event search page displays a list of events recorded in the browser. These events can be sorted and filtered by their columns. Clicking on a row will display additional Event Details.

### Span Search

The span search page displays a list of spans recorded in the back-end. These spans can be sorted and filtered by their columns. Clicking on a row will display additional Span Details.

### Trigger Routes

The trigger routes page displays a list of trigger routes recorded by Retrospect. Trigger routes are the first route requested in a trace. For example, if a user were checking out in an e-commerce application, the browser might send a request to `/checkout` - this would be the trigger route. Even if that first request results in requests to `/inventory` or `/payment_validation` endpoints, the initial requested route is the trigger route.

Clicking on a row in the trigger route list will show you a list of spans with that same trigger route, i.e. spans whose trace began with that requested route.

### Sessions

The sessions page displays a list of sessions recorded by Retrospect. These sessions can be sorted and filtered by their columns. Clicking on a sessions will bring you to the session page associated with that session id.

### Chapter


### Session
