var React = require('react');
var createReactClass = require('create-react-class');

var IslandWallet = createReactClass({
  render: function(){
    var header = this.props.header;
    var islandAcquired = header === 'Player A Bucket'? this.props.state.playerA: this.props.state.computer;
    return (
      <div>
        <h5>{header}</h5>
        <h1 className="area-aquired-text">{islandAcquired}</h1>
      </div>
    );
  }
});

module.exports = IslandWallet;
