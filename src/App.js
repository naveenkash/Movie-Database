import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import Navbar from "./components/top_navbar/navbar";
import { connect } from "react-redux";
import { isLoggedIn } from "../src/actions";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.props.isLoggedIn();
  }
  openSideNav = () => {
    this.setState({ open: true }, () => {});
  };
  closeSideNav = () => {
    this.setState({ open: false }, () => {});
  };
  render() {
    return (
      <div className="App">
        <Navbar clicked={this.openSideNav} />
        <Header closeSide={this.closeSideNav} open={this.state.open} />
      </div>
    );
  }
}

export default connect(null, { isLoggedIn })(App);
