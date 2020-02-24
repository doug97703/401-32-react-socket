import { useState } from 'react';

const useForm = (callback) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback(values);
  };

  const handleInput = {
    onChange: (event) => {
      event.persist();
      setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    }
  }

  return [
    handleSubmit,
    handleInput,
    values,
  ];
};

export default useForm;
