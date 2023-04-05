"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/dist/ScrollTrigger");
var NextLocomotiveScroll = /** @class */ (function (_super) {
    __extends(NextLocomotiveScroll, _super);
    function NextLocomotiveScroll(props) {
        var _this = _super.call(this, props) || this;
        _this.instance = null;
        _this.container = react_1["default"].createRef();
        _this.state = {
            isReady: false
        };
        return _this;
    }
    NextLocomotiveScroll.prototype.render = function () {
        return (<>
                <div ref={this.container}>
                    {this.props.children}
                </div>
            </>);
    };
    NextLocomotiveScroll.prototype.componentDidMount = function () {
        var _this = this;
        Promise.resolve().then(function () { return require("locomotive-scroll"); }).then(function (_LocomotiveScroll) {
            var container = _this.container.current;
            var LocomotiveScroll = _LocomotiveScroll["default"];
            var instance = new LocomotiveScroll(__assign(__assign({ smooth: true }, _this.props.options), { el: container }));
            _this.instance = instance;
            _this.props.onInit && _this.props.onInit(instance);
            _this.props.gsap && _this.integrateGSAP(instance, container);
            _this.setState({ isReady: true });
        });
    };
    NextLocomotiveScroll.prototype.componentWillUnmount = function () {
        var _a;
        this.instance && ((_a = this.instance) === null || _a === void 0 ? void 0 : _a.destroy());
    };
    NextLocomotiveScroll.prototype.integrateGSAP = function (instance, container) {
        console.log("gsap", instance, container);
        gsap_1["default"].registerPlugin(ScrollTrigger_1["default"]);
        instance.on("scroll", ScrollTrigger_1["default"].update);
        ScrollTrigger_1["default"].scrollerProxy(container, {
            scrollTop: function (value) {
                var _a, _b, _c;
                return value ? instance.scrollTo(value !== null && value !== void 0 ? value : 0, 0, 0) : (_c = (_b = (_a = instance === null || instance === void 0 ? void 0 : instance.scroll) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.scroll) === null || _c === void 0 ? void 0 : _c.y;
            },
            getBoundingClientRect: function () {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: (container === null || container === void 0 ? void 0 : container.style.transform) ? "transform" : "fixed"
        });
        ScrollTrigger_1["default"].defaults({ scroller: container, start: "top top" });
        ScrollTrigger_1["default"].refresh();
    };
    NextLocomotiveScroll.prototype.isReady = function () {
        return this.state.isReady;
    };
    return NextLocomotiveScroll;
}(react_1["default"].Component));
exports["default"] = NextLocomotiveScroll;
