import React, { Component } from 'react';
import './Symbol.css';
import { VictoryChart, VictoryCandlestick, VictoryLabel, VictoryAxis, VictoryTooltip } from 'victory';



export class Symbol extends Component {
  static displayName = Symbol.name;

  constructor(props) {
    super(props);
    this.state = { symbol: props.symbol, klines: [] };
    this.newKline = this.newKline.bind(this);
  }

  async componentDidMount() {
    let response = await fetch('https://fapi.binance.com/fapi/v1/klines?symbol='+this.state.symbol+'&interval=1m&limit=100');
    let data = await response.json();
    let klines = data.map(kline=>this.newKline(kline));
    this.setState({ klines: klines });
  }


  newKline(kline){
    return {
      x: kline[0]
      , open: kline[1]
      , close: kline[4]
      , high: kline[2]
      , low: kline[3]
      , label: `open: ${kline[1]}\nclose: ${kline[4]}\nhigh: ${kline[2]}\nlow: ${kline[3]}\n${new Date(kline[0]).toLocaleString()}`};
  }

  render() {
    return (
      <div className='div__chart'>
        <VictoryChart >
          <VictoryLabel text={this.state.symbol} x={225} y={30} textAnchor="middle"/>
          <VictoryAxis dependentAxis/>
          <VictoryCandlestick
            candleColors={{ positive: "green", negative: "red" }}
            labels={({ datum }) => datum.label}
            labelComponent={<VictoryTooltip flyoutWidth={150}/>}
            data={this.state.klines}
          />
        </VictoryChart>
            
      </div>
    );
  }
}