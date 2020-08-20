import React, { Component } from "react";
import Navbar from "../top_navbar/navbar";
import SideNavbar from "../side_navbar/side_navbar";
export class header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, showSideNav: false };
  }
  openSideNav = () => {
    this.setState({ open: true }, () => {});
  };
  closeSideNav = () => {
    this.setState({ open: false }, () => {});
  };

  render() {
    return (
      <div>
        <div className="header">
          <Navbar clicked={this.openSideNav} />
          <SideNavbar closeNav={this.closeSideNav} open={this.state.open} />
        </div>
      </div>
    );
  }
}

export default header;
