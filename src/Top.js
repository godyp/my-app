import React, { Component } from 'react';
import moment from 'moment';
// import './App.css';

class Top extends Component {
constructor(){
    super();
    this.state = {
    text: "",
    hasTextError: false,
    selectedValue1: 0,
    selectedValue2: 0,
    crapPoint: 0,
    getPoint: 0,
    date: "",
    users:[{
        "id": 0,
        "name": "unknown",
        "image": "unknown.png",
        "give": 0,
        "get": 0
    }]
    }
    this.submitTask = this.submitTask.bind(this)
    this.fetchUsers = this.fetchUsers.bind(this)
}

componentWillMount(){
    this.fetchUsers()
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
    // this.setState({ users: json }) // Stateを更新する
    })
}

handleTextChange(event){
    const inputValue = event.target.value;
    const isOk = inputValue.length >= 5;
    this.setState({
    text: inputValue,
    hasTextError: isOk
    });
}

handleUserChange1(event){
    this.setState({
        selectedValue1: event.target.value,
        crapPoint: this.state.users[event.target.value].give,
        getPoint: this.state.users[event.target.value].get
    })
}
handleUserChange2(event){
    this.setState({
        selectedValue2: event.target.value,
    })
}

calcDate(){
    let str = moment()
    this.setState({date : str})
    // let year = moment().year()
    // let month = moment().month()
    // let date = moment().date()
    // let day = moment().day()
    // let str = year + "/" + month + "/" + date + " " + day
}

submitTask() {
    this.calcDate();
    fetch("http://localhost:3001/contents", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: this.state.users[this.state.selectedValue1].id,
            to: this.state.users[this.state.selectedValue2].id,
            message: this.state.text,
            craped: 0,
            date: this.state.date
        })
    })
    .then( this.fetchContents )
}



render() {
    let button;
    if (this.state.hasTextError){
    button = <input className="btn" type="submit" value="投稿"  onClick={ ()=>{this.submitTask()} }/>;
    }else{
    button = <div className="no-btn">投稿</div>;
    }

    return (
    <div className="page-container">
        <div className="top">
            <div className="over">
                <div className="user-container">
                    <img src={`${process.env.PUBLIC_URL}/images/${this.state.users[this.state.selectedValue1].image}`} alt="user"/>
                    <select
                    value={this.state.selectedValue1}
                    onChange={(event)=>{this.handleUserChange1(event)}}
                    >
                        {
                            this.state.users.map( user => {
                                return <option className="user" value={ user.id }>{ user.name }</option>
                            })
                        }
                    </select>
                </div>
                <div className="user-info">
                        拍手できる：{this.state.crapPoint}　拍手された：{this.state.getPoint}
                </div>
            </div>
            <div className="under">
                <div className="user-container">
                    <img src={`${process.env.PUBLIC_URL}/images/${this.state.users[this.state.selectedValue2].image}`} alt="user"/>
                    <select
                    value={this.state.selectedValue2}
                    onChange={(event)=>{this.handleUserChange2(event)}}
                    >
                        {
                            this.state.users.map( user => {
                                return <option className="user" value={ user.id }>{ user.name }</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-area">
                    <form>
                        <textarea value={this.state.text} onChange={(event)=>{this.handleTextChange(event)}}/>
                        {button}
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
}

export default Top;