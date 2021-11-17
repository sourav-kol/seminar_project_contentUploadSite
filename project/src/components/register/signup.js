import React, { Component } from "react";
import Form from "./signup_form";

import "../../css/modal.css";
import "../../css/signup.css";

class signup extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="signin-container">
        <div className="top-discard"></div>
        <div className="signin-content">
          <div className="signin-area">
            <div className="sigin-area-top">
              <h3>sign up</h3>
            </div>
            <div className="signup-bottom">
              <Form />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default signup;
