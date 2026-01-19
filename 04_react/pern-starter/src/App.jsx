import React, { useEffect, useState } from 'react'
import Movie from './components/Movie'


const App = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch('api/v1/movies')
    .then(res => res.json())
    .then(data => setMovies(data))
    .catch(error => console.log('Error fetching movies:', error));
  }, []);
  console.log(movies);

  return (
    <div>
      <h1>Welcome to the Movie Store</h1>

      <ul>
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </ul>
    </div>
  )
}

export default App