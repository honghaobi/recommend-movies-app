import classNames from 'classnames'
import { useState, useEffect } from 'react'
import data from './movies.json'
import { getRecommendedMovies } from './getRecommendedMovies'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const moviesList = Object.keys(data.movies)

function App() {
  const [selectedMovies, updateSelectedMovies] = useState([])
  const [recommendedMovies, updateRecommendedMovies] = useState([])

  useEffect(() => {
    updateRecommendedMovies(getRecommendedMovies(data, selectedMovies, 10))
  },[selectedMovies]);

  const handleMovieSelection = (movieId) => {
    if (selectedMovies.includes(movieId)) {
      updateSelectedMovies(selectedMovies.filter((movie) => movie!== movieId))
    } else {
      updateSelectedMovies(selectedMovies.concat(movieId))
    }
  }

  return (
    <div className="App">
      <h1>Movies Recommendation App</h1>
      <h6 className='instruction'>Select Available movies below to get top 10 recommended movies</h6>
        <header className="App-header">
          <div>
            <h2>Available Movies</h2>
            <div className="moviesList">
              {
                moviesList.map((id,i) =>
                <div key={i}
                className={classNames( 'item',
                  {selected: selectedMovies.includes(i)}
                )}
                onClick={() => handleMovieSelection(i)}>{data.movies[i]}</div>)
              }
            </div>
          </div>
          <div>
            <h2>Recommended Movies</h2>
            <div className="moviesList">
              {recommendedMovies.map((movie) => <div>{movie}</div>)}
            </div>
          </div>
        </header>
    </div>
  );
}

export default App;
