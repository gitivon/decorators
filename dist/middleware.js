"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 方法修饰器
 * 把修饰器写法换成中间件的模式去提供
 */
const MethodDecoratorMiddlewave = ({ target, name, descriptor }, fn) => {
    const attr = 'value' in descriptor ? 'value' : 'get';
    const oldValue = descriptor[attr];
    descriptor[attr] = function (...args) {
        // 注意这里不能改成箭头函数，this 指向问题
        const next = () => {
            return oldValue.apply(this, args);
        };
        return fn(next, args);
    };
    return descriptor;
};
exports.default = MethodDecoratorMiddlewave;
