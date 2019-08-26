import React from 'react'
import PropTypes from 'prop-types'
import StoryTitle from './StoryTitle'
import StoryInfo from './StoryInfo'

export default function StoryList ({ stories }) {
  return (
    <React.Fragment>
      {stories.map(story => {
        return (
          <div className='story-item' key={story.id}>
            <StoryTitle title={story.title} url={story.url} id={story.id} />
            <StoryInfo author={story.by} timeStamp={story.time} commentCount={story.descendants} id={story.id} />
          </div>
        )
      })}
    </React.Fragment>
  )
}

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
}