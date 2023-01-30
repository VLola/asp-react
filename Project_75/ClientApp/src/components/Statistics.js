import React, { Component } from 'react';
import { Bets } from "./Bets";
import './Symbols.css';

export class Statistics extends Component {
  static displayName = Statistics.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, symbol: props.symbol, statistics:[] };
  }

  componentDidMount() {
    this.populateStatisticsData();
  }

  static renderStatisticsTable(statistics, symbol) {
    if(symbol !== "" && symbol !== null){
        return (
            <table className='table' aria-labelledby="tabelLabel">
                <thead style={{position:"sticky", top: 0, backgroundColor:"lightgray", zIndex: 9997}}>
                    <tr>
                        <th style={{width: "20%"}}>Symbol</th>
                        <th>Chart</th>
                        <th>Profit (%)</th>
                        <th>Win (%)</th>
                        <th>Number</th>
                        <th>SL (%)</th>
                        <th>Time (m)</th>
                        <th>Count</th>
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
      ? <div className='div__content-center'><h3>Loading...</h3></div>
      : Statistics.renderStatisticsTable(this.state.statistics, this.state.symbol);

    return (
      <div>
        {contents}
      </div>
    );
  }

  async populateStatisticsData() {
    if(this.state.symbol !== "" && this.state.symbol !== null){
        let responseStatistics = await fetch('symbol/Find?name='+this.state.symbol);
        let statistics = await responseStatistics.json();
        
        this.setState({ statistics: statistics, loading: false });
    }
    else{
        this.setState({ loading: false });
    }
  }
}
