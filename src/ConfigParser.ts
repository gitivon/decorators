import 'reflect-metadata';
import { forEach } from 'lodash';

export const Config = (fn?: (val: string) => any): PropertyDecorator => (
  target,
  property,
): void => {
  Reflect.defineMetadata('configFn', fn, target, property);
};

export const Required = (): PropertyDecorator => (target, property): void => {
  const needCheckedProperties = Reflect.getMetadata('_required', target) || [];
  needCheckedProperties.push(property);
  Reflect.defineMetadata('_required', needCheckedProperties, target);
};

export class ConfigParseError extends Error {
  constructor(public message: string, public property: string) {
    super(message);
  }
}

export class ConfigParse {
  [key: string]: any;

  public parse(parsed: any) {
    // check required property
    const needCheckedProperties = Reflect.getMetadata('_required', this) || [];
    for (const property of needCheckedProperties) {
      if (Object.keys(parsed).indexOf(property) === -1) {
        throw new ConfigParseError(`config: ${property} undefined`, property);
      }
    }

    forEach(parsed, (val: string, key: string) => {
      const type = Reflect.getMetadata('design:type', this, key);
      if (type) {
        switch (type) {
          case String:
            this[key] = val;
            break;
          case Number:
            this[key] = parseInt(val, 10);
            break;
          case Array:
            this[key] = val.split(',');
            break;
          case Boolean:
            this[key] = !(val.toUpperCase() === 'FALSE' || val === '0');
            break;
          default:
            const fn = Reflect.getMetadata('configFn', this, key);
            if (fn) {
              this[key] = fn(val);
            } else {
              throw new ConfigParseError(
                `config: ${key} is not define fn`,
                key,
              );
            }
            break;
        }
      }
    });
  }
}
