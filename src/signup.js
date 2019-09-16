import React, { Component } from 'react'

import { connect } from "react-redux";
import { addSessionId } from "./actions";
export class signup extends Component {
    // componentDidMount(){
    //     console.log(window.location.href.split('=').join(',').split('&').join(',').split(','));
    //     var splitHref = window.location.href.split('=').join(',').split('&').join(',').split(',');
    //     console.log(splitHref[1]);
    // localStorage.setItem('request_token',splitHref[1]);
        
    // }
    createSession=()=>{
        var splitHref = window.location.href.split('=').join(',').split('&').join(',').split(',');
        console.log(splitHref[1]);
        fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=25050db00f2ae7ba0e6b1631fc0d272f`,{
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

            // var strLength = data.session_id.length
            // console.log(strLength);
            
            // var halfStr = strLength/2;
            // var firstHalf = data.session_id.substr(0,halfStr);
            // var seconfHalf = data.session_id.substr(halfStr);
            localStorage.setItem('session_id',data.session_id);
            this.props.history.push('/');
            // console.log(firstHalf,firstHalf.length,seconfHalf,seconfHalf.length);
            
        })
    }
    render() {
        return (
            <div className="continue_signup">
                {/* <h1 style={{textAlign:'center'}}>sign up route</h1> */}
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
  
