import React, { Component } from 'react';


export class Text extends Component {
  static displayName = Text.name;

  constructor(props) {
    super(props);
    this.state = { text: "" };
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
  }


  
  changeText(event) {
    this.setState({text: event.target.value});
  }
  
  render() {
    return (
        <div>
            <div className="form-outline form-white mb-4">
                <textarea type="text" className="form-control form-control-lg" placeholder="Text" value={this.state.text} onChange={this.changeText}/>
            </div>
            <div className='d-flex justify-content-end'>
                <button className="btn btn-outline-secondary btn-lg px-5" onClick={this.click}>Send</button>
            </div>
        </div>
    );
  }
}
