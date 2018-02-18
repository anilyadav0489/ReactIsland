var React = require('react');
var createReactClass = require('create-react-class');

var IslandStore = require('IslandStore');
var IslandWallet = require('IslandWallet');
var Message = require('Message');

var Main = createReactClass({
  getInitialState: function () {
    return {
      readOnly: false,
      gameState: 'totalIslandsToBeDecided',
      playerA: 0,
      computer: 0,
      leftBoundary: 0,
      rightBoundary: 0
    }
  },

  handleStateChange: function (newGameState, totalIslands, readOnly) {
    console.log('New game state received: '+ newGameState);
    var leftBoundary = this.state.leftBoundary;
    var rightBoundary = this.state.rightBoundary;

    if(totalIslands != 0){
      leftBoundary = 1;
      rightBoundary = totalIslands;
    }

    this.setState({
      ...this.state,
      readOnly,
      gameState: newGameState,
      leftBoundary,
      rightBoundary
    });

    console.log('setting new state to: ' + this.state.gameState);
  },


  addAreaInPlayersBucket: function(gameState, area, availableIslands, id) {
    var playerA = this.state.playerA;
    var computer = this.state.computer;
    var leftBoundary = this.state.leftBoundary;
    var rightBoundary = this.state.rightBoundary;

    if(gameState === 'playerToSelect'){
      playerA = +playerA + +area;
      gameState = 'computerToSelect';
    } else if(gameState === 'computerToSelect'){
      computer = +computer + +area;
      gameState = 'playerToSelect';
    }

    if(id === this.state.leftBoundary){
        leftBoundary++;
    }else if(id === this.state.rightBoundary){
        rightBoundary--;
    }

    if(availableIslands === 0){
      gameState = 'GameOver';
    }

    this.setState({
      ...this.state,
      playerA,
      computer,
      gameState,
      leftBoundary,
      rightBoundary
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
                      <IslandStore addAreaInPlayersBucket={this.addAreaInPlayersBucket}
                        mainState={this.state} onStateChange={this.handleStateChange}/>
                    </div>
                    <div className="message-Component">
                      <Message mainState={this.state} onStateChange={this.handleStateChange}/>
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
