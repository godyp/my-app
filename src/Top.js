import React, { Component } from 'react';
// import './App.css';

class Top extends Component {
constructor(){
    super();
    this.state = {
    text: "",
    hasTextError: false,
    selectedValue: 0,
    crapPoint: 0,
    getPoint: 0,
    users:[{
        "id": 0,
        "name": "unknown",
        "image": "unknown.png",
        "give": 0,
        "get": 0
    }]
    }
}

componentWillMount(){
    this.fetchTasks()
}

fetchTasks(){
    fetch("http://localhost:3001/users") // データを取得しに行く
    .then( response => response.json() ) // json型のレスポンスをオブジェクトに変換する
    .then( json => { // オブジェクトに変換したレスポンスを受け取り、
    this.setState({ users: json,imageUrl: `${process.env.PUBLIC_URL}/images/unknown.png}`, }) // Stateを更新する
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

handleUserChange(event){
    this.setState({
        selectedValue: event.target.value,
        crapPoint: this.state.users[event.target.value].give,
        getPoint: this.state.users[event.target.value].get,
        imageUrl: `${process.env.PUBLIC_URL}/images/${this.state.users[event.target.value].image}`
    })
}

render() {
    let button;
    if (this.state.hasTextError){
    button = <input className="btn" type="submit" value="投稿" />;
    }else{
    button = <div className="no-btn">投稿</div>;
    }

    return (
    <div className="page-container">
        <div className="top">
            <div className="over">
                <div className="user-container">
                    <img src={this.state.imageUrl} alt="user"/>
                    <select
                    vaue={this.state.selectedValue}
                    onChange={(event)=>{this.handleUserChange(event)}}
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
                    <img src={this.state.imageUrl} alt="user"/>
                    <select defaultValue="0">
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