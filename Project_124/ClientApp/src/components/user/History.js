import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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
        <Table className='table table-striped'>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Question</Th>
            <Th>Response</Th>
          </Tr>
        </Thead>
        <Tbody>
          {messages.map(item =>
            <Tr key={item.id}>
              <Td>{item.dateTime}</Td>
              <Td>{item.question}</Td>
              <Td>{item.response}</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
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
