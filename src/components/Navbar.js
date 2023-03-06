import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import DefaultAlert from './DefaultAlert'

const Navbar = (props) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
    <>
      <nav className="nav bg-dark">
        <Link className="nav-link active" aria-current="page" to="/">iNoteBook</Link>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/about">About</Link>

        {!localStorage.getItem('token') ?
          <> <Link className="btn btn-primary mx-2 " to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2 " to="/signup" role="button">Signup</Link></> :
          <Button className="btn btn-primary mx-2 " onClick={handleLogout}>Logout</Button>
        }


      </nav>
      {props.showAlert && <DefaultAlert message={props.message} variant={props.variant} />}
      <Outlet />
    </>
  )
}

export default Navbar
