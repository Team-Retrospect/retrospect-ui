import React from 'react'
// 0: Mutation
// 1: Mouse Move
// 2: Mouse Interaction
//   0: Mouse Up
//   1: Mouse Down
//   2: Click
//   3: Context Menu
//   4: Double Click
//   5: Focus
//   6: Blur
//   7: Touch Start
//   8: Touch Move Departed
//   9: Touch End
// 3: Scroll
// 4: Viewport Resize
// 5: Input
// 6: Touch Move
// 7: Media Interaction
// 8: Style Sheet Rule
// 9: Canvas Mutation
// 10: Font
// 11: Log
// 12: Drag
const EventIncrementalSnapshot = ({ setValue }) => {
  return (
    <div class="form-group">
      <label for="exampleSelect1" class="form-label mt-4">Incremental Snapshot Type:</label>
      <select class="form-select" id="exampleSelect1" onChange={(e) => {setValue(e.target.value)}}>
        <option default value="13">Show All</option>
        <option value="0">Mutation</option>
        <option value="1">Mouse Move</option>
        <option value="2">Mouse Interaction</option>
        <option value="3">Scroll</option>
        <option value="4">Viewport Resize</option>
        <option value="5">Input</option>
        <option value="6">Touch Move</option>
        <option value="7">Media Interaction</option>
        <option value="8">Style Sheet Rule</option>
        <option value="9">Canvas Mutation</option>
        <option value="10">Font</option>
        <option value="11">Log</option>
        <option value="12">Drag</option>
      </select>
    </div>
  )
}

export default EventIncrementalSnapshot
