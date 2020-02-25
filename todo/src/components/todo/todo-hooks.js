import React from 'react';
import uuid from 'uuid/v4';
import { When } from '../if';
import Modal from '../modal/modal.js';
import Details from '../parts/details.js';
import List from '../parts/list.js';
import Form from '../parts/form.js';
import './todo.scss';

import { useState } from 'react';

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

  const addItem = (e) => {
    e.preventDefault();
    e.target.reset();
    const defaults = { _id: uuid(), complete: false };
    const newItem = Object.assign({}, item, defaults);
    let currentList = todoList;
    currentList.push(newItem)
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
