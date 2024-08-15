import React, { Component } from "react";
import NavR from "./nav-right";
import NavL from "./nav-left";

class nav extends Component {
  constructor(props){
    super(props);
  }



  render() {
    return (
      <nav className="nav-container">
        <NavL />
        <NavR showLogout = {this.props.status} check={this.props.checkAuthed}/>
      </nav>
    );
  }
}

export default nav;
