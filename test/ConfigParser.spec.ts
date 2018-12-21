import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import {
  ConfigParse,
  Config,
  Required,
  ConfigParseError,
} from '../config/ConfigParse';
import { TraceType } from '../server/service/Monitor';

class MyDate {
  constructor(public start: string, public end: string) {}
}

class ConfigTest extends ConfigParse {
  @Config() public CORS!: boolean;
  @Config() public ENABLE!: boolean;
  @Config() public APP_PORT!: number;
  @Config() public TRACE!: TraceType[];
  @Config() public API_HOST!: string;
  @Config() public MAX_CACHE: number = 10;
  @Config() public AUTH = 'auth2';
  @Config() public VALID_DATE!: MyDate;
  @Config(
    (s: string): MyDate => {
      const [start, end] = s.split('-');
      return new MyDate(start, end);
    },
  )
  public DATE!: MyDate;
}

class ConfigTest2 extends ConfigParse {
  @Required() public CORS!: boolean;
  @Required() @Config() public IS_REQUIRED?: string;
}

describe('config 配置缺失', () => {
  const config = new ConfigTest2();
  let corrent = false;
  try {
    const { parsed } = dotenv.config({
      path: path.resolve(process.cwd(), 'env/.env.test'),
    });
    config.parse(parsed);
  } catch (e) {
    corrent = e instanceof ConfigParseError && e.property === 'IS_REQUIRED';
  }
  it('正确捕获缺失配置', () => {
    expect(corrent).toBeTruthy();
  });
});

describe('config 配置完整并解析', async () => {
  const config = new ConfigTest();
  let corrent: boolean = false;
  try {
    const { parsed } = dotenv.config({
      path: path.resolve(process.cwd(), 'env/.env.test'),
    });
    config.parse(parsed);
  } catch (e) {
    corrent = e instanceof ConfigParseError && e.property === 'VALID_DATE';
  }

  it('VALID_DATE should be throw an Error because not define fn', () => {
    expect(corrent).toBeTruthy();
  });

  it('API_HOST should be String', () => {
    expect(typeof config.API_HOST).toBe('string');
  });

  it('APP_PORT should be Number', () => {
    expect(typeof config.APP_PORT).toBe('number');
  });

  it('TRACE should be Array', () => {
    expect(Array.isArray(config.TRACE)).toBeTruthy();
  });

  it('MAX_CACHE should be 50 for cover default value', () => {
    expect(config.MAX_CACHE).toEqual(50);
  });

  it('DATE should be MyDate', () => {
    const date = config.DATE;
    expect(date.start).toBe('8/1');
    expect(date.end).toBe('8/31');
  });

  it('CORS should be false by FALSE', () => {
    expect(config.CORS).toBeFalsy();
  });

  it('ENABLE should be false by 0', () => {
    expect(config.ENABLE).toBeFalsy();
  });

  it("AUTH should be default value: 'auth2'", () => {
    expect(config.AUTH).toEqual('auth2');
  });
});
