import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Chapter from '../Chapter';

const Chapters = () => {
  const [ids, setIds] = useState([])
	const params = useParams();
  const url = window.location.href.split("/")[3];
	const trigger = decodeURIComponent(params.id);

  useEffect(() => {
    const uniqueIds = (ids) => {
      const idObj = ids.reduce((acc, val) => {
        acc[val] = true;
        return acc;
      }, {})

      return Object.keys(idObj);
    }
    if (url === "trigger_route") {
      axios.post(`/api/chapter_ids_by_trigger/`, { trigger })
        .then(response => response.data)
        .then(chapterIds => {
          setIds(uniqueIds(chapterIds))
        })
    } else if (url === "session") {
      axios.get(`/api/chapter_ids_by_session/${params.id}`) 
        .then(response => response.data)
        .then(chapterIds => {
          setIds(uniqueIds(chapterIds))
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