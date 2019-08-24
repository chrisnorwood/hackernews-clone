// HackerNews API Interface

export function fetchPopularStoryIds () {
  const endpoint = `https://hacker-news.firebaseio.com/v0/topstories.json`

  return fetch(endpoint)
    .then((res) => res.json())
    .then((popularStoryIds) => {
      if(popularStoryIds === null) {
        throw new Error('Cannot fetch popular story IDs')
      }
      
      return popularStoryIds
    })
}