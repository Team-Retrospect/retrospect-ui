import React, { useState } from 'react'

const SpanFilterForm = ({ values, setFunctions }) => {
  return (
    <div>
      <h4>Filter Spans by Request Data</h4>
      <form>
        <fieldset>
          <div class="form-group row">
            <label for="requestData" class="col-sm-2 col-form-label">
              <strong>Contains</strong>
            </label>
            <div class="col-sm-10">
              <input 
                class="form-control" 
                id="requestDataInput" 
                onChange={(e) => setFunctions.setRequestData(e.target.value)} 
                value={values.requestData}
              />
            </div>
          </div>
          <br></br>
          {/* <div class="form-group row">
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
          <br></br> */}
        </fieldset>
      </form>
    </div>
  )
}

export default SpanFilterForm