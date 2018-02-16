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

  a: function (islandParam){
      console.log(islandParam);
  },

  handleSetIslandArea: function (id, area) {
    console.log(id + 'received' + area);
    var updatedIslandArray = this.props.islandArray.map((island) => {
      if(island.id === id){
        console.log('before area'+ island.area);
        island.area = area;
        console.log('after area'+ island.area);
      }else{
        console.log('initial' + island.id + ' and ' + id);
      }

      return island;
    });

    this.setState({islands: updatedIslandArray});
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
                                  gameState={that.props.gameState} onSetIslandArea={that.handleSetIslandArea}></Island>
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
