import MethodDecoratorMiddlewave from './middleware';

export const once = () => {
  return (target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    return MethodDecoratorMiddlewave({ target, name, descriptor }, (next: () => Promise<any>, args) => {
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
