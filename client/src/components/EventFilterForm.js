import React, { useState } from 'react'

const EventFilterForm = ({ values, setFunctions }) => {
  return (
    <div>
      <h4>Filter Events by Data</h4>
      <form>
        <fieldset>
          <div class="form-group row">
            <label for="eventType" class="col-sm-2 col-form-label">
              <strong>Type</strong>
            </label>
            <div class="col-sm-10">
              <input 
                class="form-control" 
                id="eventTypeInput" 
                onChange={(e) => setFunctions.setEventType(e.target.value)} 
                value={values.eventType}
              />
            </div>
          </div>
          <br></br>
          <div class="form-group row">
            <label for="serviceName" class="col-sm-2 col-form-label">
              <strong>Service Name</strong>
            </label>
            <div class="col-sm-10">
              <input 
                class="form-control" 
                id="serviceNameInput" 
                onChange={(e) => setFunctions.setServiceName(e.target.value)} 
                value={values.serviceName}
              />
            </div>
          </div>
          <br></br>
        </fieldset>
      </form>
    </div>
  )
}

export default EventFilterForm
