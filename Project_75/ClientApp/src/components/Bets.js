import React, { Component } from 'react';

export class Bets extends Component {
  static displayName = Bets.name;

  constructor(props) {
    super(props);

    let profit = Math.round(props.bets.map(bet=>bet.profit).reduce((a, b) => a + b, 0));
    let count = props.bets.length;
    let countPlus = props.bets.filter(bet=>bet.profit > 0).length;
    let countMinus = props.bets.filter(bet=>bet.profit < 0).length;
    this.state = { symbol: props.bets[0].symbol, bets: props.bets, number: props.number, profit: profit, count: count, countPlus: countPlus, countMinus: countMinus };
    this.click = this.click.bind(this);
  }

  click(){
    alert(this.state.profit);
  }


  render() {
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
