import React, { useState } from 'react';
import './App.css';
import Form from './Components/Form';
import formSchema from './validation/formSchema';
import * as yup from 'yup'
import axios from 'axios'



const initialFormValues = {

  username: '',
  password: '',
  email: '',
  checked: false
}

const initialFormErrors = {

  username: '',
  password: '',
  email: '',
  checked: ''
}

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([])


  const handleSubmit = () => {
    axios.post('https://reqres.in/api/users', formValues)
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => console.error(err))
  }

  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))

  }

  const handleChange = (name, value) => {
    validate(name, value)
    setFormValues({ ...formValues, [name]: value })
  }
  return (
    <div className="App">
      <Form values={formValues} change={handleChange} submit={handleSubmit} errors={formErrors} />

      {users.map(user => (
        <div key={user.id}>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ))}

    </div>
  );
}

export default App;
