import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


export default function StoryTitle ({ title, url, id }) {
  return url
    ? <a className='link' target='_blank' href={url}>{title}</a>
    : <Link className='link' to={`/story?id=${id}`}>{title}</Link>
}

StoryTitle.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string,
}