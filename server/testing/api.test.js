const axios = require('axios');
const { API, fetchData } = require('./fetchData');
const { parseEvents} = require("./parseEvents")

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
    let event = [
      {
          "data": "eyJ0eXBlIjozLCJkYXRhIjp7InNvdXJjZSI6MTEsImxldmVsIjoid2FybiIsInRyYWNlIjpbImljL2pzLzAuY2h1bmsuanM6NDY0MDM6MzQpIiwicHJpbnRXYXJuaW5ncyAoaHR0cDovL2xvY2FsaG9zdDozMDAwL3N0IiwiaWMvanMvMC5jaHVuay5qczo4NTIxOjE5KSIsImhhbmRsZVdhcm5pbmdzIChodHRwOi8vbG9jYWxob3N0OjMwMDAvc3QiLCJpYy9qcy8wLmNodW5rLmpzOjg1MzA6MykiLCJXZWJTb2NrZXQucHVzaC4uL25vZGVfbW9kdWxlcy9yZWFjdC1kZXYtdXRpbHMvd2VicGFja0hvdERldkNsaWVudC5qcy5jb25uZWN0aW9uLm9ubWVzc2FnZSAoaHR0cDovL2xvY2FsaG9zdDozMDAwL3N0IiwiaWMvanMvMC5jaHVuay5qczo4NTk1OjcpIl0sInBheWxvYWQiOlsiXCJUaGVyZSB3ZXJlIG1vcmUgd2FybmluZ3MgaW4gb3RoZXIgZmlsZXMuXFxuWW91IGNhbiBmaW5kIGEgY29tcGxldGUgbG9nIGluIHRoZSB0ZXJtaW5hbC5cIiJdfSwidGltZXN0YW1wIjoxNjI3ODYxNTU0OTA2fQ==",
          "session_id": "81967165-df9d-4d1a-970e-b629b1e783f1",
          "chapter_id": "f9ee7890-b809-473b-bd10-d05a99a7a26c",
          "user_id": "4d3f01e9-3718-4002-9331-85215dbb0e5e"
      }
    ]

    let parsedEvent = [{"chapter_id": "f9ee7890-b809-473b-bd10-d05a99a7a26c", "data": {"data": {"level": "warn", "payload": ["\"There were more warnings in other files.\\nYou can find a complete log in the terminal.\""], "source": 11, "trace": ["ic/js/0.chunk.js:46403:34)", "printWarnings (http://localhost:3000/st", "ic/js/0.chunk.js:8521:19)", "handleWarnings (http://localhost:3000/st", "ic/js/0.chunk.js:8530:3)", "WebSocket.push../node_modules/react-dev-utils/webpackHotDevClient.js.connection.onmessage (http://localhost:3000/st", "ic/js/0.chunk.js:8595:7)"]}, "timestamp": 1627861554906, "type": 3}, "session_id": "81967165-df9d-4d1a-970e-b629b1e783f1", "user_id": "4d3f01e9-3718-4002-9331-85215dbb0e5e"}];

    let result = parseEvents(event);
    expect(result).toEqual(parsedEvent);
  })
});

