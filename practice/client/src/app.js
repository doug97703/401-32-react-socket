import React, {useState, useEffect} from 'react';
import useForm from './hooks/form';
import useSocket from './hooks/socket';

import io from 'socket.io-client';
import Q from '@nmq/q/client';

// Connect outside of the render cycle ...
const queue = new Q('deeds');


const App = (props) => {

  const [formData, setFormData] = useState({});
  const [handleSubmit, handleInput, values] = useForm(setTheForm);
  const [subscribe, publish, connect] = useSocket(setTheForm)

  function setTheForm(data) {
    setFormData(data);
    Q.publish('deeds', 'work', values);
    publish('words', values);
  }

  const [queueMessage, setQueueMessage] = useState({});
  const [socketMessage, setSocketMessage] = useState({});

  useEffect( () => {
    queue.subscribe('work', message => {
      setQueueMessage(message);
    });

    subscribe('incoming', setSocketMessage)

  });


  return (
    <>
      <pre>Form Values: {JSON.stringify(values)}</pre>
      <pre>Queue Values: {JSON.stringify(queueMessage)}</pre>
      <pre>Socket Values: {JSON.stringify(socketMessage)}</pre>
      <form onSubmit={handleSubmit}>
        <input name='firstName' placeholder="First Name" {...handleInput} />
        <input name='lastName' placeholder="Last Name" {...handleInput} />
        <button>Save</button>
      </form>
    </>
  );
};

export default App;

