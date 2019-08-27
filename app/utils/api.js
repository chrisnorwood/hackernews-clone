// HackerNews API Interface

const api_url = `https://hacker-news.firebaseio.com/v0`

function removeDead (stories) {
  return stories.filter(Boolean).filter(({ dead }) => dead !== true)
}

function removeDeleted (stories) {
  return stories.filter(({ deleted }) => deleted !== true)
}

function onlyComments (stories) {
  return stories.filter(({ type }) => type === 'comment')
}

function onlyStories (stories) {
  return stories.filter(({ type }) => type === 'story')
}

function fetchStoryIds (type = 'top') {
  const endpoint = `${api_url}/${type}stories.json`

  return fetch (endpoint)
    .then(res => res.json())
    .then(storyIds => {
      if(storyIds === null) {
        throw new Error(`Cannot fetch ${type} story IDs`)
      }

      return storyIds
    })
}

function fetchItemById (id) {
  const endpoint = `${api_url}/item/${id}.json`

  return fetch(endpoint)
    .then(res => res.json())
}

export function fetchUser (id) {
  const endpoint = `${api_url}/user/${id}.json`

  return fetch(endpoint)
    .then(res => res.json())
}

export function fetchStoryListByIds (ids) {
  return Promise.all(ids.map(fetchItemById))
    .then((stories) => removeDeleted(onlyStories(removeDead(stories))))

}

export function fetchStoryList (type) {
  return fetchStoryIds(type)
    .then(idList => {
      return Promise.all(
        idList.slice(0,50).map(id => fetchItemById(id))
      )
    })
    .then((stories) => removeDeleted(onlyStories(removeDead(stories))))
}