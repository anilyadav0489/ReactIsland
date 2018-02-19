var React = require('react');
var createReactClass = require('create-react-class');

var IslandCountSetter = createReactClass({
  getDefaultProps: function () {
    totalIslandsCount: 0
  },

  selectTotalIslandsAsTwo: function (){
    if(this.props.gameState === 'totalIslandsToBeDecided'){
      this.props.onUserSelectedTotalCount(2);
    }
  },

  selectTotalIslandsAsFour: function (){
    if(this.props.gameState === 'totalIslandsToBeDecided'){
      this.props.onUserSelectedTotalCount(4);
    }
  },

  selectTotalIslandsAsSix: function (){
    if(this.props.gameState === 'totalIslandsToBeDecided'){
      this.props.onUserSelectedTotalCount(6);
    }
  },

  selectTotalIslandsAsEight: function (){
    if(this.props.gameState === 'totalIslandsToBeDecided'){
      this.props.onUserSelectedTotalCount(8);
    }
  },


  render: function () {

    return (
      <div>
        <div className="row">
          <div className="columns small-4 medium-4 large-4">
            <div>
              <span className="island-text">
                <h6 className="start-with-text">Start With ? Islands</h6>
              </span>
            </div>
          </div>
          <div className="columns small-2 medium-2 large-2">
            <div className="small-island" onClick={this.selectTotalIslandsAsTwo}>
              <span className="small-island-text">
                2
              </span>
            </div>
          </div>
          <div className="columns small-2 medium-2 large-2">
            <div className="small-island" onClick={this.selectTotalIslandsAsFour}>
              <span className="small-island-text">
                4
              </span>
            </div>
          </div>
          <div className="columns small-2 medium-2 large-2">
            <div className="small-island" onClick={this.selectTotalIslandsAsSix}>
              <span className="small-island-text">
                6
              </span>
            </div>
          </div>
          <div className="columns small-2 medium-2 large-2">
            <div className="small-island" onClick={this.selectTotalIslandsAsEight}>
              <span className="small-island-text">
                8
              </span>
            </div>
          </div>
        </div>


      </div>

    );
  }
});

module.exports = IslandCountSetter;
