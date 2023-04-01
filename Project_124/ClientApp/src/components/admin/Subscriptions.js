import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export class Subscriptions extends Component {
  static displayName = Subscriptions.name;

  constructor(props) {
    super(props);
    this.state = { subscriptions: [], loading: true };
  }

  componentDidMount() {
    this.loadData();
  }

  static renderTable(subscriptions) {
    return (
      <Table className="table table-striped">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Email</Th>
            <Th>OldAccess</Th>
            <Th>NewAccess</Th>
            <Th>Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subscriptions.map(buy =>
            <Tr key={buy.id} className='align-text-bottom'>
                <Td>{buy.id}</Td>
                <Td>{buy.email}</Td>
                <Td>VIP {buy.oldAccess}</Td>
                <Td>VIP {buy.newAccess}</Td>
                <Td>{buy.cost} $</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    );
  }
  
  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Subscriptions.renderTable(this.state.subscriptions);

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
    let response = await fetch('admin/GetBuys', data);
    if(response.status === 200){
      let subscriptions = await response.json();
      this.setState({ subscriptions: subscriptions, loading: false });
    }
    else if(response.status === 401){
      sessionStorage.setItem("accessToken", "");
      sessionStorage.setItem("role", "");
      sessionStorage.setItem("access", "");
      sessionStorage.setItem("isLogin", "");
    }
  }
}
