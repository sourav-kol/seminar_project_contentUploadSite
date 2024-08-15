import React, { Component } from 'react'
import Axios from 'axios';
import Content from './content';

import '../.././css/viewblog.css';

export class showblogposts extends Component {

    constructor() {
        super();

        this.state = {
            blog: {}
        }

        this.getId = this.getId.bind(this);
        this.getBlogData = this.getBlogData.bind(this);
    }

    getId() {
        let id = window.location.href;
        id = id.split('/');

        this.getBlogData(id[4]);
    }

    getBlogData(postID) {
        Axios.get(`http://localhost:3001/show/${postID}`)
            .then(res => {
                this.setState({
                    blog: res.data
                })
                // console.log(this.state.blog);
            })
            .catch(err => {

            })
    }

    componentDidMount() {
        this.getId();

    }

    render() {
        return (
            <div className="add-container">
                <div className="top-discard"></div>
                <div className="content">
                    {this.state.blog.body != null || this.state.blog.title != null?
                    <Content title={this.state.blog.title} para={this.state.blog.body} />:
                    <div></div>
                    }
                </div>
            </div>
        )
    }
}

export default showblogposts

