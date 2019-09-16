import React ,{Component} from "react";
import "./App.css";
import Header from './components/header';
import Navbar from './components/top_navbar/navbar';
import { BrowserRouter,Route } from "react-router-dom";
import Signup from './signup'
export class App extends Component  {
  // componentWillMount(){
  //   fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=25050db00f2ae7ba0e6b1631fc0d272f')
  // }
    render(){
    return (
      <BrowserRouter>
      <div className="App">
        
        <Navbar/>
        {/* <Header/> */}
        <Route exact path="/" component={Header}/>
        
        <Route path="/signup" component={Signup}/>
              {/* <Route path="/detail" component={MovieDetail}/> */}
      
      </div>
       </BrowserRouter>
      )
  }
}

export default App;
