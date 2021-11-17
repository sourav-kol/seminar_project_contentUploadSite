import React, { Component } from 'react'

export class content extends Component {

    constructor(props) {
        super(props);

        this.chekIfImage = this.chekIfImage.bind(this);
    }

    chekIfImage(str) {
        if (str.includes("data:image/")) {
            return true;
        } else {
            return false;
        }
    }


    render() {
        return (
            <React.Fragment>
                <h3>{this.props.title}</h3>

                {this.props.para.map(items => {
                    return <React.Fragment>{this.chekIfImage(items) ? <div className="content-img"><div className="img-container"><img src={items} /></div></div> : <p> {items}</p>}</React.Fragment>;
                })}
            </React.Fragment>
        )
    }
}

export default content
