import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class navCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      cName: "nav-center"
    };
  }

  setClassName() {
    if (this.state.windowWidth >= 490) {
      this.setState({
        cName: "nav-center"
      });
    } else {
      this.setState({
        cName: "nav-center-mobile"
      });
    }
  }

  componentDidMount() {
    this.setClassName();
  }

  render() {
    if (!this.props.ismobile) {
      return (
        <div className={this.state.cName}>
          <NavLink to="/signin" activeClassName="active-btn">
            sign in
          </NavLink>
          <NavLink to="/signup" className="brd" activeClassName="active-btn">
            sign up
          </NavLink>
        </div>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default navCenter;
