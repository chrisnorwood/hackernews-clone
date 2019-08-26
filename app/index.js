import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'
import Header from './components/Header'

const Stories = React.lazy(() => import('./components/Stories'))

// Reset and Custom Styles
import 'sanitize.css'
import './styles.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Header />
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path='/' render={() => <Stories type='top' />} />
              <Route path='/new' render={() => <Stories type='new' />} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </React.Suspense>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)