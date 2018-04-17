import n from './middleware';
import chalk from 'chalk';

const tags: {
  [props: string]: any;
} = {};

const getTime = global.process
  ? process.uptime
  : window.performance
    ? performance.now
    : Date.now;

export const time = (_tag: string) => (
  target: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor =>
  n({ target, name, descriptor }, next => {
    if (!tags[_tag]) {
      tags[_tag] = 0;
    }
    const tag = `${_tag}-${tags[_tag]++}`;
    const t1 = getTime();
    const r = next();
    Promise.resolve(r).then(() => {
      console.log(chalk.gray(`${tag}: ${(getTime() - t1) * 1000}`));
    });
    return r;
  });
