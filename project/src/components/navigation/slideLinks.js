import React, { Component } from "react";
import NavC from "./nav-center";
import { NavLink } from "react-router-dom";

import "../.././css/slider.css";

import cancel from "../.././images/cancelbtn.svg";

class slideNav extends Component {
  constructor() {
    super();

    this.state = {
      isMobile: false,
      windowWidth: window.innerWidth
    };
  }

  checkIfMobile() {
    if (this.state.windowWidth >= 490) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  }

  componentDidMount() {
    this.checkIfMobile();
  }

  render() {
    if (this.props.display) {
      return (
        <div className="slider-container">
          <div className="close" onClick={this.props.click}>
            <img src={cancel} alt="" />
          </div>
          <ul>
            <li>
              {/* <a href="">Home </a> */}
              <NavLink to="/" activeClassName="nav-active">
                Home
              </NavLink>
            </li>
            <li>
              {/* <a href="">Publish a blog </a> */}
              {/* addblog  */}
              <NavLink to="/addcontent" activeClassName="nav-active">
                Publish Content
              </NavLink>
            </li>
            <li>
              {/* <a href="">About us</a> */}
              <NavLink to="/about" activeClassName="nav-active">
                About us
              </NavLink>
            </li>
            <li>
              {/* <a href="">Contact us </a> */}
              <NavLink to="/contact" activeClassName="nav-active">
                Contact us
              </NavLink>
            </li>
          </ul>
          <NavC ismobile={this.state.isMobile} />
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default slideNav;
