// HackerNews API Interface

function fetchStoryIds (type = 'top') {
  const endpoint = `https://hacker-news.firebaseio.com/v0/${type}stories.json`

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
  const endpoint = `https://hacker-news.firebaseio.com/v0/item/${id}.json`

  return fetch(endpoint)
    .then(res => res.json())
}

export function fetchStoryList (type) {
  return fetchStoryIds(type)
    .then(idList => {
      return Promise.all(
        idList.slice(0,50).map(id => fetchItemById(id))
      )
    })
}