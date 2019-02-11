import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { PureComponent } from 'react';

var ScrollCollision =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ScrollCollision, _PureComponent);

  function ScrollCollision(props) {
    var _this;

    _classCallCheck(this, ScrollCollision);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScrollCollision).call(this, props));
    _this.state = {
      allBlocks: null,
      blockClass: null,
      style: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0'
      },
      originOuter: 0,
      cloneOuter: 0,
      base: 100,
      element: {
        top: 0,
        bottom: 0,
        height: 0
      }
    };

    _this.componentDidMount = function () {
      var blocks = document.querySelectorAll('[data-clippath]');

      _this.updateElement();

      _this.setState(_objectSpread({}, _this.state, {
        allBlocks: blocks,
        cloneOuter: _this.state.base
      }));

      window.addEventListener("scroll", _this.handleScroll);
    };

    _this.componentDidUpdate = function () {
      _this.updateElement();
    };

    _this.handleScroll = function (event) {
      _this.testCollision();
    };

    _this.testCollision = function () {
      var _this$state = _objectSpread({}, _this.state),
          allBlocks = _this$state.allBlocks,
          element = _this$state.element;

      for (var i = 0; i < allBlocks.length; i++) {
        var block = _this.getBlockInfos(allBlocks[i]);

        var newOrigin = 0;
        var newClone = 0;

        if (element.bottom >= block.top && element.top <= block.top && _this.isInBoundaries()) {
          newOrigin = block.top - element.bottom;
          newClone = block.top - element.top;
          return _this.updateOverlay(newOrigin, newClone, block.class);
        }

        if (element.bottom >= block.bottom && element.top <= block.bottom && _this.isInBoundaries()) {
          newOrigin = block.bottom - element.top;
          newClone = block.bottom - element.bottom;
          return _this.updateOverlay(newOrigin, newClone, block.class);
        }

        if (element.top > block.top && element.bottom < block.bottom) return _this.updateOverlay(-110, 0, block.class);
      }

      ;
      return _this.updateOverlay(0, 110, null);
    };

    _this.updateElement = function () {
      var newElem = _this.getBlockInfos(_this.wrapperRef.current);

      if (_this.state.element.top !== newElem.top || _this.state.element.bottom !== newElem.bottom) {
        var element = {
          top: newElem.top,
          bottom: newElem.bottom,
          height: newElem.bottom - newElem.top
        };

        _this.setState(_objectSpread({}, _this.state, {
          element: element
        }));
      }
    };

    _this.updateOverlay = function (origin, clone, blockClass) {
      var tempOrigin = _this.getPercent(origin);

      var tempClone = _this.getPercent(clone);

      _this.setState(_objectSpread({}, _this.state, {
        blockClass: blockClass,
        originOuter: tempOrigin,
        cloneOuter: tempClone
      }));
    };

    _this.isInBoundaries = function () {
      var _this$state2 = _objectSpread({}, _this.state),
          originOuter = _this$state2.originOuter,
          cloneOuter = _this$state2.cloneOuter,
          base = _this$state2.base;

      return originOuter <= base && originOuter >= -base && cloneOuter <= base && cloneOuter >= -base;
    };

    _this.getPercent = function (value) {
      var _this$state3 = _objectSpread({}, _this.state),
          base = _this$state3.base;

      var percent = value * base / _this.state.element.height;
      if (percent > base) percent = base;else if (percent < -base) percent = -base;
      return percent;
    };

    _this.getBlockInfos = function (elem) {
      var position = elem.getBoundingClientRect();
      var blockClass = elem.dataset ? elem.dataset.clippath : null;
      var element = {
        top: position.top,
        bottom: position.bottom,
        class: blockClass
      };
      return element;
    };

    _this.wrapperRef = React.createRef();
    return _this;
  }

  _createClass(ScrollCollision, [{
    key: "render",
    value: function render() {
      var _this$props = _objectSpread({}, this.props),
          className = _this$props.className,
          children = _this$props.children,
          style = _this$props.style;

      return React.createElement("div", {
        className: "clippath-wrapper " + className,
        ref: this.wrapperRef,
        style: style
      }, React.createElement("div", {
        className: "clippath-origin",
        style: _objectSpread({}, this.state.style, {
          overflow: 'hidden',
          transform: "translateY(" + this.state.originOuter + "%)"
        })
      }, React.createElement("div", {
        className: "clippath-inner",
        style: _objectSpread({}, this.state.style, {
          overflow: 'auto',
          transform: "translateY(" + -this.state.originOuter + "%)"
        })
      }, React.createElement("div", null, children))), React.createElement("div", {
        className: "clippath-clone " + this.state.blockClass,
        style: _objectSpread({}, this.state.style, {
          overflow: 'hidden',
          transform: "translateY(" + this.state.cloneOuter + "%)"
        })
      }, React.createElement("div", {
        className: "clippath-inner",
        style: _objectSpread({}, this.state.style, {
          overflow: 'auto',
          transform: "translateY(" + -this.state.cloneOuter + "%)"
        })
      }, React.createElement("div", null, children))));
    }
  }]);

  return ScrollCollision;
}(PureComponent);

export default ScrollCollision;