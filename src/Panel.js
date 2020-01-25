import React, { Component } from 'react';

class Panel extends Component {
    render() {
        return(
            <div className="contents-container">
                <div className="direction">
                    <img src={`${process.env.PUBLIC_URL}/images/man01}`} alt="user"/>
                    <img src={`${process.env.PUBLIC_URL}/images/arrow.png`} alt="arrow"/>
                    <img src={`${process.env.PUBLIC_URL}/images/woman01`} alt="user"/>
                </div>
                <div className="message">
                    <p>お疲れ様</p>
                </div>
                <div className="crapAndDate">
                    <div className="crapNum">
                        <img src={`${process.env.PUBLIC_URL}/images/crap.png`} alt="crap"/>
                        <span>10</span>
                    </div>
                    <div className="submit-time">2020/01/26 00:41</div>
                </div>
            </div>
        )
    }
}

export default Panel;