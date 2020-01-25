import React, { Component } from 'react';
import './App.css';
import Top from './Top';
import Panel from './Panel';

class App extends Component {
  constructor() {
    super()
    this.state = {
      users:[{
          "id": 0,
          "name": "unknown",
          "image": "unknown.png",
          "give": 0,
          "get": 0
      }],
      contents:[{
          "id": 0,
          "from": 0,
          "to": 0,
          "message": "---",
          "craped": "0",
          "submitTime": "---"
      }]
    }
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
    this.setState({ contents: json.reverse() }) // Stateを更新する
    })
}

  render() {
    return(
      <div>
        <Top />

        {this.state.contents.map((content)=>{
          return (
            <Panel
            fromUserImage={this.state.users[content.from].image}
            toUserImage={this.state.users[content.to].image}
            message={content.message}
            craped={content.craped}
            submitTime={content.submitTime}
            />
          )
        })}
      </div>
    )
  }
}

export default App;