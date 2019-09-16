import React, { Component } from 'react'
import './navbar.css';
export class navbar extends Component {
    constructor(props){
        super(props);
       this.state={
           scrolled:false,
           session_id:""
       }
    }
    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll );
        this.setState({ session_id:localStorage.getItem('session_id')});
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.handleScroll )
    }
    handleScroll=()=>{
        
            if (
                document.body.scrollTop > 45 ||
                document.documentElement.scrollTop > 45
              ) {
                console.log("down");
                this.setState({scrolled:true});
              } else {
                this.setState({scrolled:false});
              }
    }
    scroll=()=>{
        if (this.state.scrolled) {
            return{
                background: 'rgba(40, 40, 40,1)',
                // boxShadow: '0px 3px 5px 0px rgba(176, 176, 176, 0.19)'
            }
        }
        
    }
    scrollLink=()=>{
        if (this.state.scrolled) {
            return{
                color:'white'
            }
        }
    }
    ScrollWrap=()=>{
        if (this.state.scrolled) {
            return{
                padding:'15px 15px'
            }
        }
    }
    requestToken=()=>{
        console.log('clicked');
        
        fetch("https://api.themoviedb.org/3/authentication/token/new?api_key=25050db00f2ae7ba0e6b1631fc0d272f")
        .then(res=>{
            return res.json();
        })
        .then(data=> {
            console.log(data);
            window.open(`https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000/signup`,"_blank");
            // localStorage.setItem('request_token',data.request_token);
        //   return  fetch(`https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=localhost:3000`)
        })
        .catch(err=>{
            alert(err);
        })
    }
    logOut=()=>{
        localStorage.removeItem('session_id');
        this.setState({ session_id:""})
    }
    render() {
        return (
            <div className="navbar" style={this.scroll()}>
                <div  className="navbar-wrapper">
                    <div className="navbar-container">
                        <ul>
                            {(()=>{
                                if (this.state.session_id) {
                                    return null
                                }
                                    return(
                                        <li style={this.ScrollWrap()}>
                                            <span style={this.scrollLink()}>Log In</span>
                                        </li>
                                         
                                    )
                                
                            })()}
                            {(()=>{
                                if (this.state.session_id) {
                                    return null
                                } 
                                    return(
                                        <li  style={this.ScrollWrap()}>
                                         <span style={this.scrollLink()} onClick={this.requestToken}>Sign up</span>
                                         </li>
                                         
                                     )
                                
                            })()} 
                            {(()=>{
                                if (this.state.session_id) {
                                    return null
                                }
                                    return(
                                        <li style={this.ScrollWrap()}>
                                         <span style={this.scrollLink()}>Guest</span>
                                         </li>
                                    )
                                
                            })()}
                       
                       {(()=>{
                                if (!this.state.session_id) {
                                    return null
                                }
                                    return(
                                        <li style={this.ScrollWrap()}>
                                         <span style={this.scrollLink()} onClick={this.logOut}>Log Out</span>
                                         </li>
                                )
                                
                            })()}      
                           
                           
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default navbar
