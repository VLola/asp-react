import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { bets: [], loading: true };
  }

  componentDidMount() {
    this.populateBetData();
  }

  static renderBetsTable(bets) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Number</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {bets.map(bet =>
            <tr key={bet.number+bet.symbol+bet.openTime}>
              <td>{bet.number+bet.symbol}</td>
              <td>{bet.symbol}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderBetsTable(this.state.bets);

    return (
      <div>
        <h1 id="tabelLabel" >Bets</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateBetData() {
    const response = await fetch('bet');
    const data = await response.json();
    this.setState({ bets: data, loading: false });
  }
}