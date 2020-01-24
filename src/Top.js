import React, { Component } from 'react';
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
	// 現在の日時
	let d = new Date();
	// 2桁のゼロ埋め
	// let fillZero = function ( number ) {
	// 	return (0 + number).slice(-2);
	// }
	// 年月日時分を取得
	let year = d.getFullYear();	// 年
	let month = (0 + d.getMonth() + 1).slice(-2); // 月
	let date = (0 + d.getDate()).slice(-2); // 日
	let hour = (0 + d.getHours()).slice(-2); // 時
	let minute = (0 + d.getMinutes()).slice(-2); // 分
	// 年月日時分秒の文字列の作成(YYYYMMDDHHMMSS)
    let str = `${year}/${month}/${date} ${hour}:${minute}`;
    this.setState({date: str});
    console.log("1:"+str)
    console.log("1:"+this.state.date)
}

submitTask() {
    this.calcDate;
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