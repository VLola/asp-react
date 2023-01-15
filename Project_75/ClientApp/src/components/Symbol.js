import React, { Component } from 'react';

export class Symbol extends Component {
  static displayName = Symbol.name;

  constructor(props) {
    super(props);
    this.state = { symbols: [], loading: true, bets: [], stopLosses: [], selectedBets: [] };
  }

  componentDidMount() {
    this.populateSymbolData();
    this.click = this.click.bind(this);
  }


  async click(){
    let symbol = document.getElementById("selectSymbol").value;
    
    let sl = (Number)(document.getElementById("selectStopLoss").value);
    
    let selectedBets = this.state.bets.filter(bet=>bet.symbol === symbol && bet.stopLoss === sl);
    
    this.setState({ selectedBets: selectedBets });
    
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
          
        <select id='selectStopLoss'>
        {this.state.stopLosses.map(sl =>
            <option key={sl} value={sl}>
              {sl}
            </option>
          )}
        </select>
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

    const responseSL = await fetch('bet/GetStopLoses');
    const dataStopLoses = await responseSL.json();

    this.setState({ symbols: data , bets: dataBets, stopLosses: dataStopLoses , loading: false });
  }
}
