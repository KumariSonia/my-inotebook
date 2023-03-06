import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const navigate = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault();
    //Api call
    const url = "http://localhost:8080/api/auth/login"
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credential.email, password: credential.password })
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      //save the auth token and redirect
      localStorage.setItem('token', data.authToken);
      navigate('/')
    }
    else {
      alert("Invalid credentials");
    }

  }

  const onChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value })
  }

  return (
    <Form className='container' onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" value={credential.email} id="email" placeholder="Enter email" onChange={onChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' value={credential.password} id='password' placeholder="Password" onChange={onChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default Login
