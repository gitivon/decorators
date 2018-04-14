import { sleep } from '../src';

class A {

  @sleep(2000)
  get() {
    return this;
  }

}

console.time('A');
const a = new A();
a.get();
console.timeEnd('A');