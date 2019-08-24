import React from 'react'
import { fetchPopularStoryIds } from '../utils/api'

export default class Stories extends React.Component {
  state = {
    popularStories: null,
  }
  
  componentDidMount () {
    fetchPopularStoryIds()
      .then((data) => {
        this.setState({ popularStories: data })
      })
  }

  render() {
    
    return (
      <pre>{JSON.stringify(this.state.popularStories)}</pre>
    )
  }
}