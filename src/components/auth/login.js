import React, { Component } from "react";
import "./auth.css";
import { Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { isLoggedIn } from "../../actions";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.isLoggedIn();
  }

  submit = () => {
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    if (!email.value && !password.value) {
      email.style.borderColor = "red";
      password.style.borderColor = "red";
      return;
    }

    var data = {};
    data.email = email.value;
    data.password = password.value;
    fetch("https://immense-coast-18153.herokuapp.com/auth/login/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          alert(data.err);
          return;
        }
        localStorage.setItem("token", data.token);
        this.props.history.push("/");
        this.props.isLoggedIn();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  render() {
    if (this.props.auth) {
      return <Redirect to="/" />;
    }
    return (
      <div className="form login">
        <input id="email" type="email" placeholder="Email *" />
        <br />
        <input id="password" type="password" placeholder="Password *" />
        <br />
        <button
          id="signup-btn"
          onClick={() => {
            this.submit();
          }}
        >
          Submit
        </button>
        <p>
          Your information is never shared with anyone.
          <Link to="/Signup"> Signup</Link>
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withRouter(connect(mapStateToProps, { isLoggedIn })(Login));
