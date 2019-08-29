import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

import { formatDate } from '../utils/helpers'

export default function StoryInfo ({ author, timeStamp, commentCount, id }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`meta-info-${theme}`}>
          By <Link to={`/user?id=${author}`}>{author}</Link> on {formatDate(timeStamp)} with <Link to={`/story?id=${id}`}>{commentCount}</Link> comments
        </div>
      )}
    </ThemeConsumer>
  )
}

StoryInfo.propTypes = {
  author: PropTypes.string.isRequired,
  timeStamp: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
}