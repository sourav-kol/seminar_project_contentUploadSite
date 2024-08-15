import React, { Component } from "react";
import Blog from "./show-blog";
import Axios from 'axios';

import category from "../.././images/list.svg";
import blog from "./show-blog";

class home extends Component {

  constructor() {
    super();

    this.state = {
      blogs: []
    }

    this.getBlogs = this.getBlogs.bind(this);
  }

  componentDidMount() {
    this.getBlogs("All")
  }

  getBlogs(tag) {
    Axios.get(`http://localhost:3001/getblog/${tag}`)
      .then(res => {
        this.setState({
          blogs: res.data
        });
      })
      .catch(err => { });
  }

  render() {
    return (
      <div className="home-container">
        <div className="home-hide"></div>
        <div className="home-title">
          <h2>Recent</h2>
        </div>
        <div className="home-tags">
          <div className="tag-sub">
            <button className="categories" onClick={this.display}>
              <img src={category} />
            </button>

            <div className="cat-buttons">
              <button onClick={() => this.getBlogs("All")} className="home-category active">All</button>
              <button onClick={() => this.getBlogs("Sports")} className="home-category">Sports</button>
              <button onClick={() => this.getBlogs("Education")} className="home-category">Education</button>
              <button onClick={() => this.getBlogs("Health")} className="home-category">Health</button>
              <button onClick={() => this.getBlogs("Food")} className="home-category">Food</button>
              <button onClick={() => this.getBlogs("Science")} className="home-category">Science</button>
            </div>
          </div>
        </div>
        <div className="home-content">
          <div className="blog-container">
            {/* <Blog />
            <Blog />
            <Blog />
            <Blog />
            <Blog />
            <Blog /> */}

            {
              this.state.blogs.map((items) => {
                return (<Blog id={items.postId} title={items.title} description={items.description} username={items.username} like={items.likes} />);
              })
            }

          </div>
        </div>
      </div>
    );
  }
}

export default home;
