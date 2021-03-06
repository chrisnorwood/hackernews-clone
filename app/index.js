import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'
import Header from './components/Header'
import { ThemeProvider } from './contexts/theme'

const Stories = React.lazy(() => import('./components/Stories'))
const Story = React.lazy(() => import('./components/Story'))
const User = React.lazy(() => import('./components/User'))

// Reset and Custom Styles
import 'sanitize.css'
import './styles.css'

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Header />
              
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path='/' render={() => <Stories type='top' />} />
                  <Route path='/new' render={() => <Stories type='new' />} />
                  <Route path='/user' component={User} />
                  <Route path='/story' component={Story} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)