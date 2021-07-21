import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import EventParser from '../lib/EventParser';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import ChapterBarChart from './ChapterBarChart';
import SpanDetailsCard from './SpanDetailsCard';

import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import Player from './Player';
const rrweb = require('rrweb');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  datagrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 700,
  },
  title: {
    fontSize: 14,
  },
}));

const Session = () => {
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [snapshotEvents, setSnapshotEvents] = useState([]);
  const [replayableEvents, setReplayableEvents] = useState([]);
  const [gridableSnapshotEvents, setGridableSnapshotEvents] = useState([]);
  const [gridableEvents, setGridableEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [spans, setSpans] = useState([]);
  const [gridableSpans, setGridableSpans] = useState([]);
  const [clickedSpan, setClickedSpan] = useState(null);
  const [traceId, setTraceId] = useState('');
  const [eventLoading, setEventLoading] = useState(false);
  const [spanLoading, setSpanLoading] = useState(false);
  const [snapshotEventLoading, setSnapshotEventLoading] = useState(false);
  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    setSpanLoading(true);
    setEventLoading(true);
    setSnapshotEventLoading(true);
    const sessionId = params.id;

    const eventGridProperties = (event) => {
      const details = EventParser(event.data);
      let eventSource = '';
      let eventSubtype = '';
      let detailsData = {};
      if (details.data) {
        eventSource = details.data.source;
        eventSubtype = details.data.type;
        const { source, type, ...data } = details.data;
        detailsData = data;
      }
      return {
        id: details.timestamp,
        event_type: details.type,
        event_source: eventSource,
        event_subtype: eventSubtype,
        data: JSON.stringify(detailsData),
      };
    };

    const snapshotEventGridProperties = (event) => {
      return {
        id: event.data.timestamp,
        event_type: 'Full DOM Snapshot',
        data: JSON.stringify(event.data),
      };
    };

    const spanGridProperties = (span) => {
      const selectedSpan = {
        id: span.span_id,
        service_name: span.data['service.name'],
        span_type: span.data['db.system'] ? span.data['db.system'] : 'http',
        request_data: span.request_data,
        status_code: span.status_code ? span.status_code : null,
        trigger_route: span.trigger_route,
      };
      return selectedSpan;
    };

    axios.get(`/api/events`).then((response) => {
      const filteredEvents = response.data.filter(
        (event) => event.session_id === sessionId
      );

      axios.get('https://api.xadi.io/events/snapshots').then((response) => {
        const snapshots = response.data.map((encoded) => {
          encoded.data = JSON.parse(atob(encoded.data));
          return encoded;
          // atob(encoded)
        });
        const filteredSnapshots = snapshots.filter(
          (snapshot) => snapshot.session_id === sessionId
        );
        // let filteredSnapshotData = filteredSnapshots.map((event) => event.data);
        // console.log('filtered snapshot data', filteredSnapshotData);
        // setReplayableEvents(filteredSnapshotData);
        // console.log('filtered snapshot data', filteredSnapshotData);
        let replayableFilteredEvents = filteredEvents.map(
          (event) => event.data
        );
        let replayableFilteredSnapshots = filteredSnapshots.map(
          (event) => event.data
        );
        let womboCombo = [
          ...replayableFilteredEvents,
          ...replayableFilteredSnapshots,
        ];
        console.log('combination of events and snapshots', womboCombo);
        setReplayableEvents(womboCombo);

        setSnapshotEvents(filteredSnapshots);
        setGridableSnapshotEvents(
          filteredSnapshots.map(snapshotEventGridProperties).sort((a, b) => {
            return a.timestamp - b.timestamp;
          })
        );
        setSnapshotEventLoading(false);
      });
      setEvents(filteredEvents);
      setGridableEvents(filteredEvents.map(eventGridProperties));
      setEventLoading(false);
    });

    axios.get(`/api/spans`).then((response) => {
      const filteredSpans = response.data.filter(
        (span) => span.session_id === sessionId
      );
      setSpans(filteredSpans);
      setGridableSpans(filteredSpans.map(spanGridProperties));
      setSpanLoading(false);
    });

    axios.get('https://api.xadi.io/events/snapshots').then((response) => {
      const snapshots = response.data.map((encoded) => {
        encoded.data = JSON.parse(atob(encoded.data));
        return encoded;
        // atob(encoded)
      });
      const filteredSnapshots = snapshots.filter(
        (snapshot) => snapshot.session_id === sessionId
      );
      // let filteredSnapshotData = filteredSnapshots.map((event) => event.data);
      // console.log('filtered snapshot data', filteredSnapshotData);
      // setReplayableEvents(filteredSnapshotData);
      // console.log('filtered snapshot data', filteredSnapshotData);
      setReplayableEvents(
        replayableEvents.concat(
          filteredSnapshots.map((event) => {
            return event.data;
          })
        )
      );
      setSnapshotEvents(filteredSnapshots);
      setGridableSnapshotEvents(
        filteredSnapshots.map(snapshotEventGridProperties).sort((a, b) => {
          return a.timestamp - b.timestamp;
        })
      );
      setSnapshotEventLoading(false);
    });
  }, []);

  const eventColumns = [
    { field: 'id', headerName: 'Timestamp', width: 150 },
    { field: 'event_type', headerName: 'Type', width: 170 },
    { field: 'event_source', headerName: 'Source', width: 175 },
    { field: 'event_subtype', headerName: 'Mouse Type', width: 170 },
    { field: 'data', headerName: 'Data', width: 400 },
  ];

  const snapshotEventColumns = [
    { field: 'id', headerName: 'Timestamp', width: 150 },
    { field: 'event_type', headerName: 'Type', width: 170 },
    { field: 'data', headerName: 'Data', width: 800 },
  ];

  const spanColumns = [
    { field: 'id', headerName: 'Span Id', width: 200 },
    { field: 'service_name', headerName: 'Service Name', width: 200 },
    { field: 'span_type', headerName: 'Span Type', width: 200 },
    { field: 'request_data', headerName: 'Request Data', width: 200 },
    { field: 'status_code', headerName: 'Status Code', width: 175 },
    { field: 'trigger_route', headerName: 'Trigger Route', width: 300 },
  ];

  if (replayableEvents.length < 2) {
    return null;
  }

  let snapshotTestObj = {
    type: 2,
    data: {
      node: {
        type: 0,
        childNodes: [
          { type: 1, name: 'html', publicId: '', systemId: '', id: 2 },
          {
            type: 2,
            tagName: 'html',
            attributes: { lang: 'en' },
            childNodes: [
              {
                type: 2,
                tagName: 'head',
                attributes: {},
                childNodes: [
                  { type: 3, textContent: '\n    ', id: 5 },
                  {
                    type: 2,
                    tagName: 'meta',
                    attributes: { charset: 'utf-8' },
                    childNodes: [],
                    id: 6,
                  },
                  { type: 3, textContent: '\n    ', id: 7 },
                  {
                    type: 2,
                    tagName: 'link',
                    attributes: {
                      rel: 'icon',
                      href: 'http://localhost:8080/favicon.ico',
                    },
                    childNodes: [],
                    id: 8,
                  },
                  { type: 3, textContent: '\n    ', id: 9 },
                  {
                    type: 2,
                    tagName: 'meta',
                    attributes: {
                      name: 'viewport',
                      content: 'width=device-width, initial-scale=1',
                    },
                    childNodes: [],
                    id: 10,
                  },
                  { type: 3, textContent: '\n    ', id: 11 },
                  {
                    type: 2,
                    tagName: 'meta',
                    attributes: { name: 'theme-color', content: '#000000' },
                    childNodes: [],
                    id: 12,
                  },
                  { type: 3, textContent: '\n    ', id: 13 },
                  {
                    type: 2,
                    tagName: 'meta',
                    attributes: {
                      name: 'description',
                      content: 'Web site created using create-react-app',
                    },
                    childNodes: [],
                    id: 14,
                  },
                  { type: 3, textContent: '\n    ', id: 15 },
                  {
                    type: 2,
                    tagName: 'title',
                    attributes: {},
                    childNodes: [{ type: 3, textContent: "Bob's App", id: 17 }],
                    id: 16,
                  },
                  { type: 3, textContent: '\n  ', id: 18 },
                  {
                    type: 2,
                    tagName: 'style',
                    attributes: {},
                    childNodes: [
                      {
                        type: 3,
                        textContent:
                          "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcmMvaW5kZXguY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsU0FBUztFQUNUOztjQUVZO0VBQ1osbUNBQW1DO0VBQ25DLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFO2FBQ1c7QUFDYiIsInNvdXJjZXNDb250ZW50IjpbImJvZHkge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsICdSb2JvdG8nLCAnT3h5Z2VuJyxcbiAgICAnVWJ1bnR1JywgJ0NhbnRhcmVsbCcsICdGaXJhIFNhbnMnLCAnRHJvaWQgU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsXG4gICAgc2Fucy1zZXJpZjtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG59XG5cbmNvZGUge1xuICBmb250LWZhbWlseTogc291cmNlLWNvZGUtcHJvLCBNZW5sbywgTW9uYWNvLCBDb25zb2xhcywgJ0NvdXJpZXIgTmV3JyxcbiAgICBtb25vc3BhY2U7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */",
                        isStyle: true,
                        id: 20,
                      },
                    ],
                    id: 19,
                  },
                  {
                    type: 2,
                    tagName: 'style',
                    attributes: {},
                    childNodes: [
                      {
                        type: 3,
                        textContent:
                          '.App {\n  text-align: center;\n}\n\n.App-logo {\n  height: 40vmin;\n  pointer-events: none;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  .App-logo {\n    animation: App-logo-spin infinite 20s linear;\n  }\n}\n\n.App-header {\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n}\n\n.App-link {\n  color: #61dafb;\n}\n\n@keyframes App-logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcmMvQXBwLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRTtJQUNFLDRDQUE0QztFQUM5QztBQUNGOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsNkJBQTZCO0VBQzdCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRTtJQUNFLHVCQUF1QjtFQUN6QjtFQUNBO0lBQ0UseUJBQXlCO0VBQzNCO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuQXBwIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uQXBwLWxvZ28ge1xuICBoZWlnaHQ6IDQwdm1pbjtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogbm8tcHJlZmVyZW5jZSkge1xuICAuQXBwLWxvZ28ge1xuICAgIGFuaW1hdGlvbjogQXBwLWxvZ28tc3BpbiBpbmZpbml0ZSAyMHMgbGluZWFyO1xuICB9XG59XG5cbi5BcHAtaGVhZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4MmMzNDtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IGNhbGMoMTBweCArIDJ2bWluKTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uQXBwLWxpbmsge1xuICBjb2xvcjogIzYxZGFmYjtcbn1cblxuQGtleWZyYW1lcyBBcHAtbG9nby1zcGluIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */',
                        isStyle: true,
                        id: 22,
                      },
                    ],
                    id: 21,
                  },
                ],
                id: 4,
              },
              { type: 3, textContent: '\n  ', id: 23 },
              {
                type: 2,
                tagName: 'body',
                attributes: {},
                childNodes: [
                  { type: 3, textContent: '\n    ', id: 25 },
                  {
                    type: 2,
                    tagName: 'noscript',
                    attributes: {},
                    childNodes: [
                      {
                        type: 3,
                        textContent:
                          'You need to enable JavaScript to run this app.',
                        id: 27,
                      },
                    ],
                    id: 26,
                  },
                  { type: 3, textContent: '\n    ', id: 28 },
                  {
                    type: 2,
                    tagName: 'div',
                    attributes: { id: 'root' },
                    childNodes: [
                      {
                        type: 2,
                        tagName: 'span',
                        attributes: { id: 'username', style: 'float: right;' },
                        childNodes: [
                          { type: 3, textContent: 'username: ', id: 59 },
                          { type: 3, textContent: '"Earl"', id: 58 },
                        ],
                        id: 57,
                      },
                      {
                        type: 2,
                        tagName: 'h1',
                        attributes: {},
                        childNodes: [
                          { type: 3, textContent: "Bob's Movie App", id: 60 },
                        ],
                        id: 56,
                      },
                      {
                        type: 2,
                        tagName: 'form',
                        attributes: { method: 'POST', action: '/' },
                        childNodes: [
                          {
                            type: 2,
                            tagName: 'h2',
                            attributes: {},
                            childNodes: [
                              { type: 3, textContent: 'Checkout', id: 64 },
                            ],
                            id: 63,
                          },
                          {
                            type: 2,
                            tagName: 'div',
                            attributes: { class: 'form-group' },
                            childNodes: [
                              {
                                type: 2,
                                tagName: 'label',
                                attributes: {},
                                childNodes: [
                                  { type: 3, textContent: 'User', id: 67 },
                                ],
                                id: 66,
                              },
                              {
                                type: 2,
                                tagName: 'input',
                                attributes: {
                                  type: 'text',
                                  name: 'checkoutUserName',
                                  class: 'form-control',
                                  placeholder: 'username',
                                  value: 'Early',
                                },
                                childNodes: [],
                                id: 65,
                              },
                            ],
                            id: 62,
                          },
                          {
                            type: 2,
                            tagName: 'input',
                            attributes: {
                              type: 'submit',
                              class: 'btn btn-primary float-start',
                              value: 'Checkout',
                            },
                            childNodes: [],
                            id: 61,
                          },
                        ],
                        id: 55,
                      },
                      {
                        type: 2,
                        tagName: 'div',
                        attributes: { class: 'App' },
                        childNodes: [
                          {
                            type: 2,
                            tagName: 'h1',
                            attributes: {},
                            childNodes: [
                              { type: 3, textContent: 'Hello', id: 71 },
                            ],
                            id: 70,
                          },
                          {
                            type: 2,
                            tagName: 'button',
                            attributes: { id: 'button' },
                            childNodes: [
                              { type: 3, textContent: 'Show Cart', id: 72 },
                            ],
                            id: 69,
                          },
                          {
                            type: 2,
                            tagName: 'h2',
                            attributes: {},
                            childNodes: [
                              { type: 3, textContent: 'Rango', id: 92 },
                              { type: 3, textContent: ' ', id: 91 },
                              { type: 3, textContent: '2017', id: 90 },
                            ],
                            id: 89,
                          },
                          {
                            type: 2,
                            tagName: 'h2',
                            attributes: {},
                            childNodes: [
                              { type: 3, textContent: 'Insufferable', id: 94 },
                              { type: 3, textContent: ' ', id: 93 },
                              { type: 3, textContent: '2020', id: 88 },
                            ],
                            id: 87,
                          },
                          {
                            type: 2,
                            tagName: 'h2',
                            attributes: {},
                            childNodes: [
                              {
                                type: 3,
                                textContent: 'The Life of Pi',
                                id: 98,
                              },
                              { type: 3, textContent: ' ', id: 97 },
                              { type: 3, textContent: '2013', id: 96 },
                            ],
                            id: 95,
                          },
                          {
                            type: 2,
                            tagName: 'br',
                            attributes: {},
                            childNodes: [],
                            id: 68,
                          },
                          {
                            type: 2,
                            tagName: 'form',
                            attributes: { method: 'POST', action: '/' },
                            childNodes: [
                              {
                                type: 2,
                                tagName: 'h2',
                                attributes: {},
                                childNodes: [
                                  {
                                    type: 3,
                                    textContent: 'Add a movie:',
                                    id: 77,
                                  },
                                ],
                                id: 76,
                              },
                              {
                                type: 2,
                                tagName: 'div',
                                attributes: { class: 'form-group' },
                                childNodes: [
                                  {
                                    type: 2,
                                    tagName: 'label',
                                    attributes: {},
                                    childNodes: [
                                      { type: 3, textContent: 'Title', id: 80 },
                                    ],
                                    id: 79,
                                  },
                                  {
                                    type: 2,
                                    tagName: 'input',
                                    attributes: {
                                      type: 'text',
                                      name: 'id',
                                      class: 'form-control',
                                      placeholder: 'Title',
                                      value: '',
                                    },
                                    childNodes: [],
                                    id: 78,
                                  },
                                ],
                                id: 75,
                              },
                              {
                                type: 2,
                                tagName: 'div',
                                attributes: { class: 'form-group' },
                                childNodes: [
                                  {
                                    type: 2,
                                    tagName: 'label',
                                    attributes: {},
                                    childNodes: [
                                      { type: 3, textContent: 'Year', id: 83 },
                                    ],
                                    id: 82,
                                  },
                                  {
                                    type: 2,
                                    tagName: 'input',
                                    attributes: {
                                      type: 'text',
                                      name: 'first_name',
                                      class: 'form-control',
                                      placeholder: 'Year',
                                      value: '',
                                    },
                                    childNodes: [],
                                    id: 81,
                                  },
                                ],
                                id: 74,
                              },
                              {
                                type: 2,
                                tagName: 'div',
                                attributes: { class: 'form-group' },
                                childNodes: [
                                  {
                                    type: 2,
                                    tagName: 'label',
                                    attributes: {},
                                    childNodes: [
                                      {
                                        type: 3,
                                        textContent: 'Save to DB',
                                        id: 86,
                                      },
                                    ],
                                    id: 85,
                                  },
                                  {
                                    type: 2,
                                    tagName: 'input',
                                    attributes: {
                                      type: 'checkbox',
                                      name: 'saveToDB',
                                      class: 'form-control',
                                    },
                                    childNodes: [],
                                    id: 84,
                                  },
                                ],
                                id: 73,
                              },
                              {
                                type: 2,
                                tagName: 'input',
                                attributes: {
                                  type: 'submit',
                                  class: 'btn btn-primary float-start',
                                  value: 'Save',
                                },
                                childNodes: [],
                                id: 54,
                              },
                            ],
                            id: 53,
                          },
                        ],
                        id: 52,
                      },
                    ],
                    id: 29,
                  },
                  { type: 3, textContent: '\n    ', id: 45 },
                  {
                    type: 5,
                    textContent:
                      '\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    ',
                    id: 46,
                  },
                  { type: 3, textContent: '\n  ', id: 47 },
                  {
                    type: 2,
                    tagName: 'script',
                    attributes: {
                      src: 'http://localhost:8080/static/js/bundle.js',
                    },
                    childNodes: [],
                    id: 48,
                  },
                  {
                    type: 2,
                    tagName: 'script',
                    attributes: {
                      src: 'http://localhost:8080/static/js/vendors~main.chunk.js',
                    },
                    childNodes: [],
                    id: 49,
                  },
                  {
                    type: 2,
                    tagName: 'script',
                    attributes: {
                      src: 'http://localhost:8080/static/js/main.chunk.js',
                    },
                    childNodes: [],
                    id: 50,
                  },
                  { type: 3, textContent: '\n\n', id: 51 },
                ],
                id: 24,
              },
            ],
            id: 3,
          },
        ],
        id: 1,
      },
      initialOffset: { left: 0, top: 0 },
    },
    timestamp: 1626897924318,
  };

  let testEvents = [
    snapshotTestObj,
    {
      type: 3,
      data: { source: 2, type: 0, id: 70, x: 725, y: 216 },
      timestamp: 1626886020395,
    },
    {
      type: 3,
      data: { source: 5, text: 'on', isChecked: true, id: 84 },
      timestamp: 1626885723000,
    },
  ];

  // const replayer = new rrweb.Replayer(testEvents);
  console.log('replayable events next to replayer', replayableEvents);
  let replayer = new rrweb.Replayer(replayableEvents);
  // replayer.play();

  // let snapshotTest = replayer.rebuildFullSnapshot(snapshotTestObj, true);

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Session
      </Typography>
      <Player events={replayableEvents} />
      {/* <Grid container spacing={2}>
        <Grid item xs>
          <ChapterBarChart traceId={traceId} spans={spans} show={show} setShow={setShow} setClickedSpan={setClickedSpan} />
        </Grid>
        {show ? (
        	<Grid item xs={4} >
						<SpanDetailsCard span={clickedSpan} setShow={setShow} />
        	</Grid>
        ) : null}
      </Grid>
			<br></br>
			<Divider />
			<br></br> */}
      {/* <Typography variant="h4" gutterBottom>
        Spans
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <DataGrid
            className={classes.datagrid}
            components={{
              Toolbar: GridToolbar,
            }}
            rows={gridableSpans}
            loading={spanLoading}
            columns={spanColumns}
            pageSize={25}
            filterModel={{
              items: [
                {
                  columnField: 'request_data',
                  operatorValue: 'contains',
                  value: '',
                },
              ],
            }}
          />
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <DataGrid
            className={classes.datagrid}
            components={{
              Toolbar: GridToolbar,
            }}
            rows={gridableEvents}
            loading={eventLoading}
            columns={eventColumns}
            pageSize={25}
            filterModel={{
              items: [
                { columnField: 'data', operatorValue: 'contains', value: '' },
              ],
            }}
          />
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom>
        Snapshot Events
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <DataGrid
            className={classes.datagrid}
            components={{
              Toolbar: GridToolbar,
            }}
            rows={gridableSnapshotEvents}
            loading={snapshotEventLoading}
            columns={snapshotEventColumns}
            pageSize={25}
            filterModel={{
              items: [
                { columnField: 'data', operatorValue: 'contains', value: '' },
              ],
            }}
          />
        </Grid>
      </Grid> */}
      {/* <div>{replayer.play()}</div> */}
      {/* <div id="player"></div> */}
      {/* <div>{replayer.pause(3000)}</div>
      <div>{replayer.pause(4000)}</div>
      <div>{replayer.pause(5000)}</div> */}
      {/* <Button onClick={() => replayer.play()}>Play</Button> */}
    </>
  );
};

export default Session;
