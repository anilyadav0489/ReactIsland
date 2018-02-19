var axios = require('axios');

const JAVA_ISLAND_PICKER_URL = 'https://shrouded-fjord-86385.herokuapp.com/main?data=';

module.exports = {
  getIsland: function (islandsArray) {
    var requestUrl = `${JAVA_ISLAND_PICKER_URL}${islandsArray}`;
    
    return axios.get(requestUrl).then(function (res) {

      if (res.data.cod && res.data.message) {
        throw new Error(res.data.message);
      } else {
        return res.data;
      }
    }, function (res) {
      throw new Error(res.data.message);
    });
  }
}
