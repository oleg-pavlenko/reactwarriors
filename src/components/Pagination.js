import React from 'react';
import PropTypes from 'prop-types';

function Pagination(props) {
  const {
    currentPage, totalPages, handlePrev, handleNext, handlePage,
  } = props;
  const items = [];
  let n = 1;
  let i = 1;
  if (totalPages >= 5) {
    if (currentPage >= 3) {
      if (currentPage >= totalPages - 2) {
        n = totalPages;
      } else {
        n = currentPage + 2;
      }
    } else {
      n = 5;
    }
  } else {
    n = totalPages;
  }
  if (currentPage >= 3) {
    if (currentPage > totalPages - 2) {
      i = totalPages - 4;
    } else {
      i = currentPage - 2;
    }
  } else {
    i = 1;
  }
  for (i; i <= n; i += 1) {
    items.push(
      <button
        className={`btn mr-3 ${currentPage === i ? 'btn-primary' : 'btn-secondary'}`}
        onClick={handlePage}
        type="button"
        key={i}
      >
        {
          i
        }
      </button>,
    );
  }
  return (
    <>
      <button
        className="btn btn-secondary mr-3"
        onClick={handlePrev}
        type="button"
      >
        Previous
      </button>
      {items}
      <button
        className="btn btn-secondary"
        onClick={handleNext}
        type="button"
      >
        Next
      </button>
    </>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  totalPages: 5,
};

export default Pagination;
