const axios = require('axios');
const { API, fetchData } = require('./fetchData');
const { parseEvents} = require("./parseEvents")
const { parseSpans } = require('./parseSpans')

jest.mock('axios');

const eventData = {
  data: [
    {
        "data": "eyJ0eXBlIjozLCJkYXRhIjp7InNvdXJjZSI6MTEsImxldmVsIjoid2FybiIsInRyYWNlIjpbImljL2pzLzAuY2h1bmsuanM6NDY0MDM6MzQpIiwicHJpbnRXYXJuaW5ncyAoaHR0cDovL2xvY2FsaG9zdDozMDAwL3N0IiwiaWMvanMvMC5jaHVuay5qczo4NTIxOjE5KSIsImhhbmRsZVdhcm5pbmdzIChodHRwOi8vbG9jYWxob3N0OjMwMDAvc3QiLCJpYy9qcy8wLmNodW5rLmpzOjg1MzA6MykiLCJXZWJTb2NrZXQucHVzaC4uL25vZGVfbW9kdWxlcy9yZWFjdC1kZXYtdXRpbHMvd2VicGFja0hvdERldkNsaWVudC5qcy5jb25uZWN0aW9uLm9ubWVzc2FnZSAoaHR0cDovL2xvY2FsaG9zdDozMDAwL3N0IiwiaWMvanMvMC5jaHVuay5qczo4NTk1OjcpIl0sInBheWxvYWQiOlsiXCJUaGVyZSB3ZXJlIG1vcmUgd2FybmluZ3MgaW4gb3RoZXIgZmlsZXMuXFxuWW91IGNhbiBmaW5kIGEgY29tcGxldGUgbG9nIGluIHRoZSB0ZXJtaW5hbC5cIiJdfSwidGltZXN0YW1wIjoxNjI3ODYxNTU0OTA2fQ==",
        "session_id": "81967165-df9d-4d1a-970e-b629b1e783f1",
        "chapter_id": "f9ee7890-b809-473b-bd10-d05a99a7a26c",
        "user_id": "4d3f01e9-3718-4002-9331-85215dbb0e5e"
    }
  ]
};

describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(eventData));
    await expect(fetchData('events')).resolves.toEqual(eventData);
  });
 
  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
 
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    
    await expect(fetchData('events')).rejects.toThrow(errorMessage);

    expect(axios.get).toHaveBeenCalledWith(
      `${API}/events`,
    );
  });
});

describe('parseEvent', () => {
  it("parse blob into json", () => {
    let rawEvent = [
      {
          "data": "eyJ0eXBlIjozLCJkYXRhIjp7InNvdXJjZSI6MTEsImxldmVsIjoid2FybiIsInRyYWNlIjpbImljL2pzLzAuY2h1bmsuanM6NDY0MDM6MzQpIiwicHJpbnRXYXJuaW5ncyAoaHR0cDovL2xvY2FsaG9zdDozMDAwL3N0IiwiaWMvanMvMC5jaHVuay5qczo4NTIxOjE5KSIsImhhbmRsZVdhcm5pbmdzIChodHRwOi8vbG9jYWxob3N0OjMwMDAvc3QiLCJpYy9qcy8wLmNodW5rLmpzOjg1MzA6MykiLCJXZWJTb2NrZXQucHVzaC4uL25vZGVfbW9kdWxlcy9yZWFjdC1kZXYtdXRpbHMvd2VicGFja0hvdERldkNsaWVudC5qcy5jb25uZWN0aW9uLm9ubWVzc2FnZSAoaHR0cDovL2xvY2FsaG9zdDozMDAwL3N0IiwiaWMvanMvMC5jaHVuay5qczo4NTk1OjcpIl0sInBheWxvYWQiOlsiXCJUaGVyZSB3ZXJlIG1vcmUgd2FybmluZ3MgaW4gb3RoZXIgZmlsZXMuXFxuWW91IGNhbiBmaW5kIGEgY29tcGxldGUgbG9nIGluIHRoZSB0ZXJtaW5hbC5cIiJdfSwidGltZXN0YW1wIjoxNjI3ODYxNTU0OTA2fQ==",
          "session_id": "81967165-df9d-4d1a-970e-b629b1e783f1",
          "chapter_id": "f9ee7890-b809-473b-bd10-d05a99a7a26c",
          "user_id": "4d3f01e9-3718-4002-9331-85215dbb0e5e"
      }
    ]

    let parsedEvent = [{"chapter_id": "f9ee7890-b809-473b-bd10-d05a99a7a26c", "data": {"data": {"level": "warn", "payload": ["\"There were more warnings in other files.\\nYou can find a complete log in the terminal.\""], "source": 11, "trace": ["ic/js/0.chunk.js:46403:34)", "printWarnings (http://localhost:3000/st", "ic/js/0.chunk.js:8521:19)", "handleWarnings (http://localhost:3000/st", "ic/js/0.chunk.js:8530:3)", "WebSocket.push../node_modules/react-dev-utils/webpackHotDevClient.js.connection.onmessage (http://localhost:3000/st", "ic/js/0.chunk.js:8595:7)"]}, "timestamp": 1627861554906, "type": 3}, "session_id": "81967165-df9d-4d1a-970e-b629b1e783f1", "user_id": "4d3f01e9-3718-4002-9331-85215dbb0e5e"}];

    let result = parseEvents(rawEvent);
    expect(result).toEqual(parsedEvent);
    expect(result).toHaveLength(1);
  })
});

