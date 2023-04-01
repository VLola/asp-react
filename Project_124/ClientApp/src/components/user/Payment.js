import React, { Component } from 'react';

export class Payment extends Component {
  static displayName = Payment.name;

  constructor(props) {
    super(props);
    let access = sessionStorage.getItem("access");
    this.state = { access: access };
    this.click = this.click.bind(this);
  }

  async click(event){
    if(this.state.access < event.target.value){
        let token = sessionStorage.getItem("accessToken");
        let data = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }};
          let response = await fetch('user/BuyAccess?access=' + event.target.value, data);
          let result = await response.json();
          if(response.status === 200){
            this.setState({access: event.target.value});
            sessionStorage.setItem("access", event.target.value);
          }
          else if(response.status === 401){
            sessionStorage.setItem("accessToken", "");
            sessionStorage.setItem("role", "");
            sessionStorage.setItem("access", "");
            sessionStorage.setItem("isLogin", "");
          }
          else{
            alert(result);
          }
    }
  }

  render() {
    return (
        <div className=' d-flex flex-column justify-content-center align-items-center'>
            <h3 className='text-center text-muted'>VIP {this.state.access}</h3>
            <div className='d-flex justify-content-end align-items-center'>
                {this.state.access === "0"?(<>
                    <button className="btn btn-outline-secondary btn-lg m-3" value={"1"} onClick={this.click}>Buy VIP 1</button>
                    <button className="btn btn-outline-secondary btn-lg m-3" value={"2"} onClick={this.click}>Buy VIP 2</button>
                    <button className="btn btn-outline-secondary btn-lg m-3" value={"3"} onClick={this.click}>Buy VIP 3</button>
                </>):(<></>)}
                {this.state.access === "1"?(<>
                    <button className="btn btn-outline-secondary btn-lg m-3" value={"2"} onClick={this.click}>Buy VIP 2</button>
                    <button className="btn btn-outline-secondary btn-lg m-3" value={"3"} onClick={this.click}>Buy VIP 3</button>
                </>):(<></>)}
                {this.state.access === "2"?(<>
                    <button className="btn btn-outline-secondary btn-lg m-3" value={"3"} onClick={this.click}>Buy VIP 3</button>
                </>):(<></>)}
            </div>
        </div>
    );
  }
}