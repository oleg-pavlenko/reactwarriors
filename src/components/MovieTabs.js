import React from 'react';
import PropTypes from 'prop-types';

class MovieTabs extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { sortBy } = this.props;
    if (nextProps.sortBy !== sortBy) {
      return true;
    }
    return false;
  }

  render() {
    const { sortBy, handleSort } = this.props;
    function handleClick(value) {
      return () => {
        handleSort(value);
      };
    }

    function getClassLink(value) {
      return `nav-link ${(sortBy === value) && 'active'}`;
    }
    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <button
            className={getClassLink('popularity.desc')}
            onClick={handleClick('popularity.desc')}
            type="button"
          >
            Popularity
          </button>
        </li>
        <li className="nav-item">
          <button
            className={getClassLink('revenue.desc')}
            onClick={handleClick('revenue.desc')}
            type="button"
          >
            Revenue
          </button>
        </li>
        <li className="nav-item">
          <button
            className={getClassLink('vote_average.desc')}
            onClick={handleClick('vote_average.desc')}
            type="button"
          >
            Avarage rating
          </button>
        </li>
      </ul>
    );
  }
}

MovieTabs.propTypes = {
  sortBy: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default MovieTabs;
