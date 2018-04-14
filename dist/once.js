"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
exports.once = () => {
    return (target, name, descriptor) => {
        return middleware_1.default({ target, name, descriptor }, (next) => {
            const key = Symbol.for(name);
            if (!target[key]) {
                target[key] = next();
            }
            return target[key];
        });
    };
};
