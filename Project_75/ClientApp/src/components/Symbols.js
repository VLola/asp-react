import React, { Component } from 'react';
import { Statistics } from './Statistics';
import './Symbols.css';

export class Symbols extends Component {
  static displayName = Symbols.name;

  constructor(props) {
    super(props);
    this.state = { symbols: [], stopLosses: [] };
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
    this.setState({ symbol: symbol });
  }

  render() {
    return (
      <div>
        <div className='div__flex'>
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
        </div>
        <div className='div__flex'>
            <select id='selectSymbol' multiple onChange={this.click}>
              {this.state.symbols.map(symbol =>
                <option key={symbol.name} value={symbol.name}>
                  {symbol.name}
                </option>
              )}
            </select>
          <div style={{width:"80%"}}>
            <Statistics key={this.state.symbol} symbol={this.state.symbol}/>
          </div>
        </div>
        
      </div>
    );
  }

  async populateSymbolData() {
    const response = await fetch('symbol');
    let data = await response.json();
    data.push({name:"All"});

    const responseSL = await fetch('bet/GetStopLoses');
    const dataStopLoses = await responseSL.json();

    this.setState({ symbols: data , stopLosses: dataStopLoses });
  }
}
