const EventParser = (event) => {
  const details = {}
  switch (event.type) {
    case 0:
      details.type = 'DOM Content Loaded';
      break
    case 1:
      details.type = 'Load';
      break
    case 2:
      details.type = 'Full Snapshot';
      break
    case 3:
      details.type = 'Incremental Snapshot';
      break
    case 4:
      details.type = 'Meta';
      break
    case 5:
      details.type = 'Custom';
      break
  }
  return details;
}

export default EventParser
