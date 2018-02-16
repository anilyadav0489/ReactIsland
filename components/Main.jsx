var React = require('react');
var createReactClass = require('create-react-class');

var IslandStore = require('IslandStore');
var IslandWallet = require('IslandWallet');
var Message = require('Message');

var Main = createReactClass({
  getInitialState: function () {
    return {
      gameState: 'totalIslandsToBeDecided'
    }
  },
  handleStateChange: function (gameState) {
    this.setState({
      ...this.state,
      gameState: gameState
    });
  },
  render: function(){
    var {gameState} = this.state;
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
                    <IslandWallet header="Player A Bucket" islandAcquired="0"/>
                  </li>
                  <li>
                    <div className="store-Component">
                      <IslandStore gameState={gameState} onStateChange={this.handleStateChange}/>
                    </div>
                    <div className="message-Component">
                      <Message gameState={gameState} onStateChange={this.handleStateChange}/>
                    </div>
                  </li>
                  <li className="wallet-Component">
                    <IslandWallet header="Computer's Bucket" islandAcquired="0"/>
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
