import React, { Component } from 'react';


export class History extends Component {
  static displayName = History.name;

  constructor(props) {
    super(props);
    this.state = { messages: [], loading: true };
  }

  componentDidMount() {
    this.populateData();
  }

  static renderTable(messages) {
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
          {messages.map(item =>
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
      : History.renderTable(this.state.messages);

    return (
      <div>
        {contents}
      </div>
    );
  }

  async populateData() {
    let token = sessionStorage.getItem("accessToken");
    let data = {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        }};
    const response = await fetch('user/GetMessages', data);
    const messages = await response.json();
    this.setState({ messages: messages, loading: false });
  }
}
