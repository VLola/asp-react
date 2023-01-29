import React, { Component } from 'react';
import { Bets } from "./Bets";
import './Symbols.css';

export class Statistics extends Component {
  static displayName = Statistics.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, symbol: props.symbol, statistics:[] };
    // this.newBet = this.newBet.bind(this);
  }

  componentDidMount() {
    this.populateStatisticsData();
  }

  // newBet(bet){
  //   return {
  //     number: bet[0]
  //     , symbol: bet[1]
  //     , isLong: bet[2]
  //     , isPositive: bet[3]
  //     , openPrice: bet[4]
  //     , closePrice: bet[5]
  //     , openTime: bet[6]
  //     , closeTime: bet[7]
  //     , profit: bet[8]
  //     , stopLoss: bet[9]
  //     , open: bet[10]
  //     , close: bet[11]
  //     , interval: bet[12]
  // }}

  static renderStatisticsTable(statistics, symbol) {
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
                    {statistics.map(stat =>
                        <Bets key={stat.number+symbol} stat={stat}/>
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
      : Statistics.renderStatisticsTable(this.state.statistics, this.state.symbol);

    return (
      <div>
        {contents}
      </div>
    );
  }

  async populateStatisticsData() {
    if(this.state.symbol != "" && this.state.symbol != null){
        let responseStatistics = await fetch('symbol/Find?name='+this.state.symbol);
        let statistics = await responseStatistics.json();
        
        this.setState({ statistics: statistics, loading: false });
    }
    else{
        this.setState({ loading: false });
    }
  }
}
