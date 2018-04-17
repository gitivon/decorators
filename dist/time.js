"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("./middleware");
const chalk_1 = require("chalk");
const tags = {};
const getTime = global.process
    ? process.uptime
    : window.performance
        ? performance.now
        : Date.now;
exports.time = (_tag) => (target, name, descriptor) => middleware_1.default({ target, name, descriptor }, next => {
    if (!tags[_tag]) {
        tags[_tag] = 0;
    }
    const tag = `${_tag}-${tags[_tag]++}`;
    const t1 = getTime();
    const r = next();
    Promise.resolve(r).then(() => {
        console.log(chalk_1.default.gray(`${tag}: ${(getTime() - t1) * 1000}`));
    });
    return r;
});
