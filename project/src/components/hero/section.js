import React, { Component } from "react";

import "../../css/hero.css";

import background_mobile from "../../images/background-final3.png";

class section extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     windowWidth: window.innerWidth,
  //     background_img: background
  //   };
  // }

  // checkIfMobile() {
  //   if (this.state.windowWidth >= 490) {
  //     this.setState({ background_img: background });
  //   } else {
  //     this.setState({ background_img: background_mobile });
  //   }
  // }

  // componentDidMount() {
  //   this.checkIfMobile();
  // }

  render() {
    return (
      <div className="container">
        <div className="hero-text">
          <div className="hero-text-sub">
            <h1>Publish your passions, your way</h1>
            <h4>Create unique and beautiful stories. it's easy and free.</h4>
            <button>start reading</button>
          </div>
        </div>
        <div className="background-image">
          <img src={background_mobile} alt="" />
        </div>
      </div>
    );
  }
}

export default section;
