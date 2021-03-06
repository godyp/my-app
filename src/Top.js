import React, { Component } from 'react';
// import './App.css';

class Top extends Component {
  constructor(){
    super();
    this.state = {
      text: "",
      hasTextError: false,
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
      this.setState({ users: json }) // Stateを更新する
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
              <img src={`${process.env.PUBLIC_URL}/images/man01.png`} alt="user"/>
              <select defaultValue="0">
                    {
                        this.state.users.map( user => {
                            return <option className="user" value={ user.id }>{ user.name }</option>
                        })
                    }
              </select>
            </div>
            <div className="user-info">
              拍手できる：100　拍手された：0
            </div>
          </div>
          <div className="under">
            <div className="user-container">
              <img src={`${process.env.PUBLIC_URL}/images/man01.png`} alt="user"/>
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