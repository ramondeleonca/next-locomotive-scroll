"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNextLocomotiveScroll = exports.NextLocomotiveScrollContext = void 0;
const react_1 = require("react");
exports.NextLocomotiveScrollContext = (0, react_1.createContext)(null);
function NextLocomotiveScroll(props) {
    const wrapperRef = (0, react_1.useRef)(null);
    const [instance, setInstance] = (0, react_1.useState)(null);
    const [ready, setReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        Promise.resolve().then(() => __importStar(require("locomotive-scroll"))).then(({ default: LocomotiveScroll }) => {
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
            Promise.resolve().then(() => __importStar(require("gsap"))).then(({ default: gsap }) => {
                Promise.resolve().then(() => __importStar(require("gsap/dist/ScrollTrigger"))).then(({ default: ScrollTrigger }) => {
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
    return (<exports.NextLocomotiveScrollContext.Provider value={{ wrapperRef, instance, ready }}>
            <div ref={wrapperRef} style={{ position: "fixed", top: "0px", minWidth: "100%", minHeight: "100%" }}>
                {props.children}
            </div>
        </exports.NextLocomotiveScrollContext.Provider>);
}
exports.default = NextLocomotiveScroll;
function useNextLocomotiveScroll() {
    return (0, react_1.useContext)(exports.NextLocomotiveScrollContext);
}
exports.useNextLocomotiveScroll = useNextLocomotiveScroll;
//# sourceMappingURL=NextLocomotiveScroll.jsx.map