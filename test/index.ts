import { once } from '../src';

const c = (target, name, desc) => {
  console.log(desc.get);
};

class A {

  @once()
  get get() {
    console.log('run');
    return 'c';
  }

}

(async () => {
  console.time('A');
  const a = new A;
  console.log(a.get);
  console.log(a.get);
  console.timeEnd('A');
})();