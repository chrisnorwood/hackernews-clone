import React from 'react'
import { fetchStoryList } from '../utils/api'

export default class Stories extends React.Component {
  state = {
    storyType: 'top',
    storyList: null,
    error: null,
  }
  
  componentDidMount () {
    let { storyType } = this.state

    fetchStoryList(storyType)
      .then((data) => {
        console.log("data", data)
        this.setState({ storyList: data })
      })
      .catch((error) => {
        console.warn('Error fetching stories: ', error)

        this.setState({
          error: `There was an error fetching the stories.`
        })
      })
  }

  render() {
    return (
      <pre>{JSON.stringify(this.state.storyList)}</pre>
    )
  }
}