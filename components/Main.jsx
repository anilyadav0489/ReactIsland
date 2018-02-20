var React = require('react');
var createReactClass = require('create-react-class');

var IslandStore = require('IslandStore');
var IslandWallet = require('IslandWallet');
var Message = require('Message');
var ErrorModal = require('ErrorModal');
var islandPicker = require('islandPicker');

var Main = createReactClass({
  getInitialState: function () {
    return {
      readOnly: false,
      gameState: 'totalIslandsToBeDecided',
      playerA: 0,
      computer: 0,
      leftBoundary: 0,
      rightBoundary: 0,
      islands: [],
      availableIslands: []
    }
  },

  handleUserSelectedTotalCount: function(totalIslandsCount){
    var islands = [];
    for(var i=1; i<=totalIslandsCount; i++) {
       islands.push({
         id: i,
         area: 0,
         isAvailable: true
       });
    }

    //update new_state for user to enter areas in circles
    var gameState = 'enterIslandsArea';

    //update initial boundary values
    var leftBoundary = 1;
    var rightBoundary = totalIslandsCount;

    this.setState({
      ...this.state,
      gameState,
      leftBoundary,
      rightBoundary,
      islands: islands,
      availableIslands: islands
    });
  },

  handleStateChange: function (newGameState, totalIslands, readOnly) {
    console.log('New game state received: '+ newGameState);
    var leftBoundary = this.state.leftBoundary;
    var rightBoundary = this.state.rightBoundary;

    if(totalIslands != 0){
      leftBoundary = 1;
      rightBoundary = totalIslands;
    }

    this.setState({
      ...this.state,
      readOnly,
      gameState: newGameState,
      leftBoundary,
      rightBoundary
    });

    console.log('setting new state to: ' + this.state.gameState);
  },

  //this will update islands and available_islands while user is entering area in island circles
  handleSetIslandArea: function(id, area){
    var islands = this.state.islands;
    var updatedIslands = islands.map((island) => {
      if(island.id === id){
        island.area = area;
      }
      return island;
    });

    this.setState({
      ...this.state,
      islands: updatedIslands,
      availableIslands: updatedIslands
    });
  },

  componentDidUpdate(prevProps, prevState){
    if(prevState.gameState === 'playerToSelect'){
      //call AI to pick best in the remaining islands
      this.pickTheBestIsland();
    }
    console.log("Did update" + prevState.gameState);
  },

  handleIslandSelection: function(id) {
    var {playerA, computer, leftBoundary, rightBoundary, gameState, islands, availableIslands} = this.state;
    var newGameState;

    //mark selected island as unavailable
    islands = islands.map(function(island){
      if(island.id === id){
        island.isAvailable = false;
        island.isPicked = true;
      }
      return island;
    });


    //get selected island as object
    var selectedIslandObjectArray = availableIslands.filter(function(island){
      return id === island.id;
    });
    var selectedIsland = selectedIslandObjectArray[0];

    //remove selected island from available islands
    availableIslands = availableIslands.filter(function(island){
      return id != island.id;
    });

    if(gameState === 'playerToSelect'){
      //add Area in player's Bucket
      playerA = +playerA + +selectedIsland.area;

      //update boundary
      if(id === leftBoundary){
        leftBoundary++;
      }else if(id === rightBoundary){
        rightBoundary--;
      }

      //update new game state
      newGameState = availableIslands.length > 0 ? 'computerToSelect' : 'GameOver';

      //update Main component state

      this.setState({
        ...this.state,
        playerA,
        gameState: newGameState,
        leftBoundary,
        rightBoundary,
        availableIslands
      });

    } else if(gameState === 'computerToSelect'){ //handle it carefully
      //add Area in computer's Bucket
      computer = +computer + +selectedIsland.area;

      //update boundary
      if(id === leftBoundary){
        leftBoundary++;
      }else if(id === rightBoundary){
        rightBoundary--;
      }

      //update new game state
      newGameState = availableIslands.length > 0 ? 'playerToSelect' : 'GameOver';

      //update Main component state
      this.setState({
        ...this.state,
        computer,
        gameState: newGameState,
        leftBoundary,
        rightBoundary,
        availableIslands
      });
    }
  },

  pickTheBestIsland: function(){
    var that = this;
    var {availableIslands, leftBoundary, rightBoundary} = this.state;

    islandPicker.getIsland(stringify(this.state.availableIslands)).then(function(returnedIndex) {
      var indexToConsider = returnedIndex === 0 ? leftBoundary : rightBoundary;
      that.handleIslandSelection(indexToConsider);
    }, function (errorMessage){
      alert('Error occured: '+ errorMessage);
    });

    function stringify(islands){
      var str = '';
      islands.forEach(function(island){
        str = str + island.area + ",";
      });
      str = str.substring(0, str.length-1);
      return str;
    }

  },


  render: function(){

    function renderError () {
      var showError = true;
      var errorMessage = "Welcome to the 'Pick the Best' game." +
      "\n In this game you will play against computer " +
      "and one who picks larger islands will win the game.";
      if (showError === true && typeof errorMessage === 'string') {
        return (
          <ErrorModal message={errorMessage}/>
        )
      }
    }

    return (
      <div>
        <div className="page-header">
          <h3 className="header-text">Pick and Play</h3>
        </div>
        <div className="row">
          <div className="columns small-centered medium-10 large-12 ">
            <div className="top-bar mainBody">
              <div className="top-bar-left">
                <ul className="menu">
                  <li className="wallet-Component">
                    <IslandWallet state={this.state} header="Player A Bucket"/>
                  </li>
                  <li>
                    <div className="store-Component">
                      <IslandStore ref="storeComponent" onIslandSelection={this.handleIslandSelection}
                        onSetIslandArea={this.handleSetIslandArea} mainState={this.state} onUserSelectedTotalCount={this.handleUserSelectedTotalCount}/>
                    </div>
                    <div className="message-Component">
                      <Message mainState={this.state} onStateChange={this.handleStateChange}/>
                    </div>
                  </li>
                  <li className="wallet-Component">
                    <IslandWallet state={this.state} header="Computer's Bucket"/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>




    );
  }
});

module.exports = Main;
