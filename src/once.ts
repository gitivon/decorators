import MethodDecoratorMiddlewave from './middleware';

export const once = () => {
  return (target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    return MethodDecoratorMiddlewave({ target, name, descriptor }, (next: () => Promise<any>) => {
      const key = Symbol.for(name);
      if (!target[key]) {
        target[key] = next();
      }
      return target[key];
    });
  };
};