describe('parseSpan', () => {
  it("parse blob into json", () => {
    let span = [
      {
        span_id: 'bdd446820cf427c2',
        session_id: '8eaa7d74-10c5-44c1-b9ca-e2050d43b6c7',
        time_sent: 1627930015803280,
        chapter_id: '450b0423-6816-4706-bc3f-966f0ff76dcd',
        data: 'IntcIm90LnN0YXR1c19jb2RlXCI6IFwiT0tcIiwgXCJuZXQucGVlci5pcFwiOiBcIjE0My4xOTguNzcuNjZcIiwgXCJuZXQucGVlci5wb3J0XCI6IFwiODBcIiwgXCJuZXQudHJhbnNwb3J0XCI6IFwiSVAuVENQXCIsIFwiaHR0cC5zdGF0dXNfdGV4dFwiOiBcIk9LXCIsIFwiaHR0cC5mbGF2b3JcIjogXCIxLjFcIiwgXCJodHRwLnRhcmdldFwiOiBcIi9pbnZlbnRvcnlcIiwgXCJodHRwLmhvc3RcIjogXCIxNDMuMTk4Ljc3LjY2OjgwXCIsIFwiaHR0cC5yZXNwb25zZV9jb250ZW50X2xlbmd0aF91bmNvbXByZXNzZWRcIjogXCIxOFwiLCBcInNlcnZpY2UubmFtZVwiOiBcInNob3BwaW5nLWNhcnQtc2VydmVyXCIsIFwidGVsZW1ldHJ5LnNkay5sYW5ndWFnZVwiOiBcIm5vZGVqc1wiLCBcInRlbGVtZXRyeS5zZGsubmFtZVwiOiBcIm9wZW50ZWxlbWV0cnlcIiwgXCJ0ZWxlbWV0cnkuc2RrLnZlcnNpb25cIjogXCIwLjIxLjBcIiwgXCJodHRwLm1ldGhvZFwiOiBcIkdFVFwiLCBcIm5ldC5wZWVyLm5hbWVcIjogXCIxNDMuMTk4Ljc3LjY2XCIsIFwiaHR0cC5zdGF0dXNfY29kZVwiOiBcIjIwMFwiLCBcImh0dHAudXJsXCI6IFwiaHR0cDovLzE0My4xOTguNzcuNjYvaW52ZW50b3J5XCJ9Ig==',
        request_data: '',
        status_code: 200,
        time_duration: '127ms718us',
        trace_id: 'faa1b420391365265719ad29a0ba1d9d',
        trigger_route: 'post /api/cart/checkout',
        user_id: '9da66118-ad2f-456a-a81c-50b63c67c927'
        },
    ]

  //   let parsedSpan = [
  //     {
  //       chapter_id: "1e6f9168-429c-4e38-b547-a3def5b9c0b4",
  //   data: {
  //     frontendChapter: "1e6f9168-429c-4e38-b547-a3def5b9c0b4",
  //     frontendSession: "ec99a881-2623-45d3-9133-f8e42ac8cae1",
  //     frontendUser: "11a20a0a-f4c2-46f3-a5e7-dbe5cdb0ac23",
  //     http.client_ip: "127.0.0.1",
  //     http.flavor: "1.1",
  //     http.host: "localhost:5000",
  //     http.method: "PUT",
  //     http.request_content_length_uncompressed: "14",
  //     http.route: "/api/products/60c6d08a403cd5001c5563be",
  //     http.status_code: "200",
  //     http.status_text: "OK",
  //     http.target: "/api/products/60c6d08a403cd5001c5563be",
  //     http.url: "http://localhost:5000/api/products/60c6d08a403cd5001c5563be",
  //     http.user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  //     net.host.ip: "::ffff:127.0.0.1",
  //     net.host.name: "localhost",
  //     net.host.port: "5000",
  //     net.peer.ip: "::ffff:127.0.0.1",
  //     net.peer.port: "37248",
  //     net.transport: "IP.TCP",
  //     ot.status_code: "OK",
  //     service.name: "shopping-cart-service",
  //     telemetry.sdk.language: "nodejs",
  //     telemetry.sdk.name: "opentelemetry",
  //     telemetry.sdk.version: "0.21.0",
  //     triggerRoute: "put /api/products/60c6d08a403cd5001c5563be"
  //   },
  //   request_data: "eyJxdWFudGl0eSI6N30=",
  //   session_id: "ec99a881-2623-45d3-9133-f8e42ac8cae1",
  //   span_id: "faad1add78f34f09",
  //   status_code: 200,
  //   time_duration: "85ms326us",
  //   time_sent: 1627997510084481,
  //   trace_id: "d1c27ca7537939f4146a532d8e6ddf92",
  //   trigger_route: "put /api/products/60c6d08a403cd5001c5563be",
  //   user_id: "11a20a0a-f4c2-46f3-a5e7-dbe5cdb0ac23"}
  // ];
  })
});