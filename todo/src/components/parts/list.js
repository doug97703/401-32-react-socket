import React from 'react'

export default props => {
  console.log('LIST---------------')
  console.log(props.todoList)
  return (
    <div>
      <ul>
        {props.todoList.map(item => (
          <li className={`complete-${item.complete.toString()}`} key={item._id}>
            <span onClick={() => props.toggleComplete(item._id)}>{item.text}</span>
            <button onClick={() => props.toggleDetails(item._id)}>Details</button>
            <button onClick={() => props.deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
