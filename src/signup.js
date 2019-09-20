import React, { Component } from 'react'

// import {api_key } from './process.env'
import { connect } from "react-redux";
import { addSessionId } from "./actions";
var api_key = process.env.REACT_APP_API_KEY
export class signup extends Component {
    createSession=()=>{
        var splitHref = window.location.href.split('=').join(',').split('&').join(',').split(',');
        console.log(splitHref[1]);
        fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${api_key}`,{
            method:'POST',
            body:JSON.stringify({request_token:splitHref[1]}) ,
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors', // no-cors, *cors, same-origin // body data type must match "Content-Type" header
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data.session_id);
            this.props.addSessionId(data.session_id);
            localStorage.setItem('session_id',data.session_id);
            this.props.history.push('/');
        })
    }
    render() {
        return (
            <div className="continue_signup">
                <h1>Continue signing up</h1>
                <button onClick={this.createSession}>Continue</button>
            </div>
        )
    }
}
const mapStateToProps = state => ({
  });
  
  export default connect(
    mapStateToProps,
    { addSessionId }
  )(signup);
  
