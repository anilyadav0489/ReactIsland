var React = require('react');
var createReactClass = require('create-react-class');

var Island = createReactClass({
  getDefaultProps: function(){
    return ({
      readOnly: false,
      isPicked: false
    });
  },

  getInitialState: function(){
    return ({
      id:1,
      area: 1,
      readOnly: this.props.readOnly,
      isAvailable: true,
      isPicked: this.props.isPicked
    });
  },

  setIslandArea: function () {
    var islandID = this.props.id;
    var area = this.refs.islandRef.value;
    this.props.onSetIslandArea(islandID, area);
  },

  componentDidUpdate: function (prevProps, prevState){
    var id = prevProps.id;
    var islands = prevProps.mainState.islands;
    if(islands[id-1].isPicked === true){
      this.refs.islandRef.className = "unavailable-island island-text";
    }
  },


  selectIsland: function () {
    var {gameState, leftBoundary, rightBoundary} = this.props.mainState;
    var id = this.props.id;
    var area = this.refs.islandRef.value;

    if((gameState === 'playerToSelect' || gameState === 'computerToSelect' || gameState === 'GameOver')
      && (this.state.isAvailable === true) && (id === leftBoundary || id === rightBoundary)){
      this.refs.islandRef.className = "unavailable-island island-text";
      this.state.isAvailable = false;
      this.props.onIslandSelection(id);
    }else if (gameState === 'enterIslandsArea'){
      this.refs.islandRef.className = "square-island";
    }
  },

  updateStyle: function () {
    var {gameState} = this.props.mainState;
    if(gameState === 'enterIslandsArea'){
      this.refs.islandRef.className = "square-island";
    }
  },

  updateStyleToNormal: function () {
    var {gameState} = this.props.mainState;
    if(gameState === 'enterIslandsArea'){
      this.refs.islandRef.className = "island island-text";
    }
  },

  render: function(){
    var id = this.props.id;
    var area = this.props.area;

    return (
        <input type="text" ref="islandRef" placeholder="0" className="island island-text"
          readOnly={this.props.readOnly} onChange={this.setIslandArea}
          onClick={this.selectIsland} onBlur={this.updateStyleToNormal} onFocus={this.updateStyle}></input>
    );
  }
});

module.exports = Island;
