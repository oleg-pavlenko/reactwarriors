import React from 'react';
import PropTypes from 'prop-types';

function MovieItem(props) {
  const { movie, removeMovie } = props;
  return (
    <div>
      <p>{movie.title}</p>
      <button type="button" onClick={() => removeMovie(movie)}>
        Delete Movie
      </button>
    </div>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  removeMovie: PropTypes.func.isRequired,
};

export default MovieItem;
