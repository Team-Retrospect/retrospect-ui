import timeParser from "./timeParser";
import eventParser from "./eventParser";

const eventGridProperties = (event) => {
  const { data } = event;
  const { source, ...dataData } = data.data;
  const details = eventParser(event.data);

  let eventSource = '';
  let eventSubtype = '';
  if (details.data) {
    eventSource = details.data.source;
    eventSubtype = details.data.type;
  }
  return {
    id: details.timestamp,
    date_created: timeParser(details.timestamp),
    event_type: details.type,
    event_source: eventSource,
    event_subtype: eventSubtype,
    data: JSON.stringify(dataData),
  };
};

export default eventGridProperties;