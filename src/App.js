import React from 'react';
import './App.css';
import moviesData from './moviesData';
import MovieItem from './components/MovieItem';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: moviesData,
      moviesWillWatch: [],
    };
    this.removeMovie = this.removeMovie.bind(this);
    this.addMovieToWillWatch = this.addMovieToWillWatch.bind(this);
    this.removeMovieFromWillWatch = this.removeMovieFromWillWatch.bind(this);
  }

  removeMovie(movie) {
    const { movies } = this.state;
    const updateMovies = movies.filter((item) => item.id !== movie.id);
    this.setState({
      movies: updateMovies,
    });
  }

  addMovieToWillWatch(movie) {
    const { moviesWillWatch } = this.state;
    const updateMovies = [...moviesWillWatch, movie];
    this.setState({
      moviesWillWatch: updateMovies,
    });
  }

  removeMovieFromWillWatch(movie) {
    const { moviesWillWatch } = this.state;
    const updateMovies = moviesWillWatch.filter((item) => item.id !== movie.id);
    this.setState({
      moviesWillWatch: updateMovies,
    });
  }

  render() {
    const { movies, moviesWillWatch } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row">
              {
                movies.map((movie) => (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="col-3">
            <p>
              Will Watch:
              {' '}
              {moviesWillWatch.length}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
