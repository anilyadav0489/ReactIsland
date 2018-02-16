var React = require('react');
var createReactClass = require('create-react-class');

var IslandStore = require('IslandStore');
var IslandWallet = require('IslandWallet');
var Message = require('Message');

var Main = createReactClass({
  getInitialState: function () {
    return {
      gameState: 'totalIslandsToBeDecided',
      playerA: 0,
      computer: 0
    }
  },
  handleStateChange: function (newGameState) {
    this.setState({
      ...this.state,
      gameState: newGameState
    });
  },

  addAreaInPlayersBucket: function(gameState, area, availableIslands) {
    var playerA = this.state.playerA;
    var computer = this.state.computer;

    if(gameState === 'playerToSelect'){
      playerA = +playerA + +area;
      gameState = 'computerToSelect';
    } else if(gameState === 'computerToSelect'){
      computer = +computer + +area;
      gameState = 'playerToSelect';
    }

    if(availableIslands === 0){
      gameState = 'GameOver';
    }

    this.setState({
      playerA,
      computer,
      gameState
    });

  },

  render: function(){

    return (
      <div>
        <div className="page-header">
          <h3 className="header-text">Pick and Play</h3>
        </div>
        <div className="row">
          <div className="columns small-centered medium-10 large-12 ">
            <div className="top-bar mainBody">
              <div className="top-bar-left">
                <ul className="menu">
                  <li className="wallet-Component">
                    <IslandWallet state={this.state} header="Player A Bucket"/>
                  </li>
                  <li>
                    <div className="store-Component">
                      <IslandStore addAreaInPlayersBucket={this.addAreaInPlayersBucket} state={this.state} onStateChange={this.handleStateChange}/>
                    </div>
                    <div className="message-Component">
                      <Message state={this.state} onStateChange={this.handleStateChange}/>
                    </div>
                  </li>
                  <li className="wallet-Component">
                    <IslandWallet state={this.state} header="Computer's Bucket"/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>




    );
  }
});

module.exports = Main;
