import React, { Component } from 'react';
import './Symbol.css';
import { VictoryChart, VictoryCandlestick, VictoryLabel, VictoryAxis, VictoryTooltip, VictoryScatter, VictoryGroup, VictoryTheme } from 'victory';



export class Symbol extends Component {
  static displayName = Symbol.name;

  constructor(props) {
    super(props);
    this.state = { bet: props.bet
      , symbol: props.bet.symbol
      , klines: []
      , closeTime: (props.closeTime + (props.bet.interval * 60 * 1000 * 10))
      , openTime: (props.openTime - (props.bet.interval * 60 * 1000 * 10))
      , points: [{x: props.openTime, y: props.bet.openPrice},{x: props.closeTime, y: props.bet.closePrice}] 
      , interval: props.bet.interval
    };
    this.newKline = this.newKline.bind(this);
    console.log(props.bet.interval);
  }

  async componentDidMount() {
    let response = await fetch('https://fapi.binance.com/fapi/v1/klines?symbol='+this.state.symbol+'&startTime='+this.state.openTime+'&endTime='+this.state.closeTime+'&interval='+this.state.interval+'m');
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
        <VictoryChart>
          <VictoryLabel text={this.state.symbol} x={225} y={30} textAnchor="middle"/>
          <VictoryAxis dependentAxis/>
          <VictoryCandlestick
              candleColors={{ positive: "lightgreen", negative: "pink" }}
              labels={({ datum }) => datum.label}
              labelComponent={<VictoryTooltip flyoutWidth={150}/>}
              data={this.state.klines}
            />
            
          <VictoryScatter symbol="diamond" data={this.state.points} style={{ data: { fill: "cyan", stroke: "blue", strokeWidth: 1 }}}/>
          
        </VictoryChart>
            
      </div>
    );
  }
}