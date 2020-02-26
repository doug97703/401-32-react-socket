import uuid from 'uuid/v4';
import { useState, useEffect } from 'react';

const useFetch = (callback) => {

  const [query, setQuery] = useState({})

  const pull = async (url) => {
    const raw = await fetch(url)
    const response = await raw.json()
    return response.results
  }

  const push = async (url, next) => {
    const current = query;
    current._id = uuid()
    current.complete = false
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(current),
      headers: {
        "Content-Type": "application/json"
      },
    })
    next()
  }

  const update = async (url, body, next) => {
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
    })
    next()
  }

  const deleteToDo = async (url, next) => {
    await fetch(url, {
      method: "DELETE",
    })
    next()
  }

  const updateQuery = e => {
    e.preventDefault()
    let current = query;
    current[e.target.name] = e.target.value
    setQuery(current);
  }

  return [
    pull,
    push,
    update,
    deleteToDo,
    updateQuery,
  ];

};

export default useFetch;