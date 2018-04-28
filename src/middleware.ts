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
  fn: (next: () => Promise<any>, args: any[]) => any
) => {
  const attr = 'value' in descriptor ? 'value' : 'get';
  const oldValue = descriptor[attr];
  descriptor[attr] = function(...args: any[]): Promise<any[]> {
    // 注意这里不能改成箭头函数，this 指向问题
    const next = () => {
      return oldValue.apply(this, args);
    };
    return fn.apply(this, [next, args]);
  };
  return descriptor;
};

export default MethodDecoratorMiddlewave;
