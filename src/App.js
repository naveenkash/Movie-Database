import React ,{Component} from "react";
import "./App.css";
import Header from './components/header';
import Navbar from './components/top_navbar/navbar';
import { BrowserRouter,Route } from "react-router-dom";
import Signup from './signup'
export class App extends Component  {
  constructor(props){
    super(props);
    this.state={
      open:false,
      rt:localStorage.getItem('request_token')
    }
  }
  openSideNav=(burgerClicked)=>{
    this.setState({open:burgerClicked});
    
  }
    render(){
    return (
      <BrowserRouter>
      <div className="App">
        
        <Navbar clicked={this.openSideNav}/>
        {/* <Header/> */}
        <Route exact path="/" render={(props) => <Header {...props} open={this.state.open} />}/>
        
        <Route path={`/signup?request_token=${this.state.rt}&approved=true`} component={Signup}/>
              {/* <Route path="/detail" component={MovieDetail}/> */}
      
      </div>
       </BrowserRouter>
      )
  }
}

export default App;
