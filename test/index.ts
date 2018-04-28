import { once, sleep, time } from '../src';

const timeout = (t: number): Promise<void> =>
  new Promise(r => setTimeout(r, t));

const c = (target, name, desc) => {
  console.log(desc.get);
};

class A {
  b: string;

  // @time('A')
  @once()
  static get(s: any) {
    console.log('get run', this);
    // await timeout(2000);
    return s;
  }

}

(async () => {

  A.get(1);
  A.get(1);

  // const a = new A;
  // const b = new A;
  // a.b = 'a';
  // b.b = 'b';
  // const t = 1;
  // a.get(t);
  // // await timeout(500);
  // a.get(t);
  // b.get(t);

})();