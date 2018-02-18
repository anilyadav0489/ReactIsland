var React = require('react');
var createReactClass = require('create-react-class');
var StartGame = require('StartGame');

var Message = createReactClass({

  handleStateChange: function (newState, readOnly) {
    this.props.onStateChange(newState, 0, readOnly);
  },

  render: function(){
    var that = this;
    var {gameState, playerA, computer} = this.props.mainState;

    function displayMessage (){
      switch (gameState){
        case 'totalIslandsToBeDecided':
          return <h5>Select number of Islands above to start the game...</h5>;
        case 'enterIslandsArea':
          return <StartGame onStateChange={that.handleStateChange}/>;
        case 'playerToSelect':
          return <h3>Player A to select</h3>;
        case 'computerToSelect':
          return <h3>Computer is selecting...</h3>;
        case 'GameOver':
          return playerA > computer? <h3>Player A won</h3> : (playerA === computer? <h3> Game Drawn </h3> : <h3> Computer won </h3>);
        default:
          return <h5>Select number of Islands above to start the game...</h5>;
      }
    };
    return (
      <div className="message-Component">
        {displayMessage()}
      </div>
    );
  }
});

module.exports = Message;
