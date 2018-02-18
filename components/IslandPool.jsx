var React = require('react');
var Island = require('Island');

var createReactClass = require('create-react-class');

var IslandPool = createReactClass({
  getDefaultProps: function(){
    return {
      numberOfIslands: 1,
      gameState: undefined
    }
  },


  getInitialState: function () {
    var islandArray = this.props.islandArray;
    return {
      islands: []
    };
  },


  handleSetIslandArea: function (id, area) {
    var updatedIslandArray = this.props.islandArray.map((island) => {
      if(island.id === id){
        island.area = area;
      }
      return island;
    });

    this.setState({islands: updatedIslandArray});
  },

  addAreaInPlayersBucket(gameState, area, id){
    this.props.addAreaInPlayersBucket(gameState, area, id);
  },

  render: function(){
    var that = this;
    var numberOfIslands = this.props.numberOfIslands;
    var islandArray = this.props.islandArray;

    function renderPool () {
      if(numberOfIslands === 1){
          return (<div className="row">
                  <div className="columns small-centered small-12 medium-12 large-12">
                    <ul className="menu island-placement island-pool">
                      <li className="island-display">Islands will be displayed here</li>
                  </ul>
              </div>
            </div>);
      }else {
        return ( <div className="row">
                <div className="columns small-centered small-12 medium-12 large-12">
                  <ul className="menu island-placement island-pool">
                    {islandArray.map(function(island, index){
                      return (<li className="island-display" key={index}>
                                <Island key={index} id={island.id} area={island.area}
                                  mainState={that.props.mainState} readOnly={that.props.mainState.readOnly}
                                  addAreaInPlayersBucket={that.addAreaInPlayersBucket}
                                  onSetIslandArea={that.handleSetIslandArea}></Island>
                              </li>);
                      })}
                </ul>
            </div>
          </div>);
      }
    }
    return (
      <div>
        {renderPool()}
      </div>
    );
  }
});

module.exports = IslandPool;
