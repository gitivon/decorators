declare module '@gitivon/decorators' {

  type decorators = (target: any, name: string, descriptor: PropertyDescriptor) => void;

  export function once(): decorators
  export function sleep(time: number): decorators
  export function time(): decorators

}