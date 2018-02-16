var React = require('react');
var createReactClass = require('create-react-class');

var Island = createReactClass({
  getInitialState: function(){
    return ({
      id:1,
      area: 1,
      readOnly: false,
      isAvailable: true
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
    var area = this.refs.islandRef.value;
    console.log('game state is: '+ gameState);
    if((gameState === 'playerToSelect' || gameState === 'computerToSelect' || gameState === 'GameOver')
      && (this.state.isAvailable === true)){
      this.refs.islandRef.className = "unavailable-island island-text";
      this.state.readOnly = true;
      this.state.isAvailable = false;
      this.props.addAreaInPlayersBucket(gameState, area);
    }else if (this.state.isAvailable === true){
      this.refs.islandRef.className = "square-island";
    }
  },

  updateStyle: function () {
    var {gameState} = this.props;
    console.log('game state is: '+ gameState);
    if(gameState === 'playerToSelect' || gameState === 'computerToSelect' || gameState === 'GameOver'){
      this.state.readOnly = true;
    }else{
      this.refs.islandRef.className = "square-island";
    }
  },

  updateStyleToNormal: function () {
    var {gameState} = this.props;
    console.log('game state is: '+ gameState);
    if(gameState === 'playerToSelect' || gameState === 'computerToSelect' || gameState === 'GameOver'){
      this.state.readOnly = true;
    }else{
      this.refs.islandRef.className = "island island-text";
    }
  },

  render: function(){
    var id = this.props.id;
    var area = this.props.area;

    return (
        <input type="text" ref="islandRef" placeholder="0" className="island island-text" readOnly={this.state.readOnly}
          onChange={this.setIslandArea} onClick={this.selectIsland} onBlur={this.updateStyleToNormal} onFocus={this.updateStyle}></input>
    );
  }
});

module.exports = Island;
