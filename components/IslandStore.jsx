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
      islandArray,
      availableIslands: undefined
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
      gameState: gameState,
      availableIslands: totalIslandsCount
    });

    this.props.onStateChange(gameState);
  },

  addAreaInPlayersBucket: function(gameState, area) {
    if(this.state.availableIslands != 0){
      this.state.availableIslands = +this.state.availableIslands -1;
    }
    this.props.addAreaInPlayersBucket(gameState, area, this.state.availableIslands);
  },

  render: function(){
    var numberOfIslands = this.state.totalIslands;
    return (
      <div>
        <IslandCountSetter gameState={this.state.gameState} onSetTotalIslands={this.handleSetTotalIslands}/>
        <IslandPool gameState={this.props.state.gameState}
          addAreaInPlayersBucket={this.addAreaInPlayersBucket}
          islandArray={islandArray} numberOfIslands={numberOfIslands}/>
      </div>

    );
  }
});

module.exports = IslandStore;
