import React, { Component } from "react";
import "./navbar.css";
import { checkAuth, addSessionId } from "../../actions";
import { connect } from "react-redux";
export class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
      session_id: "",
      burgerClicked: false,
      tokenRequested: false,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    if (
      document.body.scrollTop > 45 ||
      document.documentElement.scrollTop > 45
    ) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };
  scroll = () => {
    if (this.state.scrolled) {
      return {
        boxShadow: "0px 3px 10px -1px rgba(204,204,204,0.75)",
      };
    }
  };
  signUp = () => {};
  logIn = () => {};
  logOut = () => {};
  burgerClicked = () => {
    this.setState({ burgerClicked: true }, () => {
      this.props.clicked(this.state.burgerClicked);
    });
  };
  render() {
    return (
      <div className="navbar" style={this.scroll()}>
        <div className="navbar-wrapper">
          <div className="navbar-container">
            <div className="burger" onClick={this.burgerClicked}>
              <div className="burger_line"></div>
              <div className="burger_line"></div>
              <div className="burger_line"></div>
            </div>
            <ul>
              {(() => {
                if (this.props.auth) {
                  return null;
                }
                return (
                  <li>
                    <span onClick={this.signUp}>Signup</span>
                  </li>
                );
              })()}

              {(() => {
                if (this.props.auth) {
                  return null;
                }
                return (
                  <li>
                    <span onClick={this.logIn}>Login</span>
                  </li>
                );
              })()}

              {(() => {
                if (!this.props.auth) {
                  return null;
                }
                return (
                  <li>
                    <span onClick={this.logOut}>Log Out</span>
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
export default connect(mapStateToProps, { checkAuth, addSessionId })(navbar);
