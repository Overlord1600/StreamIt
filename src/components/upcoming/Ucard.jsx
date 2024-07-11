import React from "react";
import { Link } from "react-router-dom";

const Ucard = ({ item: { _id, poster } }) => {
  return (
    <Link to={`/singlepage/${_id}`} className="MovieBox">
      <div className="img">
        <img src={poster} alt="Movie Cover" />
      </div>
    </Link>
  );
};

export default Ucard;
