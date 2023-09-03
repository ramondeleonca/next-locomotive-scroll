"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNextLocomotiveScroll = exports.NextLocomotiveScrollContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
exports.NextLocomotiveScrollContext = (0, react_1.createContext)(null);
function NextLocomotiveScroll(props) {
    const wrapperRef = (0, react_1.useRef)(null);
    const [instance, setInstance] = (0, react_1.useState)(null);
    const [ready, setReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        Promise.resolve().then(() => tslib_1.__importStar(require("locomotive-scroll"))).then(({ default: LocomotiveScroll }) => {
            const instance = new LocomotiveScroll(Object.assign(Object.assign({ smooth: true }, props.options), { el: wrapperRef.current }));
            setInstance(instance);
            setReady(true);
        });
        return () => {
            instance === null || instance === void 0 ? void 0 : instance.destroy();
            setReady(false);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (ready && instance)
            Promise.resolve().then(() => tslib_1.__importStar(require("gsap"))).then(({ default: gsap }) => {
                Promise.resolve().then(() => tslib_1.__importStar(require("gsap/dist/ScrollTrigger"))).then(({ default: ScrollTrigger }) => {
                    var _a, _b;
                    gsap.registerPlugin(ScrollTrigger);
                    instance.on("scroll", ScrollTrigger.update);
                    ScrollTrigger.scrollerProxy(wrapperRef.current, {
                        scrollTop(value) {
                            var _a, _b, _c;
                            return value ? instance.scrollTo(value !== null && value !== void 0 ? value : 0, 0, 0) : (_c = (_b = (_a = instance === null || instance === void 0 ? void 0 : instance.scroll) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.scroll) === null || _c === void 0 ? void 0 : _c.y;
                        },
                        getBoundingClientRect() {
                            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                        },
                        pinType: ((_b = (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.transform) ? "transform" : "fixed"
                    });
                    ScrollTrigger.defaults({ scroller: wrapperRef.current, start: "top top" });
                    ScrollTrigger.refresh();
                });
            });
    }, [ready, instance]);
    return (react_1.default.createElement(exports.NextLocomotiveScrollContext.Provider, { value: { wrapperRef, instance, ready } },
        react_1.default.createElement("div", { ref: wrapperRef, style: { position: "fixed", top: "0px", minWidth: "100%", minHeight: "100%" } }, props.children)));
}
exports.default = NextLocomotiveScroll;
function useNextLocomotiveScroll() {
    return (0, react_1.useContext)(exports.NextLocomotiveScrollContext);
}
exports.useNextLocomotiveScroll = useNextLocomotiveScroll;
//# sourceMappingURL=NextLocomotiveScroll.js.map