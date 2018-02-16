var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('Main');
//var {Route, Router, IndexRoute, hashHistory} = require('react-router');
//var Main = require('Main');
//var Timer = require('Timer');
//var Countdown = require('Countdown');

// Load foundation
require('style-loader!css-loader!foundation-sites/dist/foundation.min.css')
$(document).foundation();

// App css
require('style-loader!css-loader!sass-loader!applicationStyles')

ReactDOM.render(
  <Main/>,
  document.getElementById('mainComponent')
);
