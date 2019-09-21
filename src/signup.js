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
            <div style={Signup} className="continue_signup">
                <h1 style={sign_Text}>Continue signing up</h1>
                <button style={sign_btn} onClick={this.createSession}>Continue</button>
            </div>
        )
    }
    
}
const Signup = {
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:"translate(-50%,-50%)",
    textAlign:'center'
    }
    const sign_Text={
        color:'white',
        marginBottom:'20px',

    }
    const sign_btn={
        background:'none',
        outline:'none',
        color:'white',
        border:'1px solid white',
        padding:'8px 12px',
        cursor:'pointer'
    }
const mapStateToProps = state => ({
  });
  
  export default connect(
    mapStateToProps,
    { addSessionId }
  )(signup);
  
