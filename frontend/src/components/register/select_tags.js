import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Axios from 'axios';

class select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: ["Sports", "Education", "Health", "Food", "Science", "Gaming"],
      selected: [],
      isSelected: false,
      index: -1,
      userName: "",
      isValid: false,
      selectedOne: false
    };

    this.selectTags = this.selectTags.bind(this);
    this.callFunction = this.callFunction.bind(this);
    this.getUserName = this.getUserName.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validateTags = this.validateTags.bind(this);
    this.insertUserData = this.insertUserData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  insertUserData(){
    let email = this.props.email;
    let pass = this.props.password;
    let user = this.state.userName;
    Axios.post("http://localhost:3001/signin",{email:email,password:pass,username:user,tags:this.state.selected})
    .then(res =>{
      if(res.data.inserted){
        alert("data insertion sucessfull!! login to continue using");
      }
    })
    .then(res =>{
      window.location = "/signin"
    })
    .catch((err)=>{console.log(err);})
    // console.log(`data inserted....`);
  }

  getUserName(event) {
    this.setState(
      {
        userName: event.target.value
      },
      () => {
        this.validateUsername();
      }
    );
  }

  validateUsername() {
    if (this.state.userName.length === 0) {
      this.setState({
        isValid: false
      });
    } else {
      this.setState({
        isValid: true
      });
    }
  }

  validateTags(){
    if(this.state.selected.length === 0){
      this.setState({
        selectedOne: false
      });
    }else{
      this.setState({
        selectedOne: true
      });
    }
  }

  selectTags(keys) {
    let delCounter = 0;
    //--
    delCounter = this.state.selected.indexOf(keys);
    if (delCounter !== -1) {
      let sel = this.state.selected;
      sel.splice(delCounter, 1);
      this.setState({
        selected: sel
      });
    } else {
      let select = this.state.selected;
      select.push(keys);
      this.setState({
        selected: select
      });
    }
  }

  callFunction(item) {
    this.selectTags(item);
    this.validateTags();
  }

  onSubmit(event){
    event.preventDefault();
    this.insertUserData();
  }

  render() {
    return (
      <div className="select-tags">
        <form onSubmit={this.onSubmit}>
          <div className="form-fields">
            <label>User Name</label>
            <input onChange={this.getUserName} type="text" />
            <br />
            {this.state.isValid ? (
              <p className="valid">username valid</p>
            ) : (
              <p className="invalid">username should be atleast 1 characters</p>
            )}
          </div>

          <div className="tags-container">
            <h1>select tags</h1>
            <div className="tags">
              {this.state.tags.map((items, index) => (
                <span
                  onClick={() => this.callFunction(items)}
                  className={
                    this.state.selected.includes(items)
                      ? "tags-active"
                      : "tags-span"
                  }
                  keys={items}
                >
                  {items}
                </span>
              ))}
              {this.state.selectedOne ? <p className="valid"></p> : <p className="invalid">select atleast one tag</p>}
            </div>
          </div>

          <div className="form-fields">
            {/* {<NavLink onClick={this.insertUserData} to={this.state.selectedOne && this.state.isValid  ? "signin": "signup"}>sign up</NavLink>} */}
            <input className="btn" type="submit"value="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default select;
