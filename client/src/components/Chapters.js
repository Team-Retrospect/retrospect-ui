import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Chapter from './Chapter';

const Chapters = () => {
  const [ids, setIds] = useState([])
	const params = useParams();
  const url = window.location.href.split("/")[3];
	const trigger = decodeURIComponent(params.id);

  useEffect(() => {
    if (url === "trigger_route") {
      axios.post(`/api/chapter_ids_by_trigger/`, { trigger })
        .then(response => response.data)
        .then(chapterIds => {
          const uniqIds = chapterIds.reduce((acc, val) => {
            acc[val] = true;
            return acc;
          }, {})
          setIds(ids.concat(Object.keys(uniqIds)))
        })
    }
  }, [params])

  if (!ids) {
    return null;
  }

  return (
    <div>
      <h1>Chapters by {url}</h1>
      <h2>{url}: {trigger}</h2>
      <br></br>
      {ids.map((id) => {
        return <Chapter key={id} id={id} />
      })}
    </div>
  )
}

export default Chapters;