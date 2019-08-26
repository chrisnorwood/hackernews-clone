import React from 'react'
import PropTypes from 'prop-types'
import { fetchStoryList } from '../utils/api'
import Loading from './Loading'
import StoryList from './StoryList'

export default class Stories extends React.Component {
  state = {
    stories: null,
    error: null,
  }
  
  componentDidMount () {
    this.handleFetch()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.type !== this.props.type) {
      this.handleFetch()
    }
  }

  isLoading = () => {
    const { stories, error } = this.state
    
    return !stories && error === null
  }
  
  handleFetch = () => {
    let { type } = this.props

    this.setState({
      stories: null,
      error: null,
    })

    fetchStoryList(type)
      .then((data) => {
        this.setState({ stories: data, error: null })
      })
      .catch((error) => {
        console.warn('Error fetching stories: ', error)

        this.setState({
          error: `There was an error fetching the stories.`
        })
      })
  }

  render() {
    const { stories } = this.state

    if (this.isLoading()) {
      return <Loading text='Loading' />
    }

    return (
      <StoryList stories={stories} />
    )
  }
}

Stories.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}