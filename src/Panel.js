import React, { Component } from 'react';

class Panel extends Component {
    constructor() {
        super()
        this.fetchUsers = this.fetchUsers.bind(this)
        this.fetchContents = this.fetchContents.bind(this)
    }

    componentWillMount(){
        this.fetchUsers()
        this.fetchContents()
    }

    fetchUsers(){
        fetch("http://localhost:3001/users") // データを取得しに行く
        .then( response => response.json() ) // json型のレスポンスをオブジェクトに変換する
        .then( json => { // オブジェクトに変換したレスポンスを受け取り、
        this.setState({ users: json }) // Stateを更新する
        })
    }

    fetchContents(){
        fetch("http://localhost:3001/contents") // データを取得しに行く
        .then( response => response.json() ) // json型のレスポンスをオブジェクトに変換する
        .then( json => { // オブジェクトに変換したレスポンスを受け取り、
        this.setState({ contents: json }) // Stateを更新する
        })
    }

    render() {
        return(
            <div className="contents-container">
                <div className="direction">
                    <img className="person-img" src={`${process.env.PUBLIC_URL}/images/man01.png`} alt="user"/>
                    <img className="arrow-img" src={`${process.env.PUBLIC_URL}/images/arrow.png`} alt="arrow"/>
                    <img className="person-img" src={`${process.env.PUBLIC_URL}/images/woman01.png`} alt="user"/>
                </div>
                <div className="message">
                    <span>{this.state.users}{this.state.contents}</span>
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