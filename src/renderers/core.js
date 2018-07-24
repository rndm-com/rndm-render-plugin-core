import React from 'react';
import { View } from 'react-native';
import { get } from 'lodash';
import { components, resolve, render } from 'rndm-render';

const Default = View;

const core = ({ type, props: { children, middleware = [], ...props } = {} } = {}) => {
  try {
    const Item = get(components, type, Default);

    const Element = (properties) => (
      typeof Item === 'function' &&
      <Item {...props} {...properties}>
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