var React = require('react');
var createReactClass = require('create-react-class');
var StartGame = require('StartGame');

var Message = createReactClass({

  handleStateChange: function (newState) {
    console.log('my new state'+newState);
    this.props.onStateChange(newState);
  },

  render: function(){
    var that = this;
    var gameState = this.props.gameState;
    function displayMessage (){
      console.log(gameState);
      switch (gameState){
        case 'totalIslandsToBeDecided':
          return <h5>Select number of Islands above to start the game...</h5>;
        case 'enterIslandsArea':
          return <StartGame onStateChange={that.handleStateChange}/>;
        case 'playerToSelect':
          return <h3>Player A to select</h3>;
        case 'computerToSelect':
          return <h3>Computer is selecting...</h3>;
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
