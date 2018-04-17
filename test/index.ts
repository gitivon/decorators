import { once, sleep, time } from '../src';

const timeout = (t: number): Promise<void> =>
  new Promise(r => setTimeout(r, t));

const c = (target, name, desc) => {
  console.log(desc.get);
};

class A {

  // @time('A')
  @once()
  get(s: any, x: any, t?: any) {
    console.log('get run');
    // await timeout(2000);
    return s;
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
  const t = {o: 1};
  // const t = 'key';
  const x = 'key';

  a.get(t, x);
  await timeout(500);
  a.get(t, x);

  // console.log(a.get);

  // await a.asyncGet();
  // console.log(await a.asyncGet());

})();