import timeParser from "./timeParser";

const parseBase64ToJSON = (data) => {
  const decodedString = Buffer.from(data, 'base64').toString();
  if (decodedString === 'undefined' || !decodedString) {
    return null;
  }
  const parsedDecodedString = JSON.parse(decodedString);
  return parsedDecodedString;
};

const gridProperties = (span) => {
  const parsedRequestData = parseBase64ToJSON(span.request_data);
  return {
    id: span.span_id,
    date_created: timeParser(span.time_sent / 1000),
    service_name: JSON.stringify(span.data['service.name']),
    span_type: span.data['db.system'] ? span.data['db.system'] : 'http',
    request_data: JSON.stringify(parsedRequestData),
    status_code: span.status_code ? span.status_code : null,
    trigger_route: span.trigger_route,
  };
};

export default gridProperties;