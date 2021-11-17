import React, { Component } from "react";
import logo from "../../images/Ellipse.png";

class navLeft extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="nav-left nav">
        <div className="logo">
          <img src={logo} alt=" " />
        </div>
      </div>
    );
  }
}

export default navLeft;
