import React from 'react'

const EventMouseInteraction = ({ setValue }) => {
  return (
    <div class="form-group">
      <label for="exampleSelect1" class="form-label mt-4">Incremental Snapshot Type:</label>
      <select class="form-select" id="exampleSelect1" onChange={(e) => {setValue(e.target.value)}}>
        <option default value="10">Show All</option>
        <option value="0">Mouse Up</option>
        <option value="1">Mouse Down</option>
        <option value="2">Click</option>
        <option value="3">Context Menu</option>
        <option value="4">Double Click</option>
        <option value="5">Focus</option>
        <option value="6">Blur</option>
        <option value="7">Touch Start</option>
        <option value="8">Touch Move Departed</option>
        <option value="9">Touch End</option>
      </select>
    </div>
  )
}

export default EventMouseInteraction
