import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ id, avatar, name, editData, deleteData }) => {
  return (
    <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card">
        <img
          className="card-img-top object-fit-cover"
          src={avatar}
          alt=""
          height={200}
        />
        <div className="card-body">
          <h4 className="card-title text-center">{name}</h4>
          <div className="d-flex align-items-center justify-content-between">
            <button className="btn btn-primary" onClick={() => editData(id)}>
              Edit
            </button>
            <Link className="btn btn-success" to={`/product/${id}`}>
              New product {id}
            </Link>
            <button className="btn btn-danger" onClick={() => deleteData(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Card.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  editData: PropTypes.func,
  deleteData: PropTypes.func,
};
export default Card;
