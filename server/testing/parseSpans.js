const parseBase64ToJSON = (data) => {
  const decodedString = Buffer.from(data, 'base64').toString();
  if (decodedString === 'undefined' || !decodedString) {
    return null;
  }
  const parsedDecodedString = JSON.parse(decodedString);
  return parsedDecodedString;
};

const parseSpans = (spans) => {
  return spans.map((span) => {
    let parsedData = parseBase64ToJSON(span.data);
    parsedData = parsedData
      .replace('"{"', '"{\\"')
      .replace('"}"', '\\"}"')
      .replace('":"', '\\":\\"');
    span.data = JSON.parse(parsedData);
    return span;
  });
};


module.exports = {
  parseSpans
}