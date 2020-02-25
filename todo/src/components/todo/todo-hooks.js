//Readt imports
import React from 'react';
import uuid from 'uuid/v4';
import { When } from '../if';
import Modal from '../modal/modal.js';
import Details from '../parts/details.js';
import List from '../parts/list.js';
import Form from '../parts/form.js';
import './todo.scss';
import { useState } from 'react';



//API
// import Model from '../../api-server/src/models/todo/todo-model'




const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export default props => {

  const [todoList, setList] = useState([]);
  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});

  const handleInputChange = e => {
    e.preventDefault()
    let current = item;
    current[e.target.name] = e.target.value
    setItem( current );
  };

  const addItem = async (e) => {
    e.preventDefault();
    e.target.reset();
    const defaults = { _id: uuid(), complete: false };
    const newItem = Object.assign({}, item, defaults);
    let currentList = todoList;
    currentList.push(newItem)
    console.log(newItem)
    // Model.create(newItem)
    const response = await fetch('http://localhost:3000/api/v1/todo', {
      method: "POST",
      body: JSON.stringify({ text: 'TESTING', _id: uuid() }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    let data = await response.json();
    console.log(data)
    setItem({});
    setList(currentList);
  };

  const deleteItem = id => {
    setList(todoList.filter(item => item._id !== id));
  };

  const toggleComplete = id => {
    let newItem = todoList.filter(i => i._id === id)[0] || {};
    if (newItem._id) {
      newItem.complete = !newItem.complete;
      setItem(newItem);
    }
  };

  const toggleDetails = id => {
    setShowDetails(!showDetails)
    let details = todoList.filter(item => item._id === id)[0] || {};
    setDetails(details);
  }

    return (
      <>
        <header>
          <h2>
            There are {todoList.filter(item => !item.complete).length} items to complete
          </h2>
        </header>
        <Form addItem={addItem} handleInputChange={handleInputChange} />
        <section className="todo">
          < List deleteItem={deleteItem} toggleDetails={toggleDetails} toggleComplete={toggleComplete} todoList={todoList} />
        </section>
        <When condition={showDetails}>
          <Modal title="To Do Item" close={toggleDetails}>
            <Details details={details} />
          </Modal>
        </When>
      </>
    );
}
