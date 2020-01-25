import React, { Component } from 'react';

class Panel extends Component {
    render() {
        return(
            <div className="contents-container">
                <div className="direction">
                    <img className="person-img" src={`${process.env.PUBLIC_URL}/images/${this.props.fromUserImage}`} alt="user"/>
                    <img className="arrow-img" src={`${process.env.PUBLIC_URL}/images/arrow.png`} alt="arrow"/>
                    <img className="person-img" src={`${process.env.PUBLIC_URL}/images/${this.props.toUserImage}`} alt="user"/>
                </div>
                <div className="message">
                    <span>{this.props.message}</span>
                </div>
                <div className="crapAndDate">
                    <div className="crapNum">
                        <img className="crap-img" src={`${process.env.PUBLIC_URL}/images/crap.png`} alt="crap"/>
                        <span>{this.props.craped}</span>
                    </div>
                    <div className="submit-time">
                        <span>{this.props.submitTime}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Panel;