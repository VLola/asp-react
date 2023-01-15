import React, { Component } from 'react';

export class Symbol extends Component {
  static displayName = Symbol.name;

  constructor(props) {
    super(props);
    this.state = { symbols: [], loading: true, bets: [], selectedBets: [] };
  }

  componentDidMount() {
    this.populateSymbolData();
    this.click = this.click.bind(this);
  }


  async click(){
    let val = document.getElementById("selectSymbol").value;
    
    this.state.selectedBets = this.state.bets.filter(bet=>bet.symbol == val);
    
    this.setState({ loading: false });
    
  }

  static renderSymbolsTable(symbols) {
    return (
      <select id='selectSymbol'>
        {symbols.map(symbol =>
            <option key={symbol.name} value={symbol.name}>
              {symbol.name}
            </option>
          )}
      </select>
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
        <button onClick={this.click}>Click</button>
        <div>
        {this.state.selectedBets.map(bet =>
          <div key={bet.number+bet.symbol+bet.openTime}>
            <div>{bet.number+bet.symbol}</div>
            <div>{bet.symbol}</div>
          </div>
        )}
      </div>
      </div>
    );
  }

  async populateSymbolData() {
    console.log("reload");
    const response = await fetch('symbol');
    const data = await response.json();
    
    const responseBets = await fetch('bet');
    const dataBets = await responseBets.json();
    this.setState({ symbols: data , bets: dataBets, loading: false });
  }
}
