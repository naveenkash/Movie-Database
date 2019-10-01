import React ,{Component} from "react";
import "./App.css";
import Header from './components/header';
import Navbar from './components/top_navbar/navbar';
// import { BrowserRouter,Route } from "react-router-dom";
import Signup from './signup'
export class App extends Component  {
  constructor(props){
    super(props);
    this.state={
      open:false,
      rt:localStorage.getItem('request_token'),
      request:false,
    }
  }
   openSideNav =()=>{
    
     this.setState({open:true},()=>{
       console.log(this.state.open);
       
     });
   
    
    
  }
   closeSideNav=()=>{
      this.setState({open:false},()=>{
        console.log(this.state.open);
        
      });
     }
  request=(tokenRequested)=>{
    this.setState({request:tokenRequested});
  }
  close=(close)=>{
    this.setState({request:close});
  }
    render(){
    return (
      // <BrowserRouter>
      <div className="App">
        
        <Navbar clicked={this.openSideNav} tokenRequested={this.request}/>
        {(()=>{
          if (!this.state.request) {
            return null;
          }else{
            return <Signup closeSignup={this.close}/>;
          }
        })()}
        
        {/* <Header/>
        <Route exact path="/" render={(props) => }/> */}
        <Header closeSide={this.closeSideNav}  open={this.state.open} />
        {/* <Route path={`/signup?request_token=${this.state.rt}&approved=true`} component={Signup}/> */}
              {/* <Route path="/detail" component={MovieDetail}/> */}
      
      </div>
       /* </BrowserRouter> */
      )
  }
}

export default App;
