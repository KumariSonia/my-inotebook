import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className="nav bg-dark">
        <Link className="nav-link active" aria-current="page" to="/">iNoteBook</Link>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/About">About</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar
