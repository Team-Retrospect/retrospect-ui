import timeParser from "./timeParser";
import EventParser from "./EventParser";

const eventGridProperties = (event) => {
  const { data } = event;
  const { source, ...dataData } = data.data;
  const details = EventParser(event.data);
  let eventSource = '';
  let eventSubtype = '';
  if (details.data) {
    eventSource = details.data.source;
    eventSubtype = details.data.type;
  }
  return {
    id: details.timestamp,
    date_created: timeParser(event.timestamp),
    event_type: details.type,
    event_source: eventSource,
    event_subtype: eventSubtype,
    data: JSON.stringify(dataData),
  };
};

export default eventGridProperties;