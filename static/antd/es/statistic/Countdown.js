function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import * as moment from 'moment';
import interopDefault from '../_util/interopDefault';
import Statistic from './Statistic';
import { formatCountdown } from './utils';
var REFRESH_INTERVAL = 1000 / 30;

function getTime(value) {
  return interopDefault(moment)(value).valueOf();
}

var Countdown =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Countdown, _React$Component);

  function Countdown() {
    var _this;

    _classCallCheck(this, Countdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Countdown).apply(this, arguments));

    _this.syncTimer = function () {
      var value = _this.props.value;
      var timestamp = getTime(value);

      if (timestamp >= Date.now()) {
        _this.startTimer();
      } else {
        _this.stopTimer();
      }
    };

    _this.startTimer = function () {
      if (_this.countdownId) return;
      _this.countdownId = window.setInterval(function () {
        _this.forceUpdate();
      }, REFRESH_INTERVAL);
    };

    _this.stopTimer = function () {
      var _this$props = _this.props,
          onFinish = _this$props.onFinish,
          value = _this$props.value;

      if (_this.countdownId) {
        clearInterval(_this.countdownId);
        _this.countdownId = undefined;
        var timestamp = getTime(value);

        if (onFinish && timestamp < Date.now()) {
          onFinish();
        }
      }
    };

    _this.formatCountdown = function (value, config) {
      var format = _this.props.format;
      return formatCountdown(value, _extends(_extends({}, config), {
        format: format
      }));
    }; // Countdown do not need display the timestamp


    _this.valueRender = function (node) {
      return React.cloneElement(node, {
        title: undefined
      });
    };

    return _this;
  }

  _createClass(Countdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.syncTimer();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.syncTimer();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopTimer();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Statistic, _extends({
        valueRender: this.valueRender
      }, this.props, {
        formatter: this.formatCountdown
      }));
    }
  }]);

  return Countdown;
}(React.Component);

Countdown.defaultProps = {
  format: 'HH:mm:ss'
};
polyfill(Countdown);
export default Countdown;
//# sourceMappingURL=Countdown.js.map
