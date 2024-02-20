import React from 'react';
import './App.css';
import starpowerImg from './assets/starpower.png';
import gadgetImg from './assets/gadget.png';
import hyperchargeImg from './assets/hypercharge.png';
import gearSuperRareImg from './assets/gear_super_rare.png';
import gearEpicImg from './assets/gear_epic.png';
import gearMythicImg from './assets/gear_mythic.png';
import brawlImg from './assets/brawl_stars_logo.png';

const ppNeeded = [0, 0, 20, 30, 50, 80, 130, 210, 340, 550, 890, 1440];
const coinsNeeded = [0, 0, 20, 35, 75, 140, 290, 480, 800, 1250, 1875, 2800];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pp: 0,
      coins: 0,
      level: 1,
      desiredLevel: 1,
      gadget: 0,
      starpower: 0,
      superRaregear: 0,
      epicgear: 0,
      mythicgear: 0,
      buyHypercharge: false,
      language: "english"
    };

    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.handleHyperchargeChange = this.handleHyperchargeChange.bind(this);
  }

  reset() {
    this.setState({
      pp: 0,
      coins: 0,
      level: 1,
      desiredLevel: 1,
      gadget: 0,
      starpower: 0,
      superRaregear: 0,
      epicgear: 0,
      mythicgear: 0,
      buyHypercharge: false,
      language: "english"
    });
  }

  changeLanguage() {
    if (this.state.language == "english") {
      this.setState({
        language: "chinese"
      });
    } else {
      this.setState({
        language: "english"
      });
    }
  }

  handleClick(e) {
    const level = this.state.level;
    const desiredLevel = this.state.desiredLevel;
    const pp = this.state.pp;
    const coins = this.state.coins;
    const gadget = this.state.gadget;
    const starpower = this.state.starpower;
    const superRaregear = this.state.superRaregear;
    const epicgear = this.state.epicgear;
    const mythicgear = this.state.mythicgear;
    if (e.target.id === "level-up" && level + 1 <= desiredLevel && level + 1 <= 11) {
      const newLevel = level + 1;
      const newcoins = coins - coinsNeeded[newLevel];
      const newpp = pp - ppNeeded[newLevel];
    
      this.setState(({
        coins: newcoins,
        pp: newpp,
        level: newLevel
      }));
    } else if (e.target.id === "level-down" && level - 1 >= 1) {
      const newcoins = coins + coinsNeeded[level];
      const newpp = pp + ppNeeded[level];
      const newLevel = level - 1;
    
      this.setState(({
        coins: newcoins,
        pp: newpp,
        level: newLevel
      }));
    } else if (e.target.id === "desired-level-up" && desiredLevel + 1 <= 11) {
      const newDesiredLevel = desiredLevel + 1;
      const newcoins = coins + coinsNeeded[newDesiredLevel];
      const newpp = pp + ppNeeded[newDesiredLevel];
    
      this.setState(({
        coins: newcoins,
        pp: newpp,
        desiredLevel: newDesiredLevel
      }));
    } else if (e.target.id === "desired-level-down" && desiredLevel - 1 >= level && desiredLevel - 1 > 0) {
      const newcoins = coins - coinsNeeded[desiredLevel];
      const newpp = pp - ppNeeded[desiredLevel];
      const newDesiredLevel = desiredLevel - 1;
    
      this.setState(({
        coins: newcoins,
        pp: newpp,
        desiredLevel: newDesiredLevel
      }));
    } else if (e.target.classList[0] === "gadget-group") {
      const coinObj = { Plus: 1000, Minus: -1000 };
      const gadgetObj = { Plus: 1, Minus: -1 };
      if (gadget + gadgetObj[e.target.id] < 0 || gadget + gadgetObj[e.target.id] > 2) {
        return
      }
      this.setState({
        coins: coins + coinObj[e.target.id],
        gadget: gadget + gadgetObj[e.target.id]
      })
    } else if (e.target.classList[0] === "starpower-group") {
      const coinObj = { Plus: 2000, Minus: -2000 };
      const starpowerObj = { Plus: 1, Minus: -1 };
      if (starpower + starpowerObj[e.target.id] < 0 || starpower + starpowerObj[e.target.id] > 2) {
        return
      }
      this.setState({
        coins: coins + coinObj[e.target.id],
        starpower: starpower + starpowerObj[e.target.id]
      })
    } else if (e.target.classList[0] === "superRareGear-group") {
      const coinObj = { Plus: 1000, Minus: -1000 };
      const gearObj = { Plus: 1, Minus: -1 };
      if (superRaregear + gearObj[e.target.id] < 0 || superRaregear + gearObj[e.target.id] > 6) {
        return
      }
      this.setState({
        coins: coins + coinObj[e.target.id],
        superRaregear: superRaregear + gearObj[e.target.id]
      })
    } else if (e.target.classList[0] === "epicGear-group") {
      const coinObj = { Plus: 1500, Minus: -1500 };
      const gearObj = { Plus: 1, Minus: -1 };
      if (epicgear + gearObj[e.target.id] < 0 || epicgear + gearObj[e.target.id] > 1) {
        return
      }
      this.setState({
        coins: coins + coinObj[e.target.id],
        epicgear: epicgear + gearObj[e.target.id]
      })
    } else if (e.target.classList[0] === "mythicGear-group") {
      const coinObj = { Plus: 2000, Minus: -2000 };
      const gearObj = { Plus: 1, Minus: -1 };
      if (mythicgear + gearObj[e.target.id] < 0 || mythicgear + gearObj[e.target.id] > 1) {
        return
      }
      this.setState({
        coins: coins + coinObj[e.target.id],
        mythicgear: mythicgear + gearObj[e.target.id]
      })
    }
  }   

  handleHyperchargeChange(e) {
    this.setState({ buyHypercharge: e.target.checked });
    if (e.target.checked) {
      this.setState(prevState => ({
        coins: prevState.coins + 5000
      }));
    } else {
      this.setState(prevState => ({
        coins: prevState.coins - 5000
      }));
    }
  }

  render() {
    return (
      <div id="App" className="App container-fluid">
        <div class="row mt-2"><img id="brawl-logo" src={brawlImg} alt="brawl-stars-logo"></img></div>
        <div className="row">
          <p className="col-6">{this.state.language === "english" ? "Current Level" : "當前等級"}</p>
          <p className="col-6">{this.state.language === "english" ? "Current Level" : "目標等級"}</p>
        </div>
        <div className="row">
          <div className="col-2"><i id="level-down" onClick={this.handleClick} className="fa fa-arrow-circle-down" aria-hidden="true"></i></div>
          <div className="col-2"><p>{this.state.level}</p></div>
          <div className="col-2"><i id="level-up" onClick={this.handleClick} className="fa fa-arrow-circle-up" aria-hidden="true"></i></div>
          <div onClick={this.handleClick} className="col-2"><i id="desired-level-down" onClick={this.handleClick} className="fa fa-arrow-circle-down" aria-hidden="true"></i></div>
          <div className="col-2"><p>{this.state.desiredLevel}</p></div>
          <div onClick={this.handleClick} className="col-2"><i id="desired-level-up" onClick={this.handleClick} className="fa fa-arrow-circle-up" aria-hidden="true"></i></div>
        </div>
        <div className="row">
          <div className="col-6">
            <p id="coin"><img class="pp-img" src={gadgetImg}></img><i onClick={this.handleClick} id="Minus" class="gadget-group fa fa-minus-circle" aria-hidden="true"></i> {this.state.gadget} <i onClick={this.handleClick} id="Plus" class="gadget-group fa fa-plus-circle" aria-hidden="true"></i></p>
            <p id="coin"><img class="pp-img" src={starpowerImg}></img><i onClick={this.handleClick} id="Minus" class="starpower-group fa fa-minus-circle" aria-hidden="true"></i> {this.state.starpower} <i onClick={this.handleClick} id="Plus" class="starpower-group fa fa-plus-circle" aria-hidden="true"></i></p>
            <div className="row" style={{ alignItems: 'center' }}>
            <img class="pp-img" src={hyperchargeImg}></img>
              <label className="switch">
                <input type="checkbox" checked={this.state.buyHypercharge} onChange={this.handleHyperchargeChange} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="col-6">
            <p id="coin"><img class="pp-img" src={gearSuperRareImg}></img><i onClick={this.handleClick} id="Minus" class="superRareGear-group fa fa-minus-circle" aria-hidden="true"></i> {this.state.superRaregear} <i onClick={this.handleClick} id="Plus" class="superRareGear-group fa fa-plus-circle" aria-hidden="true"></i></p>
            <p id="coin"><img class="pp-img" src={gearEpicImg}></img><i onClick={this.handleClick} id="Minus" class="epicGear-group fa fa-minus-circle" aria-hidden="true"></i> {this.state.epicgear} <i onClick={this.handleClick} id="Plus" class="epicGear-group fa fa-plus-circle" aria-hidden="true"></i></p>
            <p id="coin"><img class="pp-img" src={gearMythicImg}></img><i onClick={this.handleClick} id="Minus" class="mythicGear-group fa fa-minus-circle" aria-hidden="true"></i> {this.state.mythicgear} <i onClick={this.handleClick} id="Plus" class="mythicGear-group fa fa-plus-circle" aria-hidden="true"></i></p>
          </div>
        </div>
        <div className="row buttons">
          <button id="reset" onClick={this.reset} className="btn btn-danger my-3">{this.state.language === "english" ? "Reset" : "重置"}</button>
          <button id="reset" onClick={this.changeLanguage} className="btn btn-primary my-3">{this.state.language === "english" ? "中文版(Chinese)" : "English(英文版)"}</button>
        </div>
        <div className="row">
        <p className="col-6">{this.state.language === "english" ? "Power Points Needed" : "能量點數需求"}</p>
          <p className="col-6">{this.state.language === "english" ? "Coins Needed" : "金幣數量需求"}</p>
        </div>
        <div className="row">
          <p className="col-6" id="pointsNeeded">{this.state.pp}</p>
          <p className="col-6" id="coinsNeeded">{this.state.coins}</p>
        </div>
      </div>
    );
  }
}


export default App;
