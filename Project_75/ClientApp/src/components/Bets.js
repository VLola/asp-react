import React, { Component } from 'react';
import { Symbol } from "./Symbol";
import { MyWindowPortal } from "./MyWindowPortal";
import { Symbols } from "./Symbols";
import { VictoryGroup, createContainer, VictoryLine, VictoryScatter, VictoryChart, VictoryAxis,VictoryTooltip, VictoryTheme } from 'victory';

function newBet(bet, sum){
  return {
    x: bet.openTime
    , y: sum
    , symbol: bet.symbol
    , openTime: bet.openTime
    , closeTime: bet.closeTime
    , openPrice: bet.openPrice
    , closePrice: bet.closePrice
    , interval: bet.interval
    , profit: bet.profit
    , info: `${bet.symbol}\nopen: ${bet.openPrice}\nclose: ${bet.closePrice}\n${new Date(bet.openTime).toLocaleString()}\n${new Date(bet.closeTime).toLocaleString()}\nprofit: ${bet.profit}`
  }
}

let Point = ({ x, y, datum }) => {
  let [hovered, setHovered] = React.useState(false);
  let [selected, setSelected] = React.useState(false);

  
  if(selected){
    return(
      <circle
        cx={x}
        cy={y}
        r={5}
        stroke={hovered ? "purple" : "white"}
        strokeWidth={2}
        fill={selected ? "cyan" : "magenta"}
        onClick={() => setSelected(!selected)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MyWindowPortal setSelected={setSelected}>
            <Symbol key={datum.openTime} 
            bet={datum}
            openTime={new Date(datum.openTime).getTime()} 
            closeTime={new Date(datum.closeTime).getTime()}
            />
          </MyWindowPortal>
      </circle>
    );
  }
  else{
    return (
      <circle
        cx={x}
        cy={y}
        r={5}
        stroke={hovered ? "purple" : "white"}
        strokeWidth={2}
        fill={selected ? "cyan" : "magenta"}
        onClick={() => setSelected(!selected)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    );
  }
};

export class Bets extends Component {
  static displayName = Bets.name;

  constructor(props) {
    super(props);

    let profit = Math.round(props.bets.map(bet=>bet.profit).reduce((a, b) => a + b, 0));
    let count = props.bets.length;
    let countPlus = props.bets.filter(bet=>bet.profit > 0).length;
    let countMinus = props.bets.filter(bet=>bet.profit < 0).length;
    let sum = 0;
    let data = props.bets.map(bet=>newBet(bet, sum += bet.profit));
    this.state = { hovered: false, data: data, symbol: props.symbol, bets: props.bets, number: props.number, profit: profit, count: count, countPlus: countPlus, countMinus: countMinus, isChart: false };
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
              theme={VictoryTheme.material} 
              padding={ {top: 80, bottom: 20} } 
              width={500}
              domainPadding={{ y: 50, x: 50 }}
              containerComponent={
                <VictoryZoomVoronoiContainer
                  mouseFollowTooltips
                  labels={({ datum }) => datum.info}
                  labelComponent={<VictoryTooltip flyoutPadding={{left: 20, right: 20}} center={{x:0 , y:0}}/>}
                />
              }
            >
              <VictoryScatter data={this.state.data}
                  style={{ labels: {  fontSize: "10px" } }}
                  dataComponent={
                    <Point />
                  }
                    />
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
                <VictoryLine data={this.state.data} style={{ data: { stroke: "#000000", strokeWidth: 15 } }}/>
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
