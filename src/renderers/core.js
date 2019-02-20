import React from 'react';
import { View } from 'react-native';
import { get, merge } from 'lodash';
import { components, resolve, render } from '@rndm/render';

const Default = View;

const applyFunctions = props => Object.keys(props).reduce((o,i) => ({
  ...o,
  [i]: typeof props[i] === 'object' ? render(props[i], 'RNDM.functionChain') : props[i],
}),{});

const core = ({ type, props: { children, middleware = [], ...props } = {} } = {}) => {
  try {
    const Item = get(components, type, Default);

    const functional = applyFunctions(props);

    const Element = (properties) => {
      if (typeof Item !== 'function' && !(typeof Item === 'object' && Item['$$typeof'])) return null;
      const additionalFunctional = applyFunctions(properties);
      const merged = merge({}, functional, additionalFunctional, { children: render(additionalFunctional.children || children) || undefined });
      return (
        <Item {...merged} />
      );
    };

    const Resolved = resolve(middleware)(Element);

    return (
      <Resolved />
    );
  } catch (e) {
    return null
  }
};

export default core;
