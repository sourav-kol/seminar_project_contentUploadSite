import React, { Component } from 'react';
import Axios from "axios";
import { NavLink } from "react-router-dom";

import "../.././css/logout.css"

export class logout extends Component {
    constructor() {
        super();

        this.state = {
            status: false
        }

        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser() {
        Axios.get("http://localhost:3001/logout")
            .then(res => {
                this.props.check();
            })
            .catch(err => {

            });
    }

    render() {
        return (
            <div onClick={this.logoutUser}>
                <NavLink to="/signin" className="btn">
                   logout
              </NavLink>
            </div>
        )
    }
}

export default logout
