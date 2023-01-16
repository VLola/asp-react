import React, { Component } from 'react';
import { Bets } from "./Bets";
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
    
    let numbers = selectedBets.map(bet=>bet.number);
    let dataNumbers = Array.from(new Set(numbers));
    
    this.setState({ symbol: symbol, numbers: dataNumbers, selectedBets: selectedBets });

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
              <th style={{width: "30%"}}>Symbol</th>
              <th>Number</th>
              <th>Profit</th>
              <th>Count</th>
              <th>Count +</th>
              <th>Count -</th>
            </tr>
          </thead>
          <tbody>
            {this.state.numbers.map(number =>
              <Bets key={number+this.state.symbol} bets={this.state.selectedBets.filter(bet=>bet.number === number)} number={number}/>
            )}
          </tbody>
        </table>
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

    this.setState({ symbols: data , bets: dataBets, stopLosses: dataStopLoses });
  }
}
