import React, { Component } from "react";
import NavC from "./nav-center";
import Slider from "./slideLinks";
import Logout from "./logout";
import searchIcon from "../.././images/search.png";

class navRight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      show: "none",
      isMobile: false,
      windowWidth: window.innerWidth
    };
    this.toggleSlider = this.toggleSlider.bind(this);
    this.checkIfMobile = this.checkIfMobile.bind(this);
  }

  toggleSlider() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  checkIfMobile() {
    if (this.state.windowWidth <= 490) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  }

  componentDidMount() {
    this.checkIfMobile();
  }

  showSlider() {
    if (this.state.show === "none") {
      this.setState({ show: "block" });
    } else {
      this.setState({ show: "none" });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="nav-right nav">
          <div className="nav-right-sub">
            {console.log(this.props.showLogout)}
            {
              (this.props.showLogout)? <Logout check={this.props.check} /> :
              <NavC ismobile={this.state.isMobile} />
            }

            <div className="search">
              <img src={searchIcon} alt="" />
            </div>

            <div className="hamburger" onClick={() => this.toggleSlider()}>
              <div className="hamstick ham1"></div>
              <div className="hamstick ham2"></div>
              <div className="hamstick ham3"></div>
            </div>
          </div>
        </div>
        <Slider display={this.state.isOpen} click={this.toggleSlider} />
      </React.Fragment>
    );
  }
}

export default navRight;
