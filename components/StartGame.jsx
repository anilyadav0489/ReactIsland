var React = require('react');
var createReactClass = require('create-react-class');

var StartGame = createReactClass({
  startGame: function (e) {
    e.preventDefault();
    console.log('new state changes');
    this.props.onStateChange('playerToSelect');
  },

  render: function(){
    return (
      <div>
        <form onSubmit={this.startGame}>
          <button className="button primary">Start The Game</button>
        </form>
      </div>
    );
  }
});

module.exports = StartGame;
