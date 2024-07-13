import React from "react";
import { Link } from "react-router-dom";

const Ucard = ({ item: { _id, poster,type } }) => {
  return (
    <Link to={`/singlepage/${_id}/${type}`} className="MovieBox">
      <div className="img">
        <img src={poster} alt="Movie Cover" />
      </div>
    </Link>
  );
};

export default Ucard;
