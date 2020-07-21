import React from 'react';
import './App.css';
import MovieTabs from './components/MovieTabs';
import MovieItem from './components/MovieItem';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sortBy: 'popularity.desc',
    };
    this.removeMovie = this.removeMovie.bind(this);
    this.addMovieToWillWatch = this.addMovieToWillWatch.bind(this);
    this.removeMovieFromWillWatch = this.removeMovieFromWillWatch.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    const { sortBy } = this.state;
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&sort_by=${sortBy}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movies: data.results,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy } = this.state;
    if (prevState.sortBy !== sortBy) {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&sort_by=${sortBy}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            movies: data.results,
          });
        });
    }
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

  handleSort(value) {
    this.setState({
      sortBy: value,
    });
  }

  render() {
    const { movies, moviesWillWatch, sortBy } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row mb-4">
              <MovieTabs sortBy={sortBy} handleSort={this.handleSort} />
            </div>
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
