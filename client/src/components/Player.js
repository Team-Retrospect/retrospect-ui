import React, { useState, useEffect, useRef } from 'react';
// import { Replayer } from 'rrweb';
import rrwebPlayer from 'rrweb-player';
// import Button from '@material-ui/core/Button';

const Player = ({ events }) => {
  const [replayer, setReplayer] = useState(undefined)
  const wrapper = useRef(null);
  useEffect(() => {
    if (events.length > 1) {
      setReplayer(new rrwebPlayer({
        target: wrapper.current,
        data: {
          events: events,
          // autoPlay: true,
        },
      }));
    }
  }, [events]);

  if (events.length < 2) {
    return <p>Loading...</p>
  }
 
  return <div ref={wrapper} />;
};

// const Player = ({ events }) => {
//   const [replayer, setReplayer] = useState(undefined);

//   useEffect(() => {
//     if (events.length > 1) {
//       setReplayer(
//         new Replayer(events, {
//           root: document.getElementById('player'),
//           autoplay: true,
//         })
//       );
//     }
//   }, [events]);

//   if (events.length < 2) {
//     return <p>loading...</p>;
//   }

//   return (
//     <>
//       <Button onClick={() => replayer.play()}>Play</Button>
//       <div id="player" />
//     </>
//   );
// };

export default Player;
