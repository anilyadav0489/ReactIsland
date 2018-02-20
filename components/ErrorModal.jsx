var React = require('react');
var createReactClass = require('create-react-class');

var ErrorModal = createReactClass({
  getDefaultProps: function () {
    return {
      title: 'Error'
    };
  },

  componentDidMount: function () {
    var modal = new Foundation.Reveal($('#error-modal'));
    modal.open();
  },
  render: function () {
    var {title, message} = this.props;

    return (
      <div id="error-modal" className="reveal large text-center shadow-bottom" data-reveal="">
        <h4>{title}</h4>
        <p>{message}</p>
        <p>
          <button className="button hollow expanded" data-close="">
            Okay
          </button>
        </p>
      </div>
    );
  }
});

module.exports = ErrorModal;
