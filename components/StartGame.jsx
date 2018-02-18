var React = require('react');
var createReactClass = require('create-react-class');

var StartGame = createReactClass({
  startGame: function (e) {
    e.preventDefault();
    this.props.onStateChange('playerToSelect', true);
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
