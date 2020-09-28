import React from 'react';
import PropTypes from 'prop-types';

class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      willWatch: false,
    };
  }

  render() {
    const { willWatch } = this.state;
    const {
      movie, addMovieToWillWatch, removeMovieFromWillWatch,
    } = this.props;
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path
      || movie.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">
              Rating:
              {movie.vote_average}
            </p>
            {
              willWatch === true ? (
                <button
                  type="button"
                  onClick={() => {
                    removeMovieFromWillWatch(movie);
                    this.setState({
                      willWatch: false,
                    });
                  }}
                  className="btn btn-danger"
                >
                  Remove from favourites
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    addMovieToWillWatch(movie);
                    this.setState({
                      willWatch: true,
                    });
                  }}
                  className="btn btn-success"
                >
                  Will Watch
                </button>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

MovieItem.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
  addMovieToWillWatch: PropTypes.func.isRequired,
  removeMovieFromWillWatch: PropTypes.func.isRequired,
};

export default MovieItem;
