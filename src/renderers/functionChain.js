import { noop, get } from 'lodash';
import { methods } from '@rndm/render';

const functionChain = (input) => {
  if (typeof input === 'function') return input;
  if (Array.isArray(input)) return input.map(functionChain);
  if (typeof input !== 'object' || !input.isFunc) return input;
  const { type, args, execute} = input;
  const method = () => {
    try {
      return get(methods, type, noop)(...args.map(functionChain));
    } catch (_) {
      return noop();
    }
  };
  return Array.isArray(execute) ? method(...execute.map(functionChain)) : method;
};

export default functionChain;
