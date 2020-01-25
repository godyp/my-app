import React, { Component } from 'react';

class Panel extends Component {
    render() {
        return(
            <div className="contents-container">
                <div className="direction">
                    <img className="person-img" src={`${process.env.PUBLIC_URL}/images/man01.png`} alt="user"/>
                    <img className="arrow-img" src={`${process.env.PUBLIC_URL}/images/arrow.png`} alt="arrow"/>
                    <img className="person-img" src={`${process.env.PUBLIC_URL}/images/woman01.png`} alt="user"/>
                </div>
                <div className="message">
                    <span>お疲れ様</span>
                </div>
                <div className="crapAndDate">
                    <div className="crapNum">
                        <img class="crap-img" src={`${process.env.PUBLIC_URL}/images/crap.png`} alt="crap"/>
                        <span>10</span>
                    </div>
                    <div className="submit-time">
                        <span>2020/01/26 00:41</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Panel;