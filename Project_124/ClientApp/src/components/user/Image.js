import React, { Component } from 'react';

export class Image extends Component {
  static displayName = Image.name;

  constructor(props) {
    super(props);
    let access = sessionStorage.getItem("access");
    this.state = { text: "", access: access, result: "" };
    this.click = this.click.bind(this);
    this.changeText = this.changeText.bind(this);
    this.fileInput = React.createRef();
  }

  async click(){
    let file = this.fileInput.current.files[0];
    var fd = new FormData();
    fd.append('file', file);
    console.log(file.name);
    let token = sessionStorage.getItem("accessToken");
    let data = {
        method: 'POST',
        body: fd,
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token
        }};
      let response = await fetch('user/SendImage', data);
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
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='d-flex m-5'>
                    <input type="file" className="btn btn-outline-secondary btn-lg" ref={this.fileInput}/>
                    <label className="custom-file-label"></label>
                </div>
                <div className='d-flex align-items-center'>
                    <h4 className='m-3 text-muted'>Limit: {50 - this.state.count}</h4>
                    <button className="btn btn-outline-secondary btn-lg px-5" onClick={this.click}>Send</button>
                </div>
                <pre className='text-center text-muted'>
                  <h3>{this.state.result}</h3>
                </pre>
            </div>
        );
    }
    else{
        return (
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='d-flex m-5'>
                    <input type="file" className="btn btn-outline-secondary btn-lg" ref={this.fileInput}/>
                    <label className="custom-file-label"></label>
                </div>
                <div className='d-flex align-items-center'>
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
