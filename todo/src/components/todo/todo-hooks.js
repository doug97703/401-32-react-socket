//Readt imports
import React, { useEffect } from 'react';
import { When } from '../if';
import Modal from '../modal/modal.js';
import Details from '../parts/details.js';
import List from '../parts/list.js';
import Form from '../parts/form.js';
import './todo.scss';
import { useState } from 'react';
import useFetch from '../hooks/api';

const url = 'https://lit-anchorage-79085.herokuapp.com/api/v1/todo';

export default props => {

  const pullData = () => {
    pull(url)
      .then(results => setList(results))
  }

  const [pull, push, update, deleteToDo, updateQuery] = useFetch();

  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [todoList, setList] = useState([]);



  useEffect(() => {
    pullData();
  }, []);


  const addItem = (e) => {
    e.preventDefault()
    push(url, pullData)
  };

  const toggleComplete = id => {
    let entry = todoList.filter(i => i._id === id)[0] || {};
    entry.complete = entry._id ? !entry.complete : entry.complete
    update(`${url}/${id}`, entry, pullData)
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
            There are {todoList ? todoList.filter(item => !item.complete).length : 0} items to complete
          </h2>
        </header>
        <Form addItem={addItem} update={updateQuery} />
        <section className="todo">
          <When condition={todoList}>
            <List delete={(id) => deleteToDo(`${url}/${id}`, pullData)} toggleDetails={toggleDetails} toggleComplete={toggleComplete} todoList={todoList} />
          </When>
        </section>
        <When condition={showDetails}>
          <Modal title="To Do Item" close={toggleDetails}>
            <Details details={details} />
          </Modal>
        </When>
      </>
    );
}
