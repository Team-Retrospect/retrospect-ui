import React, { useState } from 'react'

const SpanFilterForm = ({ values, setFunctions }) => {
  return (
    <div>
      <h4>Filter by Request Data</h4>
      <form>
        <fieldset>
          <div class="form-group row">
            <label for="requestData" class="col-sm-2 col-form-label">
              <strong>Request Data Contains</strong>
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
        </fieldset>
      </form>
    </div>
  )
}

export default SpanFilterForm