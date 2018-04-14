import n from './middleware';

const timeout = (t: number): Promise<void> => new Promise(r => {
  // @ts-ignore
  setTimeout(r, t); 
});

export const sleep = (t: number) => (target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor => n({target, name, descriptor}, async (next) => {
  await timeout(t);
  await next();
});

