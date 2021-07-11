const EventParser = (event) => {
  const details = {};
  console.log('event: ', event)
  switch (event.type) {
    case 0:
      details.type = 'DOM Content Loaded';
      break;
    case 1:
      details.type = 'Load';
      break;
    case 2:
      details.type = 'Full Snapshot';
      break;
    case 3:
      details.type = 'Incremental Snapshot';
      break;
    case 4:
      details.type = 'Meta';
      break;
    case 5:
      details.type = 'Custom';
      break;
  }

  // if (details.type === 'Incremental Snapshot') {
  //   switch (event.data.source) {
  //     case 0:
  //       details.data.source = 'Mutation'
  //       break;
  //     case 1:
  //       details.data.source = 'Mouse Move'
  //       break;
  //     case 2:
  //       details.data.source = 'Mouse Interaction'
  //       break;
  //     case 3:
  //       details.data.source = 'Scroll'
  //       break;
  //     case 4:
  //       details.data.source = 'Viewport Resize'
  //       break;
  //     case 5:
  //       details.data.source = 'Input'
  //       break;
  //     case 6:
  //       details.data.source = 'Touch Move'
  //       break;
  //     case 7:
  //       details.data.source = 'Media Interaction'
  //       break;
  //     case 8:
  //       details.data.source = 'Style Sheet Rule'
  //       break;
  //     case 9:
  //       details.data.source = 'Canvas Mutation'
  //       break;
  //     case 10:
  //       details.data.source = 'Font'
  //       break;
  //     case 11:
  //       details.data.source = 'Log'
  //       break;
  //     case 12:
  //       details.data.source = 'Drag'
  //       break;
  //   }
  // }

  // if (details.source === 'Mouse Interaction') {
  //   switch (event.data.type) {
  //     case 0:
  //       details.data.type = 'Mouse Up';
  //       break;
  //     case 1:
  //       details.data.type = 'Mouse Down';
  //       break;
  //     case 2:
  //       details.data.type = 'Click';
  //       break;
  //     case 3:
  //       details.data.type = 'Context Menu';
  //       break;
  //     case 4:
  //       details.data.type = 'Double Click';
  //       break;
  //     case 5:
  //       details.data.type = 'Focus';
  //       break;
  //     case 6:
  //       details.data.type = 'Blur';
  //       break;
  //     case 7:
  //       details.data.type = 'Touch Start';
  //       break;
  //     case 8:
  //       details.data.type = 'Touch Move Departed';
  //       break;
  //     case 9:
  //       details.data.type = 'Touch End';
  //       break;
  //   }
  // }
  return details;
};

export default EventParser;
