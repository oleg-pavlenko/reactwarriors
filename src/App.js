import React from 'react';
import './App.css';
import moviesData from './moviesData';
import MovieItem from './components/MovieItem';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: moviesData,
    };
    this.removeMovie = this.removeMovie.bind(this);
  }

  removeMovie(movie) {
    const { movies } = this.state;
    const updateMovies = movies.filter((item) => item.id !== movie.id);
    this.setState({
      movies: updateMovies,
    });
  }

  render() {
    const { movies } = this.state;
    return (
      <div>
        {
          movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              removeMovie={this.removeMovie}
            />
          ))
        }
      </div>
    );
  }
}

export default App;
