import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormInput } from 'shards-react';

const Login = ({ history }) => {
  const [creds, setCreds] = useState({ username: '', password: '' });

  const handleChanges = event => {
    setCreds({ ...creds, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/login', creds)
      .then(res => {
        console.log(res, 'login');
        localStorage.setItem('token', res.data.payload);
        history.push('/bubble-page');
      })
      .catch(err => console.log(err.response));
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <h1>Welcome to the Bubble App!</h1>
      <FormInput
        type="text"
        name="username"
        placeholder="username"
        onChange={handleChanges}
        value={creds.username}
      />
      <FormInput
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChanges}
        value={creds.password}
      />
      <Button type="submit">Log In</Button>
    </Form>
  );
};

export default Login;
