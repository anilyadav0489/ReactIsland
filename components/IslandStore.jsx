var React = require('react');
var createReactClass = require('create-react-class');
var IslandCountSetter = require('IslandCountSetter');
var IslandPool = require('IslandPool');

var islandArray = [];
var IslandStore = createReactClass({

  getInitialState: function(){
    return {
      gameState: 'totalIslandsToBeDecided',
      totalIslands: 1,
      islandArray
    }
  },

  handleSetTotalIslands: function (totalIslandsCount) {
    var gameState = 'enterIslandsArea';
    islandArray = [];

    for(var i=1; i<=totalIslandsCount; i++) {
       islandArray.push({
         id: i,
         area: 0,
         isAvailable: true
       });
    }

    this.setState({
      totalIslands: totalIslandsCount,
      gameState: gameState
    });

    this.props.onStateChange(gameState);
  },

  render: function(){
    var numberOfIslands = this.state.totalIslands;
    return (
      <div>
        <IslandCountSetter gameState={this.state.gameState} onSetTotalIslands={this.handleSetTotalIslands}/>
        <IslandPool gameState={this.props.gameState} islandArray={islandArray} numberOfIslands={numberOfIslands}/>
      </div>

    );
  }
});

module.exports = IslandStore;
