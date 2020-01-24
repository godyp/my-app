import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super()
        this.submitTask = this.submitTask.bind(this)
        this.fetchUsers = this.fetchUsers.bind(this)
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
        this.state.contents.map( content => {
            return (
            <div className="contents-container">
                <div className="direction">
                    <img src={`${process.env.PUBLIC_URL}/images/${this.state.users[content.from].image}`} alt="user"/>
                    <img src={`${process.env.PUBLIC_URL}/images/arrow.png`} alt="arrow"/>
                    <img src={`${process.env.PUBLIC_URL}/images/${this.state.users[content.to].image}`} alt="user"/>
                </div>
                <div class="message">
                    <p>{content.message}</p>
                </div>
                <div class="crapAndDate">
                    <div class="crapNum">
                        <img src={`${process.env.PUBLIC_URL}/images/crap.png`} alt="crap"/>
                        <span>{content.craped}</span>
                    </div>
                    <div class="submit-time">{content.submitTime}</div>
                </div>
            </div>
            )
        })
    }
}

export default Panel;