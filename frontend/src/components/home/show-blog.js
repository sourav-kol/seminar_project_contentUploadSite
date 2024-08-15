import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {
        author: "sourav kolambkar",
        title: "this is a line to, test title of the blog.",
        like: 200,
        description: "best way to test your webistes. I don't know it."
      }
    };
  }

  render() {
    return (
      // <div className="blog-container">
      <div className="blogs">
        <div className="blog-img"></div>
        <div className="blog-content">
          <div className="blog-author">
            <div className="author-img"></div>
            <h4>{this.props.username}</h4>
          </div>
          <div className="blog-title">
            <h1>{this.props.title}</h1>
            <p>{this.props.description}</p>
          </div>
          <div className="info">
            <div className="lcs">
              <div className="like-icon"></div>
              <h4>{this.props.like}</h4>
            </div>
            <NavLink to={`/show/${this.props.id}`}>read more</NavLink>
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

export default blog;
