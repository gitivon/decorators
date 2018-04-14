import { sleep } from '../src';

class A {

  @sleep(2000)
  async get() {
    return this;
  }

}

(async () => {
  console.time('A');
  const a = new A();
  await a.get();
  console.timeEnd('A');
})()