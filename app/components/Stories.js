import React from 'react'
import PropTypes from 'prop-types'
import { fetchStoryList } from '../utils/api'
import Loading from './Loading'

export default class Stories extends React.Component {
  state = {
    storyList: null,
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
    const { storyList, error } = this.state
    
    return !storyList && error === null
  }
  
  handleFetch = () => {
    let { type } = this.props

    this.setState({
      storyList: null,
      error: null,
    })

    fetchStoryList(type)
      .then((data) => {
        this.setState({ storyList: data, error: null })
      })
      .catch((error) => {
        console.warn('Error fetching stories: ', error)

        this.setState({
          error: `There was an error fetching the stories.`
        })
      })
  }

  render() {
    if (this.isLoading()) {
      return <Loading text='Loading' />
    }

    return <pre>{JSON.stringify(this.state.storyList)}</pre>
  }
}

Stories.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}