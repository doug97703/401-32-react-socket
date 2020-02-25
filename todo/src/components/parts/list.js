import React from 'react'
import useFetch from '../hooks/api';

export default props => {
  console.log('LIST---------------')
  console.log(props.todoList)
  const [pull, push, update, deleteToDo] = useFetch();

  return (
    <div>
      <ul>
        {props.todoList.map(item => (
          <li className={`complete-${item.complete.toString()}`} key={item._id}>
            <span onClick={() => props.toggleComplete(item._id)}>{item.text}</span>
            <button onClick={() => props.toggleDetails(item._id)}>Details</button>
            <button onClick={() => deleteToDo(item._id, props.setItem)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
