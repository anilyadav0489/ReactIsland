var React = require('react');
var createReactClass = require('create-react-class');
var IslandCountSetter = require('IslandCountSetter');
var IslandPool = require('IslandPool');

var islandArray = [];
var IslandStore = createReactClass({

  getInitialState: function(){
    return {
      gameState: 'totalIslandsToBeDecided',
    }
  },

  handleSetIslandArea: function(id, area){
    this.props.onSetIslandArea(id, area);
  },

  handleUserSelectedTotalCount: function (totalIslandsCount) {
    this.props.onUserSelectedTotalCount(totalIslandsCount);
  },

  handleIslandSelection: function(id) {
    this.props.onIslandSelection(id);
  },

  render: function(){
    return (
      <div>
        <IslandCountSetter gameState={this.props.mainState.gameState} onUserSelectedTotalCount={this.handleUserSelectedTotalCount}/>
        <IslandPool ref="poolComponent" mainState={this.props.mainState} onSetIslandArea={this.handleSetIslandArea}
          onIslandSelection={this.handleIslandSelection} />
      </div>

    );
  }
});

module.exports = IslandStore;
