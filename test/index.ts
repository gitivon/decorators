import { once, sleep, time } from '../src';

const timeout = (t: number): Promise<void> =>
  new Promise(r => setTimeout(r, t));

const c = (target, name, desc) => {
  console.log(desc.get);
};

class A {

  @time('A')
  @once()
  get get() {
    // await timeout(2000);
    return 'get';
  }

  @time('B')
  @once()
  async asyncGet() {
    await timeout(2000);
    return 'asyncGet';
  }


}

(async () => {
  const a = new A;

  a.get;
  console.log(a.get);

  await a.asyncGet();
  console.log(await a.asyncGet());

})();