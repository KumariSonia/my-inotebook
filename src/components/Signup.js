import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [user, setUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate()
  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const url = "http://localhost:8080/api/auth/createuser";
      //Api call
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
      });
      const data = await response.json();
      if (data.success) {
        //save the auth token and redirect
        console.log("data.authToken",data.authToken);
        localStorage.setItem('token', data.authToken);
        navigate('/')
        props.updateShow("successfully registered", "success");
      }
      else {
        //alert("Invalid users");
        props.updateShow(data.error, "danger");
      }
    } catch (error) {
      props.updateShow(error, "danger");
    }

  }

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }


  return (
    <Form className='container my-3' onSubmit={handleSignUp}>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={user.name} id="name" placeholder="Enter name" onChange={onChange} required minLength={3} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" value={user.email} id="email" placeholder="Enter email" onChange={onChange} required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' value={user.password} id='password' placeholder="Password" onChange={onChange} required minLength={5} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" name='confirmPassword' value={user.confirmPassword} id='confirmPassword' placeholder="Confirm password" onChange={onChange} required minLength={5} />
      </Form.Group>

      <Button variant="primary" type="submit">
        SignUp
      </Button>
    </Form>

  )
}

export default Signup
