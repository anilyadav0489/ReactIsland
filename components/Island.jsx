var React = require('react');
var createReactClass = require('create-react-class');

var Island = createReactClass({
  getInitialState: function(){
    return ({
      id:1,
      area: 1
    });
  },

  setIslandArea: function () {
    var islandID = this.props.id;
    var area = this.refs.islandRef.value;
    var island = {islandID, area};
    this.props.onSetIslandArea(islandID, area);
  },

  selectIsland: function () {
    var {gameState} = this.props;
    console.log('game state is: '+ gameState);
    if(gameState === 'playerToSelect' || gameState === 'computerToSelect'){
      this.refs.islandRef.className = "unavailable-island island-text";
    }else{
      console.log('game state didnt match');
    }
  },

  render: function(){
    var id = this.props.id;
    var area = this.props.area;

    return (
        <input type="text" ref="islandRef" placeholder="0" className="island island-text"
          onChange={this.setIslandArea} onClick={this.selectIsland}></input>
    );
  }
});

module.exports = Island;
