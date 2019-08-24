import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

import Posts from './components/Posts'

class App extends React.Component {
  render() {
    return (
      <Posts />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)