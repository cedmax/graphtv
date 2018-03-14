export const transform = data => {
  const mappedData = []
  data.reduce((accumulator, { episodes }) => {
    mappedData.push(
      episodes.filter(episode=>!!episode.rating).map((episode, i) => ({
        title: episode.title,
        date: (new Date(episode.first_aired)).toLocaleDateString(),
        x: accumulator + i,
        y: episode.rating
      }))
    )

    return accumulator + episodes.length
  }, 1)
  return mappedData
}