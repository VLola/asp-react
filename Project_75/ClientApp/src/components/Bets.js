import React, { Component } from 'react';
import { VictoryBar, VictoryChart } from 'victory';
const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];
export class Bets extends Component {
  static displayName = Bets.name;

  constructor(props) {
    super(props);

    let profit = Math.round(props.bets.map(bet=>bet.profit).reduce((a, b) => a + b, 0));
    let count = props.bets.length;
    let countPlus = props.bets.filter(bet=>bet.profit > 0).length;
    let countMinus = props.bets.filter(bet=>bet.profit < 0).length;
    this.state = { symbol: props.bets[0].symbol, bets: props.bets, number: props.number, profit: profit, count: count, countPlus: countPlus, countMinus: countMinus, isChart: false };
    this.click = this.click.bind(this);
    this.leave = this.leave.bind(this);
  }

  click(event){
    this.setState({ isChart: true });
  }

  leave(){
    this.setState({ isChart: false });
  }

  render() {
    if(this.state.isChart === true){
      return(
      <tr className='tr__chart' onClick={this.leave}>
        <td className='td__chart'>
          <div className='div-100'>
            <VictoryChart>
            <VictoryBar
              data={data}
              x="quarter"
              y="earnings"
            />
          </VictoryChart>
          </div>
        </td>
        <td style={{width:"0px"}}></td>
        <td style={{width:"0px"}}></td>
        <td style={{width:"0px"}}></td>
        <td style={{width:"0px"}}></td>
        <td style={{width:"0px"}}></td>
      </tr>
      );
    }
    else{
      if(this.state.profit < 0){
        return (
        <tr className='tr__bet' onClick={this.click}>
          <td>{this.state.symbol}</td>
          <td>{this.state.number}</td>
          <td style={{color:"red"}}>{this.state.profit}</td>
          <td>{this.state.count}</td>
          <td>{this.state.countPlus}</td>
          <td>{this.state.countMinus}</td>
        </tr>
        );
      }else{
        return (
        <tr className='tr__bet' onClick={this.click}>
          <td>{this.state.symbol}</td>
          <td>{this.state.number}</td>
          <td style={{color:"green"}}>{this.state.profit}</td>
          <td>{this.state.count}</td>
          <td>{this.state.countPlus}</td>
          <td>{this.state.countMinus}</td>
        </tr>
        );
      }
    }
    
    
  }

}
