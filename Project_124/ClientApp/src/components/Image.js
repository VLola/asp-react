import React, { Component } from 'react';

export class Image extends Component {
  static displayName = Image.name;

  constructor(props) {
    super(props);
    let access = sessionStorage.getItem("access");
    this.state = { text: "", access: access };
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
      let result = await response.text();
      if(response.status === 200){
        alert(result);
      }
      console.log(result);
      this.loadCountMessages();
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
                    <input type="file" className="btn btn-outline-secondary btn-lg"/>
                    <label className="custom-file-label"></label>
                </div>
                <div className='d-flex align-items-center'>
                    <h4 className='m-3 text-muted'>Limit: {50 - this.state.count}</h4>
                    <button className="btn btn-outline-secondary btn-lg px-5" onClick={this.click}>Send</button>
                </div>
            </div>
        );
    }
    else{
        return (
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='d-flex m-5'>
                    <input type="file" className="btn btn-outline-secondary btn-lg"/>
                    <label className="custom-file-label"></label>
                </div>
                <div className='d-flex align-items-center'>
                    <button className="btn btn-outline-secondary btn-lg px-5" onClick={this.click}>Send</button>
                </div>
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
    let count = await response.text();
    this.setState({ count: count });
  }
}
