import React, { Component } from 'react';
import { VictoryChart, VictoryCandlestick, VictoryLabel, VictoryAxis, VictoryTooltip, VictoryScatter, VictoryZoomContainer, VictoryTheme, Data } from 'victory';



export class Symbol extends Component {
  static displayName = Symbol.name;

  constructor(props) {
    super(props);
    this.state = { bet: props.bet
      , symbol: props.bet.symbol
      , klines: []
      , openTime: props.bet.openTime - (props.bet.interval * 60 * 1000 * 10)
      , closeTime: props.bet.closeTime + (props.bet.interval * 60 * 1000 * 10)
      , interval: props.bet.interval
      , points: [
        {
          x: props.bet.openTime
          , y: props.bet.openPrice
          , label: `openTime: ${new Date(props.bet.openTime).toLocaleString()}\nopenPrice: ${props.bet.openPrice}`
        },{
          x: props.bet.closeTime
          , y: props.bet.closePrice
          , label: `closeTime: ${new Date(props.bet.closeTime).toLocaleString()}\nclosePrice: ${props.bet.closePrice}`
        }] 
    };
    this.newKline = this.newKline.bind(this);
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
      , label: `open: ${kline[1]}\nclose: ${kline[4]}\nhigh: ${kline[2]}\nlow: ${kline[3]}\n${new Date(kline[0]).toLocaleString()}\n${new Date(kline[6]).toLocaleString()}`};
  }

  render() {
    return (
      <div>
        <VictoryChart
              theme={VictoryTheme.material} 
              padding={ {top: 80, bottom: 20} } 
              width={400}
              domainPadding={{ y: 50, x: 50 }}
            >
          <VictoryLabel text={this.state.symbol} x={225} y={30} textAnchor="middle"/>
          <VictoryAxis dependentAxis/>
          <VictoryCandlestick
              candleColors={{ positive: "lightgreen", negative: "pink" }}
              labels={({ datum }) => datum.label}
              labelComponent={<VictoryTooltip flyoutPadding={{left: 20, right: 20}} center={{x:15 , y:40}}/>}
              data={this.state.klines}
            />
            
          <VictoryScatter 
            symbol="diamond" 
            data={this.state.points} 
            
            labels={({ datum }) => datum.label}
            labelComponent={<VictoryTooltip flyoutPadding={{left: 20, right: 20}} center={{x:40 , y:40}}/>}
            style={{ data: { fill: "cyan", stroke: "blue", strokeWidth: 1 }}}
          />
          
        </VictoryChart>
            
      </div>
    );
  }
}