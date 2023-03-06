import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import DefaultAlert from './DefaultAlert'

const Navbar = (props) => {
  return (
    <>
      <nav className="nav bg-dark">
        <Link className="nav-link active" aria-current="page" to="/">iNoteBook</Link>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/about">About</Link>
        {/* <div className="text-right"> */}
        <Link className="btn btn-primary mx-2 " to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-2 " to="/signup" role="button">Signup</Link>
        {/* </div> */}
      </nav>
      {props.showAlert && <DefaultAlert message={props.message} variant={props.variant} />}
      <Outlet />
    </>
  )
}

export default Navbar
