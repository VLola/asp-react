import React, { Component } from 'react';
import { User } from "./User";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export class Users extends Component {
  static displayName = Users.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.loadData();
  }

  static renderTable(users) {
    return (
      <Table className="table table-striped">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Email</Th>
            <Th>Blocked</Th>
            <Th>Action</Th>
            <Th>Access</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user =>
            <User key={user.id} user={user}/>
          )}
        </Tbody>
      </Table>
    );
  }
  
  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Users.renderTable(this.state.users);

    return (
      <div>
        {contents}
      </div>
    );
  }

  async loadData() {
    let token = sessionStorage.getItem("accessToken");
    let data = {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token
        }};
    let response = await fetch('admin/GetUsers', data);
    if(response.status === 200){
      let users = await response.json();
      this.setState({ users: users, loading: false });
    }
    else if(response.status === 401){
      sessionStorage.setItem("accessToken", "");
      sessionStorage.setItem("role", "");
      sessionStorage.setItem("access", "");
      sessionStorage.setItem("isLogin", "");
    }
  }
}
