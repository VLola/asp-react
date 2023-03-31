import React, { Component } from 'react';


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
        <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Question</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {users.map(item =>
            <tr key={item.id}>
              <td>{item.dateTime}</td>
              <td>{item.question}</td>
              <td>{item.response}</td>
            </tr>
          )}
        </tbody>
      </table>
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
    const response = await fetch('user/GetMessages', data);
    const users = await response.json();
    this.setState({ users: users, loading: false });
  }
}
