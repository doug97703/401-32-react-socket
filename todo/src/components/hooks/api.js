import React, { useEffect } from 'react';
import uuid from 'uuid/v4';

const url = 'http://localhost:3000/api/v1/todo';

const useFetch = (callback) => {

  const pull = async () => {
    const response = await fetch(url)
    return response
  }

  const push = async (item, next) => {
    const defaults = { _id: uuid(), complete: false };
    const newItem = Object.assign({}, item, defaults);
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json"
      },
    })
    next({})
  }

  const update = async (id, body, next) => {
    let route = `${url}/${id}`
    await fetch(route, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
    })
    next({})
  }

  const deleteToDo = async (id, next) => {
    let route = `${url}/${id}`
    await fetch(route, {
      method: "DELETE",
    })
    next({})
  }

  return [
    pull,
    push,
    update,
    deleteToDo,
  ];

};

export default useFetch;