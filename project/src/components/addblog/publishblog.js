import React, { Component } from 'react'
import Axios from 'axios';

import Addimg from "../../images/addimg.png";
import Addpara from "../../images/addpara.png";


import "../.././css/addblog.css";


export class publishblog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            body: [],
            tags: ["Sports", "Education", "Health", "Food", "Science", "Gaming"],
            selected: [],
            noOfPara: ['-'],
            ImageFile: null
        }

        this.getBody = this.getBody.bind(this);
        this.getDescription = this.getDescription.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.selectTags = this.selectTags.bind(this);
        this.callFunction = this.callFunction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addPara = this.addPara.bind(this);
        this.checkifLoggedIn = this.checkifLoggedIn.bind(this);
        this.addImage = this.addImage.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.setImg = this.setImg.bind(this);
    }

    checkifLoggedIn() {
        if (!this.props.checkAuthed) {
            // alert("you are not signed in");
            window.location = "/signin";
        }
    }

    getTitle(event) {
        this.setState(
            {
                title: event.target.value
            }
        );
    }

    getDescription(event) {
        this.setState(
            {
                description: event.target.value
            }
        );
    }

    getBody(event, index) {
        let b = this.state.body;
        let para;

        if (b[index] != null) {
            para = b[index];
            b[index] = event.target.value;

        } else {
            b[index] = event.target.value;
        }

        this.setState(
            {
                body: b
            },
            () => {
                console.log(this.state.body);
            }
        );
    }

    setImg(i,file){
        let b = this.state.body;
        b[i] = file;
        this.setState({
            body: b            
        });
    }

    addImage(event, index) {
        this.setState({
            ImageFile: event.target.files[0]
        }, () => {
            // console.log(this.state.ImageFile);
            this.getBase64(this.state.ImageFile)
            .then(encodedImg =>{
                this.setImg(index,encodedImg);
            })
        })
    };

    getBase64 = file => {
        return new Promise((resolve, reject) => {
            let fileInfo;
            let baseURL = "";

            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                baseURL = reader.result;
                // console.log(`base64  ${baseURL}`);
                resolve(baseURL);
            };
        });
    };

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

    postBlog() {
        Axios.post("http://localhost:3001/postblog",
            { title: this.state.title, description: this.state.description, body: this.state.body, tags: this.state.selected })
            .then(res => {
                if (res.data.inserted) {
                    alert("BLOG POSTED");
                    window.location('/addblog');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    addPara(data) {
        let p = this.state.noOfPara;
        p.push(data);
        this.setState({
            noOfPara: p
        });
    }

    callFunction(item) {
        this.selectTags(item);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postBlog();
    }

    componentWillMount() {
        this.checkifLoggedIn();
    }

    render() {
        return (
            <div className="add-container">
                <div className="top-discard"> </div>

                <div className="content">
                    <h1>Post Content</h1>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-fields">
                            <label htmlFor="title"> Title : </label>
                            <br />
                            <input onChange={this.getTitle} type="text" name="title" />
                            <br />
                        </div>

                        <div className="form-fields">
                            <label htmlFor="description"> Description : </label>
                            <br />
                            <input className="description" onChange={this.getDescription} type="text" name="description" />
                            <br />
                        </div>

                        <div className="form-fields">
                            <label htmlFor="body"> Content :</label>
                            <br />
                            {this.state.noOfPara.map((items, index) => {
                                if (items === '-')
                                    return (<textarea rows="10" cols="129" className="body" onChange={(e) => { this.getBody(e, index) }} type="text" name="body" />);
                                else
                                    return (<div><input type="file" onChange={(e) => { this.addImage(e, index) }} /></div>);
                            })}

                            <div className="add-stuff">
                                <div onClick={() => this.addPara('-')} className="add-para"><img src={Addpara}/></div>
                                <div onClick={() => this.addPara('+')} className="add-para"><img src={Addimg}/></div>
                            </div>

                        </div>

                        <div className="form-fields">
                            <div className="tags-container">
                                <h1>Add tags</h1>
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
                                    {/* {this.state.selectedOne ? <p className="valid"></p> : <p className="invalid">select atleast one tag</p>} */}
                                </div>
                            </div>
                        </div>

                        <div className="form-fields">
                            <input className="btn" type="submit" value="post" />
                        </div>

                    </form>
                </div>

                <div className="top-discard"></div>
            </div>
        )
    }
}

export default publishblog
