import React from 'react';

// State Only
// import ToDo from './components/todo/todo.js';
import ToDo from './components/todo/todo-hooks';

// API Connected (Live Data)
// import ToDo from './components/todo/todo-connected.js';

export default class App extends React.Component {
  render() {
    return (
      <>
        <ToDo />
      </>
    );
  }
}
