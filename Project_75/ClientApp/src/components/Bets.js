import React, { Component } from 'react';
import { VictoryGroup, createContainer, VictoryLine, VictoryScatter, VictoryChart, VictoryAxis } from 'victory';

function NewBet(bet, sum){
  return {
    x: bet.openTime
    , y: sum
    , oenTime: bet.openTime
    , closeTime: bet.closeTime
    , profit: bet.profit
    , info: `${bet.symbol}\nopen: ${bet.openPrice}\nclose: ${bet.closePrice}\n${new Date(bet.openTime).toLocaleString()}\n${new Date(bet.closeTime).toLocaleString()}\nprofit: ${bet.profit}`
  }
}



export class Bets extends Component {
  static displayName = Bets.name;

  constructor(props) {
    super(props);

    let profit = Math.round(props.bets.map(bet=>bet.profit).reduce((a, b) => a + b, 0));
    let count = props.bets.length;
    let countPlus = props.bets.filter(bet=>bet.profit > 0).length;
    let countMinus = props.bets.filter(bet=>bet.profit < 0).length;
    let sum = 0;
    let data = props.bets.map(bet=>NewBet(bet, sum += bet.profit));
    this.state = { hovered: false, data: data, symbol: props.bets[0].symbol, bets: props.bets, number: props.number, profit: profit, count: count, countPlus: countPlus, countMinus: countMinus, isChart: false };
    this.click = this.click.bind(this);
    this.leave = this.leave.bind(this);
  }

  click(){
    this.setState({ isChart: true });
  }

  leave(){
    this.setState({ isChart: false });
  }

  render() {
    if(this.state.isChart === true){
      let VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
      return(
      <tr className='tr__chart'>
        <td className='td__chart'>
          <div className='div-100'>
            <VictoryChart 
              containerComponent={
                <VictoryZoomVoronoiContainer
                  mouseFollowTooltips
                  labels={({ datum }) => datum.info}
                />
              }
            >
              <VictoryLine data={this.state.data}
                  style={{ labels: {  fontSize: "10px" } }}/>
              <VictoryAxis dependentAxis/>
            </VictoryChart>
            <div>
              <button onClick={this.leave}>Close</button>
            </div>
          </div>
        </td>
        <td className='td-0'></td>
      </tr>
      );
    }
    else{
      if(this.state.profit < 0){
        return (
        <tr className='tr__bet' onClick={this.click}>
          <td>{this.state.symbol}</td>
          <td>
            <div style={{width:"50px",height:"25px"}}>
                <VictoryLine data={this.state.data} style={{ data: { stroke: "#000000", strokeWidth: 15 } }}/>
            </div>
          </td>
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
          <td>
            <div style={{width:"50px",height:"25px"}}>
              <VictoryGroup 
              data={this.state.data}>
                <VictoryLine style={{ data: { stroke: "#000000", strokeWidth: 15 } }}/>
                <VictoryScatter />
              </VictoryGroup>
            </div>
          </td>
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
