import React, { useContext, useState } from "react";
import "./header.css";
import { ChoiceContext } from "../../context/ChoiceContext";
import { Link, useHistory } from "react-router-dom";
import Loader from "../Loader/Loader"; // Ensure you have the Loader component

const Header = () => {
  const { choice, setChoice } = useContext(ChoiceContext);
  const [Mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const history = useHistory();

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when logout starts
    try {
      localStorage.clear();
      history.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false); // Set loading to false after logout completes
    }
  };

  return (
    <>
      <header>
        <div className='container flexSB'>
          <nav className='flexSB'>
            <div className='logo'>
              <img src='./images/logo.png' alt='' />
            </div>
            <ul className={Mobile ? "navMenu-list" : "flexSB"} onClick={() => setMobile(false)}>
              <li className={choice === "Movie" ? "selected" : ""}>
                <Link to='/' onClick={() => setChoice("Movie")}>Movies</Link>
              </li>
              <li className={choice === "Series" ? "selected" : ""}>
                <Link to='/series' onClick={() => setChoice("Series")}>Series</Link>
              </li>
              <li className={choice === "Genres" ? "selected" : ""}>
                <Link to='/genres' onClick={() => setChoice("Genres")}>Genres</Link>
              </li>
              <li className={choice === "WatchLater" ? "selected" : ""}>
                <Link to='/watchlater' onClick={() => setChoice("WatchLater")}>Watch Later</Link>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
          <div className='account flexSB'>
            <button onClick={handleLogout} className='logout-button'>Logout</button>
          </div>
        </div>
      </header>
      {loading && <Loader />} {/* Display loader if loading is true */}
    </>
  );
}

export default Header;
