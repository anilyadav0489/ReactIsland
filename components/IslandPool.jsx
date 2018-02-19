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

  handleSetIslandArea: function (id, area) {
    this.props.onSetIslandArea(id, area);
  },

  handleIslandSelection(id){
    this.props.onIslandSelection(id);
  },


  render: function(){
    var that = this;
    var numberOfIslands = this.props.mainState.islands.length;
    var islands = this.props.mainState.islands;

    function renderPool () {
      if(numberOfIslands === 0){
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

                    {islands.map(function(island, index){
                      return (<li className="island-display" key={index}>
                                <Island key={index} id={island.id} area={island.area}
                                  mainState={that.props.mainState} readOnly={that.props.mainState.readOnly}
                                  isPicked={island.isPicked} onIslandSelection={that.handleIslandSelection}
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
