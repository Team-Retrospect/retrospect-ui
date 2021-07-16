import React, { useState } from 'react'
import EventIncrementalSnapshot from './EventIncrementalSnapshot';
/*
TYPES:
0: DOM Content Loaded
1: Load
2: Full Snapshot
3: Incremental Snapshot
  0: Mutation
  1: Mouse Move
  2: Mouse Interaction
    0: Mouse Up
    1: Mouse Down
    2: Click
    3: Context Menu
    4: Double Click
    5: Focus
    6: Blur
    7: Touch Start
    8: Touch Move Departed
    9: Touch End
  3: Scroll
  4: Viewport Resize
  5: Input
  6: Touch Move
  7: Media Interaction
  8: Style Sheet Rule
  9: Canvas Mutation
  10: Font
  11: Log
  12: Drag
4: Meta
5: Custom
*/

const EventFilterForm = ({ eventType, setEventType }) => {
  const [incrementalSnapshot, setIncrementalSnapshot] = useState('');
  return (
    <div>
      <h4>Filter Events by Data</h4>
      <form>
        <fieldset>
          <div class="form-group">
            <label for="exampleSelect1" class="form-label mt-4">Type:</label>
            <select class="form-select" id="exampleSelect1" onChange={(e) => {setEventType(e.target.value)}}>
              <option default value="6">Show All</option>
              <option value="0">DOM Content Loaded</option>
              <option value="1">Load</option>
              <option value="2">Full Snapshot</option>
              <option value="3">Incremental Snapshot</option>
              <option value="4">Meta</option>
              <option value="5">Custom</option>
            </select>
          </div>
          {(eventType === "3") ? (
            <EventIncrementalSnapshot setIncrementalSnapshot={setIncrementalSnapshot}/>
          ) : (
            ''
          )}
          <br></br>
        </fieldset>
      </form>
    </div>
  )
}

export default EventFilterForm
