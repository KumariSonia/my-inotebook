import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Alert from './Alert'

const Navbar = () => {
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
      <Alert message="This is a primary alert—check it out!" />
      <Outlet />
    </>
  )
}

export default Navbar
