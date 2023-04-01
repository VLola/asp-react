import React, { Component } from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export class User extends Component {
  static displayName = User.name;

  constructor(props) {
    super(props);
    this.state = { user: props.user, access: props.user.access.toLocaleString(), endBlockedTime: props.user.endBlockedTime, blockedTime: "0" };
    this.click = this.click.bind(this);
    this.changeAccess = this.changeAccess.bind(this);
    this.renderAccess = this.renderAccess.bind(this);
    this.renderUpdate = this.renderUpdate.bind(this);
    this.renderEndBlockedTime = this.renderEndBlockedTime.bind(this);
    this.changeBlockedTime = this.changeBlockedTime.bind(this);
    this.renderBlockedTime = this.renderBlockedTime.bind(this);
  }

  changeAccess(event){
    this.setState({access: event.target.value});
  }

  renderAccess(){
    return(
        <select className="form-select p-1" onChange={this.changeAccess} value={this.state.access}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    );
  }

  renderUpdate(){
    if(this.state.access !== this.state.user.access.toLocaleString() || this.state.blockedTime !== "0"){
        return(
            <div className='d-flex align-items-center'>
                <button className='btn btn-outline-danger btn-sm' onClick={this.click}>Update</button>
            </div>
        );
    }
    else{
        return(
            <div className='d-flex align-items-center'>
                <button className='btn btn-outline-secondary btn-sm' onClick={this.click}>Update</button>
            </div>
        );
    }
  }
  
  renderEndBlockedTime(){
    let endBlockedTime = new Date(this.state.endBlockedTime);
    let date = new Date();
    let dateUTC = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    if(endBlockedTime > dateUTC){
        return(
            <div className='text-danger'>
                {endBlockedTime.toLocaleString()}
            </div>
        );
    }
    else{
        return(
            <div>
                {endBlockedTime.toLocaleString()}
            </div>
        );
    }
  }

  changeBlockedTime(event){
    this.setState({blockedTime: event.target.value});
  }

  renderBlockedTime(){
    return(
        <select className="form-select p-1" onChange={this.changeBlockedTime} value={this.state.blockedTime}>
            <option value="0">Без изменений</option>
            <option value="1">Разблокировать</option>
            <option value="2">1 день</option>
            <option value="3">1 неделя</option>
            <option value="4">3 месяца</option>
            <option value="5">1 год</option>
            <option value="6">Навсегда</option>
        </select>
    );
  }

  async click(){
    let date = new Date();
    let dateUTC = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    if(this.state.blockedTime === "2"){
        dateUTC.setHours(24);
    }
    else if(this.state.blockedTime === "3"){
        dateUTC.setHours(24*7);
    }
    else if(this.state.blockedTime === "4"){
        dateUTC.setHours(24*90);
    }
    else if(this.state.blockedTime === "5"){
        dateUTC.setHours(24*365);
    }
    else if(this.state.blockedTime === "6"){
        dateUTC.setMonth(12*100);
    }

    let user = this.state.user;
    if(this.state.blockedTime !== "0"){
        user.endBlockedTime = dateUTC;
    }
    user.access = this.state.access;

    let token = sessionStorage.getItem("accessToken");
    let data = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json'
        }};
      let response = await fetch('admin/UpdateUser', data);
      let result = await response.text();
      if(response.status === 200){
        this.setState({user: user, blockedTime: "0", endBlockedTime: user.endBlockedTime, access: user.access});
      }
      else{
        alert(result);
      }
  }
  
  render() {
    return (
        <Tr className='align-text-bottom'>
            <Td>{this.state.user.id}</Td>
            <Td>{this.state.user.email}</Td>
            <Td>
                {this.renderEndBlockedTime()}
            </Td>
            <Td>
                {this.renderBlockedTime()}
            </Td>
            <Td>
                {this.renderAccess()}
            </Td>
            <Td>
                {this.renderUpdate()}
            </Td>
        </Tr>
      );
  }

}
