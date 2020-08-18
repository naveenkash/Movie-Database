import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import Navbar from "./components/top_navbar/navbar";
import Signup from "./signup";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      rt: localStorage.getItem("request_token"),
      request: false,
    };
  }
  openSideNav = () => {
    this.setState({ open: true }, () => {
      console.log(this.state.open);
    });
  };
  closeSideNav = () => {
    this.setState({ open: false }, () => {
      console.log(this.state.open);
    });
  };
  request = (tokenRequested) => {
    this.setState({ request: tokenRequested });
  };
  close = (close) => {
    this.setState({ request: close });
  };
  render() {
    return (
      <div className="App">
        <Navbar clicked={this.openSideNav} tokenRequested={this.request} />
        {(() => {
          if (!this.state.request) {
            return null;
          } else {
            return <Signup closeSignup={this.close} />;
          }
        })()}
        <Header closeSide={this.closeSideNav} open={this.state.open} />
      </div>
    );
  }
}

export default App;
