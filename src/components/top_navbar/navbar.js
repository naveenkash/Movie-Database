import React, { Component } from "react";
import "./navbar.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../actions";
export class navbar extends Component {
  logOut = () => {
    localStorage.removeItem("token");
    this.props.isLoggedIn();
  };
  burgerClicked = () => {
    this.props.clicked();
  };
  render() {
    return (
      <div className="navbar">
        <div className="navbar-wrapper">
          <div className="navbar-container">
            <div
              className="burger"
              onClick={() => {
                this.burgerClicked();
              }}
            >
              <div className="burger_line"></div>
              <div className="burger_line"></div>
              <div className="burger_line"></div>
            </div>
            <h3>
              <Link to="/">Movie Database</Link>
            </h3>
            <ul>
              {(() => {
                if (this.props.auth) {
                  return null;
                }
                return (
                  <>
                    <li>
                      <span>
                        <Link to="/signup">Signup</Link>
                      </span>
                    </li>
                    <li>
                      <span>
                        <Link to="/login">Login</Link>
                      </span>
                    </li>
                  </>
                );
              })()}

              {(() => {
                if (!this.props.auth) {
                  return null;
                }
                return (
                  <li>
                    <span
                      onClick={() => {
                        this.logOut();
                      }}
                    >
                      Log Out
                    </span>
                  </li>
                );
              })()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { isLoggedIn })(navbar);
