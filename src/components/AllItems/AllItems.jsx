import React from "react";
import Ucard from "../upcoming/Ucard"; // Ensure the correct import path
import "./allitems.css"
const MoviesGrid = ({ movies , title }) => {
  console.log(movies);
  return (
    <>
    <h1 className="listtitle">{title}</h1>
    <div className="movies-grid">
      {movies.map((movie,index) => (
        <Ucard key={movie._id+index} item={movie} />
      ))}
    </div>
    </>
    
  );
};

export default MoviesGrid;
