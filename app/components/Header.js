import React from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

const activeStyle = {
  color: 'rgb(187, 46, 31)',
}

export default function Header () {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className='row space-between'>
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
          <button
            style={{fontSize: 30}}
            className='btn-clear'
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🔦' : '💡'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  )
}