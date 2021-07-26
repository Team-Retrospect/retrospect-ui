import React, { useState, useEffect, useRef } from 'react';
import rrwebPlayer from 'rrweb-player';

const Player = ({ events }) => {
  // don't delete replayer
  const [replayer, setReplayer] = useState(undefined)
  const wrapper = useRef(null);
  useEffect(() => {
    if (events.length > 1) {
      setReplayer(new rrwebPlayer({
        target: wrapper.current,
        data: {
          events: events,
        },
      }));
    }
  }, [events]);

  if (events.length < 2) {
    return <p>Loading...</p>
  }
 
  return <div ref={wrapper} />;
};

export default Player;
