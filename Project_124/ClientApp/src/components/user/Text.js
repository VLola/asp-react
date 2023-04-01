import React, { Component } from 'react';

export class Text extends Component {
  static displayName = Text.name;

  constructor(props) {
    super(props);
    let access = sessionStorage.getItem("access");
    this.state = { text: "", access: access, result: "" };
    this.click = this.click.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  async click(){
    let token = sessionStorage.getItem("accessToken");
    let data = {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        }};
      let response = await fetch('user/SendText?text=' + this.state.text, data);
      let result = await response.json();
      if(response.status === 200){
        this.setState({result: result});
        this.loadCountMessages();
      }
      else{
        alert(result);
      }
  }


  
  changeText(event) {
    this.setState({text: event.target.value});
  }

  
  componentDidMount() {
    this.loadCountMessages();
  }
  
  render() {
    if(this.state.access === "0"){
        return (
            <div>
                <div className="form-outline form-white mb-4">
                    <textarea type="text" className="form-control form-control-lg" placeholder="Text" value={this.state.text} onChange={this.changeText}/>
                </div>
                <div className='d-flex justify-content-end align-items-center'>
                    <h4 className='m-3 text-muted'>Limit: {50 - this.state.count}</h4>
                    <button className="btn btn-outline-secondary btn-lg" onClick={this.click}>Send</button>
                </div>
                <pre className='text-center text-muted'>
                  <h3>{this.state.result}</h3>
                </pre>
            </div>
        );
    }
    else{
        return (
            <div>
                <div className="form-outline form-white mb-4">
                    <textarea type="text" className="form-control form-control-lg" placeholder="Text" value={this.state.text} onChange={this.changeText}/>
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="btn btn-outline-secondary btn-lg px-5" onClick={this.click}>Send</button>
                </div>
                <pre className='text-center text-muted'>
                  <h3>{this.state.result}</h3>
                </pre>
            </div>
        );
    }
  }
  async loadCountMessages() {
    let token = sessionStorage.getItem("accessToken");
    let data = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        }};
    let response = await fetch('user/GetCountMessages', data);
    if(response.status === 200){
      let count = await response.json();
      this.setState({ count: count });
    }
    else if(response.status === 401){
      sessionStorage.setItem("accessToken", "");
      sessionStorage.setItem("role", "");
      sessionStorage.setItem("access", "");
      sessionStorage.setItem("isLogin", "");
    }
  }
}
