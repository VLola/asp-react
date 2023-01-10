import React, { Component } from 'react';

export class Symbol extends Component {
  static displayName = Symbol.name;

  constructor(props) {
    super(props);
    this.state = { symbols: [], loading: true };
  }

  componentDidMount() {
    this.populateSymbolData();
  }

  static renderSymbolsTable(symbols) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {symbols.map(symbol =>
            <tr key={symbol.name}>
              <td>{symbol.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Symbol.renderSymbolsTable(this.state.symbols);

    return (
      <div>
        <h1 id="tabelLabel" >Symbols</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateSymbolData() {
    const response = await fetch('symbol');
    const data = await response.json();
    this.setState({ symbols: data, loading: false });
  }
}
