
// Create a function that takes in an input of movie ids as an array and returns top 10 recommended movie titles in an array.
export const getRecommendedMovies = (data, movieIds, count)=>{
  const moviesDict = data.movies;
  const users = data.users;
  const moviesFreq = {}

  users.forEach((user) => {
    // Go through all users and see if the user input is in their movie preference
    const isInUserMoviePref = movieIds.some((movieId) => {
      return user.movies.includes(movieId)
    })

    // If user has any inputed movies in their preference, add to the likedMovieDict
    if (isInUserMoviePref) {
      user.movies.forEach((movieId) => {
        if (!movieIds.includes(movieId)) {
          moviesFreq[movieId] = (moviesFreq[movieId] || 0) + 1;
        }
      })
    }
  })

  // Sort top 5 movies by frequency count descending
  const sortedLikedMovies = Object.keys(moviesFreq)
    .sort((a, b) => moviesFreq[b] - moviesFreq[a])
    .slice(0, count).map(movieId => moviesDict[movieId]);

  return sortedLikedMovies;
}
