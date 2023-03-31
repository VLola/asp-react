import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export class User extends Component {
  static displayName = User.name;

  constructor(props) {
    super(props);
    this.state = { user: props.user, access: props.user.access, isBlocked: props.user.isBlocked, endBlockedTime: props.user.endBlockedTime, blockedTime: 0 };
    this.click = this.click.bind(this);
    this.changeAccess = this.changeAccess.bind(this);
    this.renderAccess = this.renderAccess.bind(this);
    this.renderUpdate = this.renderUpdate.bind(this);
    this.changeBlocked = this.changeBlocked.bind(this);
    this.renderBlocked = this.renderBlocked.bind(this);
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

  changeBlocked(event){
    this.setState({isBlocked: event.target.checked});
  }

  renderBlocked(){
    return(
        <div>
            <input className="form-check-input" type="checkbox" checked={this.state.isBlocked}  onChange={this.changeBlocked}></input>
        </div>
    );
  }

  renderUpdate(){
    if(this.state.access != this.state.user.access || this.state.isBlocked != this.state.user.isBlocked || this.state.blockedTime != 0){
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
            <option value="3">1 год</option>
        </select>
    );
  }

  click(){
    this.state.user.access = this.state.access;
    this.state.user.isBlocked = this.state.isBlocked;
    this.state.user.endBlockedTime = this.state.endBlockedTime;
    this.setState({user: this.state.user});
    console.log(this.state.user);
  }
  
  render() {
    return (
        <Tr className='align-text-bottom'>
            <Td>{this.state.user.id}</Td>
            <Td>{this.state.user.email}</Td>
            <Td>
                {this.renderBlocked()}
            </Td>
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
