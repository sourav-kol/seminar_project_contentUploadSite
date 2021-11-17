import React, { Component } from "react";

import Hero from "./hero/section";
import Home from "./home/home";

class root extends Component {
  render() {
    return (
      <>
        <Hero />
        <Home />
      </>
    );
  }
}

export default root;
