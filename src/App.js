import React from 'react';
import './App.css';
import MovieTabs from './components/MovieTabs';
import MovieItem from './components/MovieItem';
import Pagination from './components/Pagination';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sortBy: 'popularity.desc',
      currentPage: 1,
    };
    this.addMovieToWillWatch = this.addMovieToWillWatch.bind(this);
    this.removeMovieFromWillWatch = this.removeMovieFromWillWatch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }

  componentDidMount() {
    const { sortBy, currentPage } = this.state;
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&sort_by=${sortBy}&page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movies: data.results,
          totalPages: data.total_pages,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy, currentPage } = this.state;
    if (prevState.sortBy !== sortBy) {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&sort_by=${sortBy}&page=${currentPage}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            movies: data.results,
            currentPage: 1,
          });
        });
    } else if (prevState.currentPage !== currentPage) {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&sort_by=${sortBy}&page=${currentPage}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            movies: data.results,
          });
        });
    }
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

  handlePrev() {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({
        currentPage: currentPage - 1,
      });
    }
  }

  handleNext() {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState({
        currentPage: currentPage + 1,
      });
    }
  }

  handlePage(e) {
    this.setState({
      currentPage: Number(e.target.innerText),
    });
  }

  render() {
    const {
      movies, moviesWillWatch, sortBy, currentPage, totalPages,
    } = this.state;
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
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                ))
              }
            </div>
            <div className="row pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrev={this.handlePrev}
                handleNext={this.handleNext}
                handlePage={this.handlePage}
              />
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
