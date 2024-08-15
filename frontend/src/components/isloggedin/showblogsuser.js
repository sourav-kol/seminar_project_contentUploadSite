import React, { Component } from "react";
import Axios from 'axios';

import "../../css/userblog.css";
import Blog from ".././home/show-blog";

class showblog extends Component {

    constructor() {
        super();

        this.state = {
            testResult: "",
            blogData: []
        }

        this.displayData = this.displayData.bind(this);
        this.getBlogData = this.getBlogData.bind(this);
    }

    displayData() {
        Axios.get("http://localhost:3001/validUser")
            .then(result => {
                if (result.data.length <= 0) {
                    alert("invalid credentials");
                    window.location = "/signin";
                }
                // console.log(result);
            })
            .catch((err) => { });
    }

    //get related blogs
    getBlogData() {
        Axios.get("http://localhost:3001/blogs")
            .then(data => {
                this.setState({
                    blogData: data.data
                });

                // console.log(data);
            })
            .catch(err => { });
    }

    componentDidMount() {
        this.getBlogData();
    }

    render() {
        return (
            <div className="userblog-container">
                <div className="top-discard"></div>

                <div className="title">
                    <h1> Posts</h1>
                </div>

                {/* <div className="top-blogs">
                    <div className="blog-card">
                        <div className="card-pretty">

                        </div>
                    </div>
                    <div className="blog-card">
                        <div className="card-pretty">

                        </div>
                    </div>
                </div> */}

                <div className="home-content">
                    <div className="blog-container">
                        {
                            this.state.blogData.map((element) => {
                                return (
                                    <Blog id={element.postId} title={element.title} description={element.description} username={element.username} like={element.likes}></Blog>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default showblog;