import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import { logout } from "../../JS/actions/user";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            FORMA FLASH
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/brochures"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Brochures gratuites
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact / RDV
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/devis" className="nav-links" onClick={closeMobileMenu}>
                Devis & Réservation
              </Link>
            </li>

            <li>
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>

          {button && (
            <Button
              buttonStyle="btn--outline"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(logout());
              }}
            >
              {isAuth ? `LogOut` : `SIGN UP`}
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
