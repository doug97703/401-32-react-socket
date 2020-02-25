import React from 'react';

// State Only
import ToDo from './components/todo/todo-hooks';

// API Connected (Live Data)

export default class App extends React.Component {
  render() {
    return (
      <>
        <ToDo />
      </>
    );
  }
}
