import React, { Component } from 'react';
import { Symbol } from "./Symbol";
import { MyWindowPortal } from "./MyWindowPortal";
import { createContainer, VictoryScatter, VictoryChart, VictoryAxis,VictoryTooltip, VictoryTheme } from 'victory';

  //     number: bet[0]
  //     symbol: bet[1]
  //     isLong: bet[2]
  //     isPositive: bet[3]
  //     openPrice: bet[4]
  //     closePrice: bet[5]
  //     openTime: bet[6]
  //     closeTime: bet[7]
  //     profit: bet[8]
  //     stopLoss: bet[9]
  //     open: bet[10]
  //     close: bet[11]
  //     interval: bet[12]

function newBet(bet, sum){
  return {
    x: bet[7]
    , y: sum
    , symbol: bet[1]
    , openTime: bet[6]
    , closeTime: bet[7]
    , openPrice: bet[4]
    , closePrice: bet[5]
    , interval: bet[12]
    , profit: bet[8]
    , info: `${bet[1]}\nopen: ${bet[4]}\nclose: ${bet[5]}\n${new Date(bet[6]).toLocaleString()}\n${new Date(bet[7]).toLocaleString()}\nprofit: ${bet[8]}`
  }
}


let Bet = ({ x, y, datum }) => {
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
    this.state = { hovered: false, stat: props.stat, isChart: false, data: null };
    this.click = this.click.bind(this);
    this.leave = this.leave.bind(this);
  }

  async click(){
    if(this.state.data == null){
      let responseBets = await fetch('bet/Find?name='+this.state.stat.name+'&number='+this.state.stat.number);
      let bets = await responseBets.json();
      let sum = 0;
      let data = bets.map(bet=>newBet(bet, sum += bet[8]));
      this.setState({ isChart: true, data: data });
    }
    else{
      this.setState({ isChart: true });
    }
  }

  leave(){
    this.setState({ isChart: false });
  }

  render(){
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
                    <Bet />
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
    else {
      if(this.state.stat.profit >= 0){
        return (
          <tr className='tr__bet' onClick={this.click}>
            <td>{this.state.stat.name}</td>
            <td>
              <img src={"data:image/png;base64,"+this.state.stat.chart}  style={{width:"50px",height:"25px"}}/>
            </td>
            <td style={{color:"green"}}>{this.state.stat.profit}</td>
            <td>{this.state.stat.win}</td>
            <td>{this.state.stat.number}</td>
            <td>{this.state.stat.stopLoss}</td>
            <td>{this.state.stat.time}</td>
            <td>{this.state.stat.count+" (+"+this.state.stat.countPlus+"/-"+this.state.stat.countMinus+")"}</td>
          </tr>
        );
      }
      else{
        return (
          <tr className='tr__bet' onClick={this.click}>
            <td>{this.state.stat.name}</td>
            <td>
              <img src={"data:image/png;base64,"+this.state.stat.chart}  style={{width:"50px",height:"25px"}}/>
            </td>
            <td style={{color:"red"}}>{this.state.stat.profit}</td>
            <td>{this.state.stat.win}</td>
            <td>{this.state.stat.number}</td>
            <td>{this.state.stat.stopLoss}</td>
            <td>{this.state.stat.time}</td>
            <td>{this.state.stat.count+" (+"+this.state.stat.countPlus+"/-"+this.state.stat.countMinus+")"}</td>
          </tr>
        );
      }
    }
    
  }

}
