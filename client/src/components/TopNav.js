import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Demo App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/spans">All Spans</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={handleSpanSearchClick}>Search Spans</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/events">All Events</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/trigger_routes">Trigger Routes</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/">Potential</a>
                <a className="dropdown-item" href="/">Tings</a>
                <a className="dropdown-item" href="/">Here</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/">c:</a>
              </div>
            </li>
          </ul>
          <form className="d-flex" onSubmit={onSessionSearchSubmit}>
            <input className="form-control me-sm-2" type="text" placeholder="Search with session ID" onChange={(e) => {
								setSearchId(e.target.value);
							}}/>
            {/* <a href={`/session/${searchId}`} className="btn btn-secondary my-2 my-sm-0" role="button">Search</a> */}
            <button type="submit" className="btn btn-secondary my-2 my-sm-0">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default TopNav;
