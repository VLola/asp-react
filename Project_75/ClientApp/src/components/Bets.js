import React, { Component } from 'react';
import { Symbol } from "./Symbol";
import { Symbols } from "./Symbols";
import { VictoryGroup, createContainer, VictoryLine, VictoryScatter, VictoryChart, VictoryAxis,VictoryTooltip, VictoryTheme } from 'victory';

function newBet(bet, sum){
  return {
    x: bet.openTime
    , y: sum
    , symbol: bet.symbol
    , oenTime: bet.openTime
    , closeTime: bet.closeTime
    , profit: bet.profit
    , info: `${bet.symbol}\nopen: ${bet.openPrice}\nclose: ${bet.closePrice}\n${new Date(bet.openTime).toLocaleString()}\n${new Date(bet.closeTime).toLocaleString()}\nprofit: ${bet.profit}`
  }
}

function getSymbol(){
  let div = document.createElement('div').innerText = "valik";
  return(
    div
  );
}

function clickBet(bet){
  console.log(bet);
  // <h1 style={{position: "fixed"}}>{bet}</h1>
  var newWin = window.open('/klines', 'example', 'width=600,height=400');

  // alert(newWin.location.href); // (*) about:blank, загрузка ещё не началась

  newWin.onload = function() {

    // создать div в документе нового окна
    // var div = newWin.document.createElement('div'),
    //     body = newWin.document.body;


    // div.append(<Symbol symbol={bet}/>);
    // body.insertBefore(div, body.firstChild);
    
    newWin.document.body.append(getSymbol());
  }
}

const Point = ({ x, y, datum }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <circle
      cx={x}
      cy={y}
      r={3}
      onClick={() => clickBet(datum.symbol)}
      fill={hovered ? "orange" : "black"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
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
