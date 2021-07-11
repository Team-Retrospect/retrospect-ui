import React from 'react';
import { useHistory } from 'react-router-dom';

const SpanSearchBar = ({ searchQuery, setSearchQuery }) => {
  const history = useHistory();

  const onSubmit = (e) => {
    history.push(`?s=${searchQuery}`);
    e.preventDefault();
  }

  return (
    <form className="d-flex" action="/span" method="get" autoComplete="off" onSubmit={onSubmit}>
      <label htmlFor="header-search">
        <span className="visually-hidden">Search spans</span>
      </label>
      <input
        className="form-control me-sm-2"
        type="text"
        id="header-search"
        placeholder="Search spans"
        name="s"
        value={searchQuery}
        onInput={(e) => {setSearchQuery(e.target.value)}}
      />
      <button type="submit" className="btn btn-secondary my-2 my-sm-0">Search</button>
    </form>
  )
}

export default SpanSearchBar;