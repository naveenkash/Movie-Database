import React, { Component } from 'react'
import './side_navbar.css';
export class side_navbar extends Component {
    constructor(props){
        super(props)

    }
    render() {
        return (
            <div className="side_navbar">
                <div className="side_navbar_wrapper">

               
              <div className="side_logo">
                 <h1> Filmastic</h1>
              </div>
              <div className="side_navbar_container">
                  <div className="side_category">
                      <h1 className="side_category_head">Categories</h1>
                      <ul>
                          <li>Popular</li>
                          <li>Top Rated</li>
                          <li>Now Playing</li>
                          <li>Upcoming</li>
                          <li>Latest</li>
                      </ul>
                  </div>
              </div>
            </div> 
            </div>
        )
    }
}

export default side_navbar
