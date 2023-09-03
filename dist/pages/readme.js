"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const NextLocomotiveScroll_1 = tslib_1.__importDefault(require("../components/NextLocomotiveScroll"));
const react_1 = tslib_1.__importDefault(require("react"));
function Readme() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(NextLocomotiveScroll_1.default, { options: {
                lerp: 0.133
            }, gsap: true },
            react_1.default.createElement("div", null, "Lorem ipsum dolor sit, amet consectetur adipisicing elit."))));
}
exports.default = Readme;
//# sourceMappingURL=readme.js.map