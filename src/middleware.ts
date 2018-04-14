interface DecoratorProps {
  target: any;
  name?: string;
  descriptor: PropertyDescriptor;
}

/**
 * 方法修饰器
 * 把修饰器写法换成中间件的模式去提供
 */
const MethodDecoratorMiddlewave = (
  { target, name, descriptor }: DecoratorProps,
  fn: (next: () => Promise<any>) => any
) => {
  const oldValue = descriptor.value;
  descriptor.value = function(...args: any[]): Promise<any[]> {
    // 注意这里不能改成箭头函数，this 指向问题
    const next = () => {
      return oldValue.apply(this, args);
    };
    return fn(next);
  };
  return descriptor;
};

export default MethodDecoratorMiddlewave;
