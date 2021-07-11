import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import SpanSearchBar from './SpanSearchBar';

const TopNav = () => {
  const [searchId, setSearchId] = useState("");
  const history = useHistory();

  const handleSpanSearchClick = (e) => {
    history.push("/span");
    e.preventDefault();
  }

  const onSessionSearchSubmit = (e) => {
    history.push(`/session/${searchId}`);
    e.preventDefault();
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Demo App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" href="/spans">All Spans</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/events">All Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/trigger_routes">Trigger Routes</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Potential</a>
                <a class="dropdown-item" href="#">Tings</a>
                <a class="dropdown-item" href="#">Here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">c:</a>
              </div>
            </li>
          </ul>
          <a href='#' onClick={handleSpanSearchClick} class="btn btn-secondary my-2 my-sm-0" role="button">Search Spans</a>
          <form class="d-flex" onSubmit={onSessionSearchSubmit}>
            <input class="form-control me-sm-2" type="text" placeholder="Search with session ID" onChange={(e) => {
								setSearchId(e.target.value);
							}}/>
            {/* <a href={`/session/${searchId}`} class="btn btn-secondary my-2 my-sm-0" role="button">Search</a> */}
            <button type="submit" class="btn btn-secondary my-2 my-sm-0" role="button">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default TopNav;
