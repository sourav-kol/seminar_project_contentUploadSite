import "./css/style.css";
import "./css/nav.css";
import "./css/slider.css";
import "./css/home.css";
import "./css/blog.css";

import Nav from "./components/navigation/nav";
import Root from "./components/root";
import Signin from "./components/register/signin";
import Signup from "./components/register/signup";
import Display from "./components/isloggedin/showblogsuser";
import Addblog from "./components/addblog/publishblog";
import Viewblog from "./components/viewBlogs/showblogposts";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from 'react';
import Axios from "axios";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Nav></Nav>
//         <Switch>
//           <Route path="/" exact component={Root} />
//           <Route path="/signin" component={Signin} />
//           <Route path="/signup" component={Signup}/>
//           <Route path="/aftersignin" component={Display}/>      
//           <Route path="/addcontent" component={Addblog}/>    
//           <Route path="/show/:id" component={Viewblog}/>              
//         </Switch>
//       </div>
//     </Router>
//   );
// }


class App extends Component {

  constructor() {
    super();
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    this.state = {
      isloggedin: false
    }
  }

  checkIfLoggedIn() {
    Axios.get("http://localhost:3001/user")
      .then(res => {
        console.log(res);
        this.setState({
          isloggedin: res.data.userStatus
        })
      })
      .catch(err => { });
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }


  render() {
    return (
      <Router>
        <div className="App">
          <Nav status={this.state.isloggedin} checkAuthed={this.checkIfLoggedIn}></Nav>
          <Switch>
            <Route path="/" exact component={Root} />

            <Route path="/signin" render={(props) => (
              <Signin {...props} checkAuthed={this.checkIfLoggedIn} />
            )} />

            <Route path="/signup" component={Signup} />
            <Route path="/aftersignin" component={Display} />
            <Route path="/addcontent" render={(props) => (
              <Addblog {...props} checkAuthed={this.state.isloggedin} />
            )} />
            <Route path="/show/:id" component={Viewblog} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
