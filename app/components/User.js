import React from 'react'
import PropTypes from 'prop-types'
import { fetchUser, fetchStoryListByIds } from '../utils/api'
import queryString from 'query-string'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import StoryList from './StoryList'
import { ThemeConsumer } from '../contexts/theme'


export default class User extends React.Component {
  state = {
    userData: null,
    userStories: null,
    loadingUser: true,
    loadingStories: true,
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    fetchUser(id)
      .then(user => {
        this.setState({ userData: user, loadingUser: false })

        return fetchStoryListByIds(user.submitted.slice(0,30))
      }).then(stories => {
        this.setState({ userStories: stories, loadingStories: false })
      })
  }

  render () {
    const { userData, userStories, loadingUser, loadingStories } = this.state

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            {loadingUser === true
              ? <Loading text='Loading user' />
              : <React.Fragment>
                  <h1 className='user-title'>{userData.id}</h1>
                  <div className={`meta-info-${theme} user-meta-info`}>
                    Joined {formatDate(userData.created)} has {userData.karma.toLocaleString()} karma
                  </div>
                  <p dangerouslySetInnerHTML={{__html: userData.about}} />
                </React.Fragment>}

            {loadingStories === true
              ? loadingUser === false && <Loading text='Loading stories' />
              : <React.Fragment>
                  <h2 className='user-h2'>Posts</h2>
                  <StoryList stories={userStories} />
                </React.Fragment>}
          </React.Fragment>
        )}
      </ThemeConsumer>
    )
  }
}