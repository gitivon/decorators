import MethodDecoratorMiddlewave from './middleware';

export const once = () => {
  return (target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    return MethodDecoratorMiddlewave({ target, name, descriptor }, function (next: () => Promise<any>, args) {
      const key = Symbol.for(name);
      const argKey = JSON.stringify(args);
      // @ts-ignore
      if (!this[key]) {
        // @ts-ignore
        this[key] = new Map();
      }
      // @ts-ignore
      if (!this[key].has(argKey)) {
        // @ts-ignore
        this[key].set(argKey, next());
      }
      // @ts-ignore
      return this[key].get(argKey);
    });
  };
};
