import React from 'react'
import { NavLink } from 'react-router-dom'

const activeStyle = {
  color: 'rgb(187, 46, 31)',
}

export default function Header () {
  return (
    <nav>
      <ul className='row'>
        <li>
          <NavLink
            to='/'
            exact
            activeStyle={activeStyle}
            className='link'
          >
            Top
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/new'
            activeStyle={activeStyle}
            className='link'
          >
            New
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}