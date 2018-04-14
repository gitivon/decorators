declare module '@gitivon/decorators' {

  export function once(): (target: any, name: string, descriptor: PropertyDescriptor) => void;
  export function sleep(time: number): (target: any, name: string, descriptor: PropertyDescriptor) => void;

}