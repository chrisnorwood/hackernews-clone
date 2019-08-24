import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

import Stories from './components/Stories'

class App extends React.Component {
  render() {
    return (
      <Stories />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)