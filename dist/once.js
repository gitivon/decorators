"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
exports.once = () => {
    return (target, name, descriptor) => {
        return middleware_1.default({ target, name, descriptor }, (next, args) => {
            const key = Symbol.for(name);
            const argKey = JSON.stringify(args);
            if (!target[key]) {
                target[key] = new Map();
            }
            if (!target[key].has(argKey)) {
                target[key].set(argKey, next());
            }
            return target[key].get(argKey);
        });
    };
};
