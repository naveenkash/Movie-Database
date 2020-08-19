import React, { Component } from "react";
import Navbar from "./top_navbar/navbar";
import Slider from "./header_slider/slider";
import SideNavbar from "./side_navbar/side_navbar";
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
          {(() => {
            if (!this.state.open) {
              return null;
            }
            return <SideNavbar closeNav={this.closeSideNav} />;
          })()}
          <Slider />
        </div>
      </div>
    );
  }
}

export default header;
