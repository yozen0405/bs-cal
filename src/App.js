import React from 'react';
import './App.css';

const pointsNeeded = [20, 30, 50, 80, 130, 210, 340, 550]
const goldNeeded = [20, 35, 75, 140, 290, 480, 800, 1250]
const logo = require('./assets/brawl-logo.png');

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pp: 0,
      coins: 0,
      level: 1,
      desiredLevel: 9,
      points: 1410,
      gold: 0
    }

    this.handleClick = this.handleClick.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset () {
    this.setState({
      pp: 0,
      coins: 0,
      level: 1,
      desiredLevel: 9,
      points: 1410,
      gold: 0
    })
  }

  calculatePoints () {
    const pp = this.state.pp;
    const coins = this.state.coins;
    const level = this.state.level;
    const desiredLevel = this.state.desiredLevel;
    let points = 0;
    let gold = 0;

    for(let i = level - 1; i < desiredLevel - 1; i++) {
      points += pointsNeeded[i];
      gold += goldNeeded[i]
    }
    this.setState({
      points: points - pp,
      gold: gold - coins
    })
  }

  handleClick (e) {
    console.log(e.target.innerText)
    const level = this.state.level;
    const desiredLevel = this.state.desiredLevel;
    const pp = this.state.pp;
    const coins = this.state.coins;
    if (e.target.id === "level-up" && level + 1 < desiredLevel && level + 1 < 9) {
      this.setState({
        level: level + 1
      })
    } else if (e.target.id === "level-down" && level - 1 > 0) {
      this.setState({
        level: level - 1
      })
    } else if (e.target.id === "desired-level-up" && desiredLevel + 1 < 10) {
      this.setState({
        desiredLevel: desiredLevel + 1
      })
    } else if (e.target.id === "desired-level-down" && desiredLevel - 1 > level && desiredLevel - 1 > 1) {
      this.setState({
        desiredLevel: desiredLevel - 1
      })
    } else if (e.target.classList[1] === "pp") {
      const value = parseInt(e.target.innerText)
      if (pp + value > pointsNeeded[this.state.level - 1]) {
        return
      }
      this.setState({
        pp: pp + value
      })
    } else if (e.target.classList[1] === "coins") {
      const value = parseInt(e.target.innerText)
      this.setState({
        coins: coins + value
      })
    } else if (e.target.classList[0] === "pp-group") {
      const ppObj = { ppPlus: 1, ppMinus: -1 };
      if (pp + ppObj[e.target.id] > pointsNeeded[this.state.level - 1] || pp + ppObj[e.target.id] < 0) {
        return
      }
      this.setState({
        pp: pp + ppObj[e.target.id]
      })
    } else if (e.target.classList[0] === "coin-group") {
      const coinObj = { coinPlus: 1, coinMinus: -1 };
      if (coins + coinObj[e.target.id] < 0) {
        return
      }
      this.setState({
        coins: coins + coinObj[e.target.id]
      })
    }
  }

    render() {
      return (
        <div id="App" className="App container-fluid">
          <div class="row"><img id="brawl-logo" src="https://i.imgur.com/RSS9cDW.png" alt="brawl-stars-logo"></img></div>
          <p>Desired Level</p>
          <div class="row">
            <div onClick={this.handleClick} class="col-sm-3"><i id="desired-level-down" onClick={this.handleClick} class="fa fa-arrow-circle-down" aria-hidden="true"></i></div>
            <div class="col-sm-1"><p>{this.state.desiredLevel}</p></div>
            <div onClick={this.handleClick} class="col-sm-3"><i id="desired-level-up" onClick={this.handleClick} class="fa fa-arrow-circle-up" aria-hidden="true"></i></div>
          </div>
          <p>Current Level</p>
          <div class="row">
            <div class="col-sm-3"><i id="level-down" onClick={this.handleClick} class="fa fa-arrow-circle-down" aria-hidden="true"></i></div>
            <div class="col-sm-1"><p>{this.state.level}</p></div>
            <div class="col-sm-3"><i id="level-up" onClick={this.handleClick} class="fa fa-arrow-circle-up" aria-hidden="true"></i></div>
            
          </div>
          <p id="pp">Current Power Points: <i onClick={this.handleClick} id="ppMinus" class="pp-group fa fa-minus-circle" aria-hidden="true"></i>  {this.state.pp}/{pointsNeeded[this.state.level - 1]} <i onClick={this.handleClick} id="ppPlus" class="pp-group fa fa-plus-circle" aria-hidden="true"></i></p>
          <div id="row">
            <span onClick={this.handleClick} id="5" class="col-sm-2 pp"><img class="pp-img" src="https://i.imgur.com/615DAgg.png"></img>5</span>
            <span onClick={this.handleClick} id="10" class="col-sm-2 pp"><img class="pp-img" src="https://i.imgur.com/615DAgg.png"></img>10</span>
            <span onClick={this.handleClick} id="20" class="col-sm-2 pp"><img class="pp-img" src="https://i.imgur.com/615DAgg.png"></img>20</span>
            <span onClick={this.handleClick} id="50" class="col-sm-2 pp"><img class="pp-img" src="https://i.imgur.com/615DAgg.png"></img>50</span>
            <span onClick={this.handleClick} id="100" class="col-sm-2 pp"><img class="pp-img" src="https://i.imgur.com/615DAgg.png"></img>100</span>
          </div>
          <p id="coin">Current Coins: <i onClick={this.handleClick} id="coinMinus" class="coin-group fa fa-minus-circle" aria-hidden="true"></i> {this.state.coins} <i onClick={this.handleClick} id="coinPlus" class="coin-group fa fa-plus-circle" aria-hidden="true"></i></p>
          <div id="row">
            <span onClick={this.handleClick} class="col-sm-2 coins"><img class="gold-img" src="https://i.imgur.com/ETAyF4k.png"></img>10</span>
            <span onClick={this.handleClick} class="col-sm-2 coins"><img class="gold-img" src="https://i.imgur.com/ETAyF4k.png"></img>20</span>
            <span onClick={this.handleClick} class="col-sm-2 coins"><img class="gold-img" src="https://i.imgur.com/ETAyF4k.png"></img>50</span>
            <span onClick={this.handleClick} class="col-sm-2 coins"><img class="gold-img" src="https://i.imgur.com/ETAyF4k.png"></img>100</span>
            <span onClick={this.handleClick} class="col-sm-2 coins"><img class="gold-img" src="https://i.imgur.com/ETAyF4k.png"></img>1000</span>
          </div>
          <div class="row buttons ml-1">
          <button id="reset" onClick={this.reset} class="btn btn-danger btn-sm my-3">Reset</button>
          <button id="calculate" onClick={this.calculatePoints} class="btn btn-primary btn-sm my-3">Calculate</button>
          </div>
          <p>Points Needed</p>
          <p id="pointsNeeded">{this.state.points}</p>
          <p>Coins Needed</p>
          <p id="coinsNeeded">{this.state.gold}</p>
        </div> 
      );
    }
}

/*
<div id="App" className="App container-fluid">
          <label>Current Level</label>
          <input class="form-control" id="level" type="number" onChange={this.handleChange} min="1" max="8"></input>
          <label>Desired Level</label>
          <input class="form-control" id="desired-level" type="number" onChange={this.handleChange} min={this.state.level + 1} max="9"></input>
          <label>Current Power Points</label>
          <input class="form-control" id="pp" type="number"  onChange={this.handleChange} min="0" max={pointsNeeded[this.state.level - 1]}></input>
          <button class="btn-primary" onChange="">Calculate</button>
          <p>Points Needed</p>
          <p id="pointsNeeded">{this.state.points}</p>
        </div> 
*/

export default App;
