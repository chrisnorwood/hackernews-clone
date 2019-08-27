// WILL BE USED FOR INDIVIDUAL STORY ROUTING PAGE

import React from 'react'
import queryString from 'query-string'
import Loading from './Loading'
import StoryInfo from './StoryInfo'
import StoryTitle from './StoryTitle'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { fetchItemById, fetchComments } from '../utils/api'

export default class Story extends React.Component {
  state = {
    story: null,
    loadingStory: true,
    comments: null,
    loadingComments: true,
    error: null
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    fetchItemById(id)
      .then(story => {
        this.setState({ story, loadingStory: false })

        return fetchComments(story.kids || [])
          .then(comments => {
            this.setState({ comments, loadingComments: false })
          })
      })
  }

  render() {
    const { story, loadingStory, comments, loadingComments, error } = this.state
    
    return (
      <React.Fragment>
        {loadingStory === true
          ? <Loading text='Loading story' />
          : <React.Fragment>
              <h1 className='story-h1'>
                <StoryTitle title={story.title} url={story.url} id={story.id} />
              </h1>
              <StoryInfo author={story.by} timeStamp={story.time} commentCount={story.descendants} id={story.id} />
              <p dangerouslySetInnerHTML={{__html: story.text}} />
            </React.Fragment>}
        {loadingComments === true
          ? loadingStory === false && <Loading text='Loading comments' />
          : <React.Fragment>
              <h2 className='user-h2'>Comments</h2>
              {comments.map(comment =>
                <div className='comment' key={comment.id}>
                  <div className='meta-info'>
                    By <Link to={`/user?id=${comment.by}`}>{comment.by}</Link> on {formatDate(comment.time)}
                  </div>
                  <div className='comment-container' dangerouslySetInnerHTML={{__html: comment.text}} />
                </div>
              )}
            </React.Fragment>}
      </React.Fragment>
    )
  }
}