import React from 'react'

export default props => {
  
  
  return (
  <div className="todo-details">
    <header>
      <span>Assigned To: {props.details.assignee}</span>
      <span>Due: {props.details.due}</span>
    </header>
    <div className="item">
      {props.details.text}
    </div>
  </div>
  )
}


