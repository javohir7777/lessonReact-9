import PropTypes from "prop-types";

const Search = ({ category, openModal }) => {
  return (
    <div className="p-3 sticky-top bg-light">
      <div className="container">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search..." />
          <span className="input-group-text">{category.length}</span>
          <button className="btn btn-secondary" onClick={openModal}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
Search.propTypes = {
  category: PropTypes.array,
  openModal: PropTypes.func,
};
export default Search;
