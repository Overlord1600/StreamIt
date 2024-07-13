import React, { useContext, useState } from "react";
import "./header.css";
import { ChoiceContext } from "../../context/ChoiceContext";
import { Link, useHistory } from "react-router-dom";
import Loader from "../Loader/Loader"; 
import { AuthContext } from "../../context/AuthContext";
import UserContext from "../../context/UserContext";

const Header = () => {
  const { choice, setChoice } = useContext(ChoiceContext);
  const [Mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false); 
  const history = useHistory();
  const {setCurrentUser} = useContext(UserContext);
  const {clearAuthInfo} = useContext(AuthContext);

  const handleLogout = async () => {
    setLoading(true); 
    try {
      setChoice("Movie");
      setCurrentUser(null);
      clearAuthInfo();
      history.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false); 
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
      {loading && <Loader />}
    </>
  );
}

export default Header;
