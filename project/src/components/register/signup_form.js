import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Select from "./select_tags";

class form extends Component {
  constructor() {
    super();

    this.state = {
      showTags: true,
      username: "",
      password: "",
      conpassword: "",
      checkUsername: false,
      checkPassword: false,
      checkConPassw: false,
      checkLen: false,
      checkPassLen: false
    };

    this.displayTags = this.displayTags.bind(this);
    this.getUserName = this.getUserName.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.getConPassword = this.getConPassword.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validatePass = this.validatePass.bind(this);
  }

  //-----
  getUserName(event) {
    this.setState({
      username: event.target.value
    });
  }

  getPassword(event) {
    this.setState(
      {
        password: event.target.value
      },
      () => {
        this.validatePass();
        this.validatePassword();
      }
    );
  }

  getConPassword(event) {
    this.setState(
      {
        conpassword: event.target.value
      },
      () => {
        this.validateInputs();
        this.validatePassword();
      }
    );
  }
  //------

  displayTags() {
    this.setState({
      showTags: !this.state.showTags
    });
  }

  validateInputs() {
    if (
      this.state.conpassword.length === 0 ||
      this.state.conpassword.length < 8
    ) {
      this.setState({
        checkLen: false
      });
    } else if (this.state.conpassword.length >= 8) {
      this.setState({
        checkLen: true
      });
    }
  }

  validatePass() {
    if (this.state.password.length <= 0 || this.state.password.length < 8) {
      this.setState({
        checkPassLen: false
      });
    } else if (this.state.password.length >= 8) {
      this.setState({
        checkPassLen: true
      });
    }
  }

  validatePassword() {
    if (
      this.state.password.length <= this.state.conpassword.length ||
      this.state.password.length >= this.state.conpassword.length
    ) {
      if (
        JSON.stringify(this.state.password) ===
        JSON.stringify(this.state.conpassword)
      ) {
        // console.log(JSON.stringify(this.state.conpassword));
        this.setState({
          checkConPassw: true
        });
      } else {
        this.setState({
          checkConPassw: false
        });
      }
    }
  }

  render() {
    return (
      <>
        {this.state.showTags ? (
          <>
            <form action="">
              <div className="form-fields">
                <label for="username">Email</label>
                <br />
                <input
                  onChange={this.getUserName}
                  type="text"
                  value={this.state.username}
                  required
                />
                <br />
              </div>

              <div className="form-fields">
                <label for="password">Password</label>
                <br />
                <input
                  onChange={this.getPassword}
                  type="password"
                  value={this.state.password}
                  required
                />
                <br />
                {this.state.checkPassLen ? (
                  <p className="valid">password valid</p>
                ) : (
                  <p className="invalid">
                    {" "}
                    password should be atleast 8 characters
                  </p>
                )}
              </div>

              <div className="form-fields">
                <label for="password">Confirm Password</label>
                <br />
                <input
                  onChange={this.getConPassword}
                  type="password"
                  value={this.state.conpassword}
                  required
                />
                <br />
                {this.state.checkLen ? (
                  this.state.checkConPassw ? (
                    <p className="valid">Password valid</p>
                  ) : (
                    <p className="invalid">
                      password and confirm password dosen't match
                    </p>
                  )
                ) : (
                  <p className="invalid">
                    {" "}
                    password should be atleast 8 characters
                  </p>
                )}
              </div>
            </form>
            <div className="form-fields-btn">
              <button
                onClick={this.state.checkConPassw ? this.displayTags : null}
              >
                Next
              </button>
            </div>
            <div className="form-links">
              <p>
                Already have an account.
                <NavLink activeClassName="" className="nav-link" to="/signup">
                  Sign in
                </NavLink>
              </p>
            </div>
          </>
        ) : (
          <Select email={this.state.username} password={this.state.password}></Select>
        )}
      </>
    );
  }
}

export default form;
