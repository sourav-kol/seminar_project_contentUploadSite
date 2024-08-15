import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Axios from 'axios';

import '../../css/modal.css';

class signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }

    this.getPassword = this.getPassword.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // Axios.defaults.withCredentials = true;
  }

  authenticateUser() {

    Axios.post("http://localhost:3001/authenticate", { email: this.state.email, password: this.state.password })
      .then(res => {
        if (res.data.loggedin) {
          this.props.checkAuthed();
          window.location = "/aftersignin";
        }else {
          alert("invalid credentials");
          window.location = "/signin";
        }
      })
      .catch(err => { });
  }

  getPassword(event) {
    this.setState(
      {
        password: event.target.value
      }
    );
  }

  getEmail(event) {
    this.setState(
      {
        email: event.target.value
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.authenticateUser();
  }

  render() {
    return (
      <section className="signin-container">
        <div className="top-discard"></div>
        <div className="signin-content">
          <div className="signin-area">
            <div className="sigin-area-top">
              <h3>sign in</h3>
            </div>
            <div className="sigin-area-bottom">
              <form onSubmit={this.handleSubmit}>
                <div className="form-fields">
                  <label htmlFor="email"> Email</label>
                  <br />
                  <input onChange={this.getEmail} type="text" name="email" required />
                  <br />
                </div>

                <div className="form-fields">
                  <label htmlFor="password">Password</label>
                  <br />
                  <input type="password" name="password" onChange={this.getPassword} required />
                  <br />
                </div>

                <div className="form-fields">
                  {/* <NavLink to="/aftersignin" onClick={this.authenticateUser}>sign in</NavLink> */}
                  {<input className="btn signin-btn" type="submit" value="sign in" />}
                </div>
              </form>

              <div className="form-links">
                <p>
                  No account yet?
                  <NavLink className="nav-link" to="/signup">
                    Sign up
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default signin;
