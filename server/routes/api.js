const express = require('express');
const router = express.Router();
// const Span = require("../models/span");
// const Event = require("../models/event");
const axios = require('axios');

// will have to be updated when we use Cassandra
router.get('/spans', (req, res, next) => {
  axios
    .get('http://api.xadi.io/spans')
    .then((response) => response.data)
    .then((spans) => {
      spans = spans.map((span) => {
        span.data = JSON.parse(span.data);
        return span;
      });
      res.json(spans);
    })
    .catch((err) => console.log(err));

  // // MongoDB
  // Span.find({})
  // 	.then((spans) => {
  // 		res.json(spans);
  // 	})
  // 	.catch(next);
});

router.get('/events', (req, res, next) => {
  axios
    .get('http://api.xadi.io/events')
    .then((response) => response.data)
    .then((events) => {
      events = events.map((event) => {
        event.data = JSON.parse(event.data);
        return event;
      });
      res.json(events);
    })
    .catch((err) => console.log(err));

  // // MongoDB
  // Event.find({})
  // 	.then((events) => {
  // 		res.json(events);
  // 	})
  // 	.catch(next);
});

router.get('/trigger_routes', (req, res, next) => {
  axios
    .get('http://api.xadi.io/trigger_routes')
    .then((response) => response.data)
    .then((routes) => {
      let triggerRoutes = {};
      routes.forEach(obj => {
        let data = JSON.parse(obj.data)
        console.log('data', data)
        if (data['http.method'] !== 'OPTIONS') {
          triggerRoutes[obj.trigger_route] = true
        }
      })
      res.json(Object.keys(triggerRoutes));
    })
    .catch((err) => console.log(err));

  // // MongoDB
  // Span.find({})
  //   .then((spans) => {
  //     const triggers = spans.reduce((acc, span) => {
  //       acc[span.get('trigger_route')] = true;
  //       return acc;
  //     }, {});
  //     res.json(Object.keys(triggers));
  //   })
  //   .catch(next);
});

// get spans by session id
router.get('/session/:id', (req, res, next) => {
  const sessionId = req.params.id;

  axios
    .get('http://api.xadi.io/spans')
    .then((response) => response.data)
    .then((spans) => {
      spans = spans.map((span) => {
        span.data = JSON.parse(span.data);
        return span;
      });
      spans = spans.filter((span) => {
        return span.session_id === sessionId;
      });
      res.json(spans);
    })
    .catch((err) => console.log(err));

  // // MongoDB
  // Span.find({ session_id: req.params.id })
  // 	.then((spans) => {
  // 		res.json(spans);
  // 	})
  // 	.catch(next);
});

// get events by session id
router.get('/events/:id', (req, res, next) => {
  const sessionId = req.params.id;

  axios
    .get('http://api.xadi.io/events')
    .then((response) => response.data)
    .then((events) => {
      events = events.map((event) => {
        event.data = JSON.parse(event.data);
        return event;
      });
      events = events.filter((event) => {
        return event.session_id === sessionId;
      });
      res.json(events);
    })
    .catch((err) => console.log(err));

  // // MongoDB
  // Event.find({ session_id: req.params.id })
  //   .then((events) => {
  //     res.json(events);
  //   })
  //   .catch(next);
});

// get spans by trigger id
router.get('/trigger/:id', (req, res, next) => {
  const triggerRoute = req.params.id;

  axios
    .get('http://api.xadi.io/spans')
    .then((response) => response.data)
    .then((spans) => {
      spans = spans.filter((span) => span.trigger_route === triggerRoute);
      spans = spans.map((span) => {
        span.data = JSON.parse(span.data);
        return span;
      });
      res.json(spans);
    })
    .catch((err) => console.log(err));

  // // MongoDb
  // Span.find({ trigger_route: req.params.id })
  //   .then((spans) => {
  //     res.json(spans);
  //   })
  //   .catch(next);
});

router.get('/span_search', (req, res, next) => {
  let search = {
    trace_id: req.query.trace_id || "",
    user_id: req.query.user_id || "",
    session_id: req.query.session_id || "",
    chapter_id: req.query.chapter_id || "",
    status_code: req.query.status_code || "",
  };

  let queryString = [];
		Object.entries(search).forEach((keyVal, _) => {
			queryString.push(`${keyVal[0]}=${keyVal[1]}`)
		})
	let queryStringConcat = queryString.join("&")

  axios
    .get(`http://api.xadi.io/span_search?${queryStringConcat}`)
    .then((response) => response.data)
    .then((spans) => {
      spans = spans.map((span) => {
        span.data = JSON.parse(span.data);
        return span;
      });
      res.json(spans);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