describe('parseSpan', () => {
  it("parse blob into json", () => {
    let rawSpan = [
      {
        span_id: '2ad8ce2f88065cf2',
        session_id: 'c64634ca-8317-4f63-8a4c-12e3ad730126',
        time_sent: 1627931179563087,
        chapter_id: 'e3b5202d-bfac-4121-bdb1-2165bc0e2a77',
        data: 'IntcInRlbGVtZXRyeS5zZGsudmVyc2lvblwiOiBcIjAuMjEuMFwiLCBcImh0dHAuaG9zdFwiOiBcIjE0My4yNDQuMTg4LjUwOjgwXCIsIFwiaHR0cC5yZXNwb25zZV9jb250ZW50X2xlbmd0aF91bmNvbXByZXNzZWRcIjogXCIzMlwiLCBcIm5ldC50cmFuc3BvcnRcIjogXCJJUC5UQ1BcIiwgXCJvdC5zdGF0dXNfY29kZVwiOiBcIk9LXCIsIFwibmV0LnBlZXIucG9ydFwiOiBcIjgwXCIsIFwiaHR0cC5zdGF0dXNfY29kZVwiOiBcIjIwMFwiLCBcImh0dHAuZmxhdm9yXCI6IFwiMS4xXCIsIFwidGVsZW1ldHJ5LnNkay5uYW1lXCI6IFwib3BlbnRlbGVtZXRyeVwiLCBcImh0dHAubWV0aG9kXCI6IFwiR0VUXCIsIFwibmV0LnBlZXIuaXBcIjogXCIxNDMuMjQ0LjE4OC41MFwiLCBcImh0dHAuc3RhdHVzX3RleHRcIjogXCJPS1wiLCBcInRlbGVtZXRyeS5zZGsubGFuZ3VhZ2VcIjogXCJub2RlanNcIiwgXCJodHRwLnVybFwiOiBcImh0dHA6Ly8xNDMuMjQ0LjE4OC41MC9zaGlwcGluZ19zZXJ2aWNlXCIsIFwiaHR0cC50YXJnZXRcIjogXCIvc2hpcHBpbmdfc2VydmljZVwiLCBcIm5ldC5wZWVyLm5hbWVcIjogXCIxNDMuMjQ0LjE4OC41MFwiLCBcInNlcnZpY2UubmFtZVwiOiBcInNob3BwaW5nLWNhcnQtc2VydmVyXCJ9Ig==',
        request_data: '',
        status_code: 200,
        time_duration: '120ms935us',
        trace_id: '807f2c7e5228edff7531114ef861fbbe',
        trigger_route: 'post /api/cart/checkout',
        user_id: '9da66118-ad2f-456a-a81c-50b63c67c927'
      }
    ];

    let parsedSpan = [{
      chapter_id: "e3b5202d-bfac-4121-bdb1-2165bc0e2a77",
      data: {
        "http.flavor": "1.1",
        "http.host": "143.244.188.50:80",
        "http.method": "GET",
        "http.response_content_length_uncompressed": "32",
        "http.status_code": "200",
        "http.status_text": "OK",
        "http.target": "/shipping_service",
        "http.url": "http://143.244.188.50/shipping_service",
        "net.peer.ip": "143.244.188.50",
        "net.peer.name": "143.244.188.50",
        "net.peer.port": "80",
        "net.transport": "IP.TCP",
        "ot.status_code": "OK",
        "service.name": "shopping-cart-server",
        "telemetry.sdk.language": "nodejs",
        "telemetry.sdk.name": "opentelemetry",
        "telemetry.sdk.version": "0.21.0"
      },
      request_data: "",
      session_id: "c64634ca-8317-4f63-8a4c-12e3ad730126",
      span_id: "2ad8ce2f88065cf2",
      status_code: 200,
      time_duration: "120ms935us",
      time_sent: 1627931179563087,
      trace_id: "807f2c7e5228edff7531114ef861fbbe",
      trigger_route: "post /api/cart/checkout",
      user_id: "9da66118-ad2f-456a-a81c-50b63c67c927"
    }]

    let result = parseSpans(rawSpan);
    expect(result).toEqual(parsedSpan);
    expect(result).toHaveLength(1);
  })
});

