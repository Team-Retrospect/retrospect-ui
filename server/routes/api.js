const express = require('express');
const router = express.Router();
const axios = require('axios');

// const url = 'http://localhost:443';
const url = 'https://api.xadi.io';

router.get('/spans', (req, res, next) => {
  axios
    .get(`${url}/spans`)
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

router.get('/events', (req, res, next) => {
  axios
    .get(`${url}/events`)
    .then((response) => response.data)
    .then((events) => {
      events = events.map((event) => {
        event.data = JSON.parse(event.data);
        return event;
      });
      res.json(events);
    })
    .catch((err) => console.log(err));
});

// get all snapshot events
router.get('/snapshots', (req, res, next) => {
  axios
    .get(`${url}/events/snapshots`)
    .then((response) => response.data)
    .then((events) => {
      const snapshots = events.map((encoded) => {
        const decodedString = Buffer.from(encoded.data, 'base64').toString(
          'ascii'
        );
        const decodedJSON = JSON.parse(decodedString);
        encoded.data = decodedJSON;
        return encoded;
      });
      res.json(snapshots);
    })
    .catch((err) => console.log(err));
});

// get snapshot events by session id
router.get('/snapshots_by_session/:id', (req, res, next) => {
  const sessionId = req.params.id;

  axios
    .get(`${url}/events/snapshots_by_session/${sessionId}`)
    .then((response) => response.data)
    .then((events) => {
      const snapshots = events.map((encoded) => {
        const decodedString = Buffer.from(encoded.data, 'base64').toString(
          'ascii'
        );
        const decodedJSON = JSON.parse(decodedString);
        encoded.data = decodedJSON;
        return encoded;
      });
      res.json(snapshots);
    })
    .catch((err) => console.log(err));
});

router.get('/trigger_routes', (req, res, next) => {
  axios
    .get(`${url}/trigger_routes`)
    .then((response) => response.data)
    .then((routes) => {
      let triggerRoutes = {};
      routes.forEach((obj) => {
        let data = JSON.parse(obj.data);
        if (data['http.method'] !== 'OPTIONS') {
          triggerRoutes[obj.trigger_route] = true;
        }
      });
      res.json(Object.keys(triggerRoutes));
    })
    .catch((err) => console.log(err));
});

// get spans by session id
router.get('/session/:id', (req, res, next) => {
  const sessionId = req.params.id;

  axios
    .get(`${url}/spans`)
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
});

// get spans by session id
router.get('/spans_by_session/:id', (req, res, next) => {
  const sessionId = req.params.id;

  axios
    .get(`${url}/spans_by_session/${sessionId}`)
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

// get events by session id
router.get('/events/:id', (req, res, next) => {
  const sessionId = req.params.id;

  axios
    .get(`${url}/events`)
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
});

// get events by chapter id
router.get('/events_by_chapter/:id', (req, res, next) => {
  const chapterId = req.params.id;

  axios
    .get(`${url}/events_by_chapter/${chapterId}`)
    .then((response) => response.data)
    .then((events) => {
      events = events.map((event) => {
        event.data = JSON.parse(event.data);
        return event;
      });
      res.json(events);
    })
    .catch((err) => console.log(err));
});

// get events by session id
router.get('/events_by_session/:id', (req, res, next) => {
  const sessionId = req.params.id;

  axios
    .get(`${url}/events_by_session/${sessionId}`)
    .then((response) => response.data)
    .then((events) => {
      events = events.map((event) => {
        event.data = JSON.parse(event.data);
        return event;
      });
      res.json(events);
    })
    .catch((err) => console.log(err));
});

// get spans by session id
router.get('/spans_by_chapter/:id', (req, res, next) => {
  console.log('check');
  const chapterId = req.params.id;

  axios
    .get(`${url}/spans_by_chapter/${chapterId}`)
    .then((response) => response.data)
    .then((spans) => {
      spans = spans.map((span) => {
        // console.log("span.data: ", span.data)
        span.data = JSON.parse(span.data);
        return span;
      });
      res.json(spans);
    })
    .catch((err) => console.log(err));
});

// get spans by trigger id
router.get('/trigger/:id', (req, res, next) => {
  const triggerRoute = req.params.id;

  axios
    .get(`${url}/spans`)
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
});

router.get('/span_search', (req, res, next) => {
  let search = {
    trace_id: req.query.trace_id || '',
    user_id: req.query.user_id || '',
    session_id: req.query.session_id || '',
    chapter_id: req.query.chapter_id || '',
    status_code: req.query.status_code || '',
  };

  let queryString = [];
  Object.entries(search).forEach((keyVal, _) => {
    queryString.push(`${keyVal[0]}=${keyVal[1]}`);
  });
  let queryStringConcat = queryString.join('&');

  axios
    .get(`${url}/span_search?${queryStringConcat}`)
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

router.get('/event_search', (req, res, next) => {
  let search = {
    user_id: req.query.user_id || '',
    session_id: req.query.session_id || '',
    chapter_id: req.query.chapter_id || '',
  };

  let queryString = [];
  Object.entries(search).forEach((keyVal, _) => {
    queryString.push(`${keyVal[0]}=${keyVal[1]}`);
  });
  let queryStringConcat = queryString.join('&');

  axios
    .get(`${url}/event_search?${queryStringConcat}`)
    .then((response) => response.data)
    .then((events) => {
      events = events.map((event) => {
        event.data = JSON.parse(event.data);
        return event;
      });
      res.json(events);
    })
    .catch((err) => console.log(err));
});

router.post('/chapter_ids_by_trigger', (req, res, next) => {
  const { trigger } = req.body;
  axios
    .post(`${url}/chapter_ids_by_trigger`, trigger)
    .then((response) => response.data)
    .then((chapter_ids) => res.json(chapter_ids))
    .catch((err) => console.log(err));
});

router.get('/chapter_ids_by_session/:id', (req, res, next) => {
  const sessionId = req.params.id;
  axios
    .get(`${url}/chapter_ids_by_session/${sessionId}`)
    .then((response) => response.data)
    .then((chapter_ids) => {
      chapter_ids = chapter_ids.map((data) => data.chapter_id);
      console.log('chapter_ids on server: ', chapter_ids);
      res.json(chapter_ids);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
