import React from 'react';
import { View } from 'react-native';
import { get } from 'lodash';
import { components, resolve, render } from 'rndm-render';

const Default = View;

const core = ({ type, props: { children, middleware = [], ...props } = {} } = {}) => {
  try {
    const Item = get(components, type, Default);

    const functional = Object.keys(props).reduce((o,i) => ({
      ...o,
      [i]: typeof props[i] === 'object' ? render(props[i], 'RNDM.functionChain') : props[i],
    }),{});

    const Element = (properties) => (
      typeof Item === 'function' &&
      <Item {...functional} {...properties} >
        {render(children)}
      </Item>
    );

    const Resolved = resolve(middleware)(Element);

    return (
      <Resolved />
    );
  } catch (e) {
    return null
  }
};

export default core;
