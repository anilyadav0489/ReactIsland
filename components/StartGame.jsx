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
          <div>Enter islands area for each island above by clicking on it</div>
          <div className="center-button">
            <button className="button primary">Start The Game</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = StartGame;
