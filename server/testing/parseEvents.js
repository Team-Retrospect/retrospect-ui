const parseBase64ToJSON = (data) => {
  const decodedString = Buffer.from(data, 'base64').toString();
  if (decodedString === 'undefined' || !decodedString) {
    return null;
  }
  const parsedDecodedString = JSON.parse(decodedString);
  return parsedDecodedString;
};

const parseEvents = (events) => {
  return (events = events.map((event) => {
    event.data = parseBase64ToJSON(event.data);
    return event;
  }));
};

module.exports = {
  parseEvents
}