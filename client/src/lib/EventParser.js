const EventParser = (event) => {
  const details = { timestamp: event.timestamp };

  switch (event.type) {
    case 0:
      details.type = 'DOM Content Loaded';
      break;
    case 1:
      details.type = 'Load';
      break;
    case 2:
      details.type = 'Full Snapshot';
      details.data = event.data;
      break;
    case 3:
      details.type = 'Incremental Snapshot';
      details.data = handleIncrementalSnapshot(event.data);
      break;
    case 4:
      details.type = 'Meta';
      details.data = event.data;
      break;
    case 5:
      details.type = 'Custom'; // Haven't seen
      details.data = event;
      break;
    default:
      break;
  }

  return details;
};

const handleIncrementalSnapshot = (data) => {
  const newObj = {};

  switch (data.source) {
    case 0:
      newObj.source = 'Mutation';
      newObj.texts = data.texts;
      newObj.attributes = data.attributes;
      newObj.removes = data.removes;
      newObj.adds = data.adds;
      break;
    case 1:
      newObj.source = 'Mouse Move';
      newObj.positions = data.positions;
      break;
    case 2:
      newObj.source = 'Mouse Interaction';
      handleMouseInteraction(newObj, data);
      newObj.id = data.id;
      break;
    case 3:
      newObj.source = 'Scroll'; // Haven't seen
      newObj.data = data;
      break;
    case 4:
      newObj.source = 'Viewport Resize';
      newObj.width = data.width;
      newObj.height = data.height;
      break;
    case 5:
      newObj.source = 'Input';
      newObj.text = data.text;
      newObj.id = data.id;
      handleInput(newObj, data);
      break;
    case 6:
      newObj.source = 'Touch Move'; // Haven't seen
      newObj.data = data;
      break;
    case 7:
      newObj.source = 'Media Interaction'; // Haven't seen
      newObj.data = data;
      break;
    case 8:
      newObj.source = 'Style Sheet Rule'; // Haven't seen
      newObj.data = data;
      break;
    case 9:
      newObj.source = 'Canvas Mutation'; // Haven't seen
      newObj.data = data;
      break;
    case 10:
      newObj.source = 'Font'; // Haven't seen
      newObj.data = data;
      break;
    case 11:
      newObj.source = 'Log';
      newObj.level = data.level;
      newObj.payload = data.payload;
      newObj.trace = data.trace;
      break;
    case 12:
      newObj.source = 'Drag'; // Haven't seen
      newObj.data = data;
      break;
    default:
      break;
  }

  return newObj;
};

const handleMouseInteraction = (obj, data) => {
  switch (data.type) {
    case 0:
      obj.type = 'Mouse Up';
      obj.x = data.x;
      obj.y = data.y;
      break;
    case 1:
      obj.type = 'Mouse Down';
      obj.x = data.x;
      obj.y = data.y;
      break;
    case 2:
      obj.type = 'Click';
      obj.x = data.x;
      obj.y = data.y;
      break;
    case 3:
      obj.type = 'Context Menu'; // Haven't seen
      break;
    case 4:
      obj.type = 'Double Click';
      obj.x = data.x;
      obj.y = data.y;
      break;
    case 5:
      obj.type = 'Focus';
      break;
    case 6:
      obj.type = 'Blur';
      break;
    case 7:
      obj.type = 'Touch Start'; // Haven't seen
      break;
    case 8:
      obj.type = 'Touch Move Departed'; // Haven't seen
      break;
    case 9:
      obj.type = 'Touch End'; // Haven't seen
      break;
    default:
      break;
  }
};

const handleInput = (obj, data) => {
  const keyValIdx = Object.entries(data);
  const toOmit = ['source', 'text', 'id'];

  keyValIdx.forEach((keyVal, _) => {
    const [key, value] = keyVal;
    if (!toOmit.includes(key)) {
      obj[`${key}`] = value;
    }
  });
};

export default EventParser;
