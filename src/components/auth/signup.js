import React, { Component } from "react";
import "./auth.css";
import { Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { isLoggedIn } from "../../actions";
export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.isLoggedIn();
  }

  submit = () => {
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const lastname = document.querySelector("#lastname");
    const password = document.querySelector("#password");

    if (!name.value && !email.value && !password.value) {
      name.style.borderColor = "red";
      email.style.borderColor = "red";
      password.style.borderColor = "red";
      return;
    }

    var data = {};
    data.name = name.value;
    data.email = email.value;
    data.lastname = lastname.value;
    data.password = password.value;
    fetch("http://localhost:8080/auth/signup/local", {
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
          alert("Something went wrong please try again later");
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
      <div className="form">
        <input id="name" placeholder="Name *" /> <br />
        <input id="lastname" placeholder="Lastname" />
        <br />
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
          Your information is never shared with anyone. Password are stored
          encrypted. <Link to="/login">Login</Link>
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withRouter(connect(mapStateToProps, { isLoggedIn })(Signup));
