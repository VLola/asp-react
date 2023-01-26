import React, { Component } from 'react';
import { Bets } from "./Bets";
import './Symbols.css';

export class Statistics extends Component {
  static displayName = Statistics.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, symbol: props.symbol, numbers:[], bets:[] };
  }

  componentDidMount() {
    this.populateStatisticsData();
  }

  static renderStatisticsTable(numbers, bets, symbol) {
    if(symbol != "" && symbol != null){
        return (
            <table className='table' aria-labelledby="tabelLabel">
                <thead style={{position:"sticky", top: 0, backgroundColor:"lightgray", zIndex: 9997}}>
                    <tr>
                        <th style={{width: "20%"}}>Symbol</th>
                        <th>Chart</th>
                        <th>Number</th>
                        <th>SL (%)</th>
                        <th>Time (m)</th>
                        <th>Profit (%)</th>
                        <th>Count</th>
                        <th>Count +</th>
                        <th>Count -</th>
                    </tr>
                </thead>
                <tbody>
                    {numbers.map(number =>
                        <Bets key={number+symbol} bets={bets.filter(bet=>bet.number === number)} number={number} symbol={symbol}/>
                    )}
                </tbody>
            </table>
        );
    }
    else{
        return(
            <div className='div__content-center'>
                <h3>Select symbol</h3>
            </div>
        );
    }
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Statistics.renderStatisticsTable(this.state.numbers, this.state.bets, this.state.symbol);

    return (
      <div>
        {contents}
      </div>
    );
  }

  async populateStatisticsData() {
    if(this.state.symbol != "" && this.state.symbol != null){
        let responseBets = await fetch('bet/Find?symbol='+this.state.symbol);
        let bets = await responseBets.json();

        let numbers = bets.map(bet=>bet.number);
        let dataNumbers = Array.from(new Set(numbers));
        
        this.setState({ numbers: dataNumbers, bets: bets, loading: false });
    }
    else{
        this.setState({ loading: false });
    }
  }
}
