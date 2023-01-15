import React, { Component } from 'react';
import './Symbol.css';

export class Symbol extends Component {
  static displayName = Symbol.name;

  constructor(props) {
    super(props);
    this.state = { symbols: [], bets: [], stopLosses: [], selectedBets: [], numbers: [] };
    this.click = this.click.bind(this);
    this.add = this.add.bind(this);
  }

  componentDidMount() {
    this.populateSymbolData();
  }

  add(arr) {
    return arr.reduce((a, b) => a + b, 0);
  }

  async click(){
    let symbol = document.getElementById("selectSymbol").value;
    
    let sl = (Number)(document.getElementById("selectStopLoss").value);
    
    let selectedBets = this.state.bets.filter(bet=>bet.symbol === symbol && bet.stopLoss === sl);
    
    this.setState({ selectedBets: selectedBets });

  }

  render() {
    return (
      <div>
        <div className='div__flex'>
          <div className='div__container'>
            <span>Symbol:</span>
            <select id='selectSymbol'>
              {this.state.symbols.map(symbol =>
                <option key={symbol.name} value={symbol.name}>
                  {symbol.name}
                </option>
              )}
            </select>
          </div>
          <div className='div__container'>
            <span>StopLoss:</span>
            <select id='selectStopLoss'>
              {this.state.stopLosses.map(sl =>
                <option key={sl} value={sl}>
                  {sl}
                </option>
              )}
            </select>
          </div>
          <div className='div__container'>
            <button onClick={this.click}>Click</button>
          </div>
          
        </div>
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Number</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.numbers.map(number =>
              <tr key={number}>
                <td>{number}</td>
                <td>{this.add(this.state.selectedBets.find(bet=>bet.number === number).map(bet=>bet.profit))}</td>
              </tr>
            )}
          </tbody>
        </table>
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
    const response = await fetch('symbol');
    const data = await response.json();
    
    const responseBets = await fetch('bet');
    const dataBets = await responseBets.json();

    const responseSL = await fetch('bet/GetStopLoses');
    const dataStopLoses = await responseSL.json();

    
    const numbers = dataBets.map(bet=>bet.number);
    const dataNumbers = Array.from(new Set(numbers));

    this.setState({ symbols: data , bets: dataBets, stopLosses: dataStopLoses, numbers: dataNumbers });
  }
}
