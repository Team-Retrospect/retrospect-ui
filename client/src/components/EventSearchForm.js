import React from 'react'

const EventSearchForm = ({ values, setFunctions }) => {
  return (
    <div>
      <h4>Search by User ID, Session ID, or Chapter ID</h4>
      <form>
        <fieldset>
          <div class="form-group row">
            <label for="userId" class="col-sm-2 col-form-label"><strong>User ID</strong></label>
            <div class="col-sm-10">
              <input class="form-control" id="userIdInput" onChange={(e) => setFunctions.setUserId(e.target.value)} value={values.userId}/>
            </div>
          </div>
          <br></br>
          <div class="form-group row">
            <label for="sessionId" class="col-sm-2 col-form-label"><strong>Session ID</strong></label>
            <div class="col-sm-10">
              <input class="form-control" id="sessionIdInput" onChange={(e) => setFunctions.setSessionId(e.target.value)} value={values.sessionId}/>
            </div>
          </div>
          <br></br>
          <div class="form-group row">
            <label for="chapterId" class="col-sm-2 col-form-label"><strong>Chapter ID</strong></label>
            <div class="col-sm-10">
              <input class="form-control" id="chapterIdInput" onChange={(e) => setFunctions.setChapterId(e.target.value)} value={values.chapterId}/>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default EventSearchForm
