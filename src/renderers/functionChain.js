import { noop, get } from 'lodash';
import { methods } from '@rndm/render';

const functionChain = (input, additional) => {
  if (typeof input === 'function') return input;
  if (Array.isArray(input)) return input.map(functionChain);
  if (typeof input === 'string' && input.startsWith('$.')) {
    const [ option, or ] = input.split('||');
    const getter = option.split('.').slice(1).join('.');
    return get(additional, getter, or);
  }
  if (typeof input !== 'object' || !input.isFunc) return input;
  const { type: inType, args, execute} = input;
  const type = functionChain(inType, additional);
  const method = () => {
    try {
      return get(methods, type, noop)(...args.map(arg => functionChain(arg, additional)));
    } catch (_) {
      return noop();
    }
  };
  return Array.isArray(execute) ? method(...execute.map(arg => functionChain(arg, additional))) : method;
};

export default functionChain;
