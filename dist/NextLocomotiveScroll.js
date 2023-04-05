"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = tslib_1.__importDefault(require("react"));
const gsap_1 = tslib_1.__importDefault(require("gsap"));
const ScrollTrigger_1 = tslib_1.__importDefault(require("gsap/dist/ScrollTrigger"));
class NextLocomotiveScroll extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.instance = null;
        this.container = react_1.default.createRef();
        this.state = {
            isReady: false
        };
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ ref: this.container }, { children: this.props.children })) }));
    }
    componentDidMount() {
        Promise.resolve().then(() => tslib_1.__importStar(require("locomotive-scroll"))).then(_LocomotiveScroll => {
            const container = this.container.current;
            const LocomotiveScroll = _LocomotiveScroll.default;
            const instance = new LocomotiveScroll(Object.assign(Object.assign({ smooth: true }, this.props.options), { el: container }));
            this.instance = instance;
            this.props.onInit && this.props.onInit(instance);
            this.props.gsap && this.integrateGSAP(instance, container);
            this.setState({ isReady: true });
        });
    }
    componentWillUnmount() {
        var _a;
        this.instance && ((_a = this.instance) === null || _a === void 0 ? void 0 : _a.destroy());
    }
    integrateGSAP(instance, container) {
        console.log("gsap", instance, container);
        gsap_1.default.registerPlugin(ScrollTrigger_1.default);
        instance.on("scroll", ScrollTrigger_1.default.update);
        ScrollTrigger_1.default.scrollerProxy(container, {
            scrollTop(value) {
                var _a, _b, _c;
                return value ? instance.scrollTo(value !== null && value !== void 0 ? value : 0, 0, 0) : (_c = (_b = (_a = instance === null || instance === void 0 ? void 0 : instance.scroll) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.scroll) === null || _c === void 0 ? void 0 : _c.y;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: (container === null || container === void 0 ? void 0 : container.style.transform) ? "transform" : "fixed"
        });
        ScrollTrigger_1.default.defaults({ scroller: container, start: "top top" });
        ScrollTrigger_1.default.refresh();
    }
    isReady() {
        return this.state.isReady;
    }
}
exports.default = NextLocomotiveScroll;
