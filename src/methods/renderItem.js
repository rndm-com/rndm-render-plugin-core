import { merge, zipObjectDeep } from 'lodash';
import { render } from '@rndm/render';

const renderItem = (layout = { type: 'react-native.View' }, key = 'item') => (object) => {
  const item = object[key];
  const keys = Object.keys(item);
  const values = Object.values(item);
  const toMerge = zipObjectDeep(keys, values);
  const input = merge({}, layout, toMerge);
  try {
    return render(input);
  }catch (_) {
    return null;
  }
};

export default renderItem;
