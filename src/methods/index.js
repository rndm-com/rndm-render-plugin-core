import generate from './utils/generate';
import concatenate from './concatenate';
import or from './or';
import and from './and';
import renderItem from './renderItem';

const methods = [
  {
    type: 'renderItem',
    value: renderItem,
  },
  {
    type: 'Number.parseFloat',
    value: (input, defaultValue = Number.NaN) => Number.parseFloat(input) || defaultValue,
  },
  {
    type: 'Number.parseInt',
    value: (input, defaultValue = Number.NaN) => Number.parseInt(input) || defaultValue,
  },
  {
    type: 'Logical.or',
    value: or,
  },
  {
    type: 'Logical.and',
    value: and,
  },
  {
    type: 'log',
    value: console.log,
  },
  {
    type: 'concatenate',
    value: concatenate,
  },
  ...generate(Math, 'Math'),
];

export default methods;
