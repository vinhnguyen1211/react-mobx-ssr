import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ loggedIn }) => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
    { loggedIn && <Link to="/secret">Secret</Link> }
  </div>
)

export default Header
