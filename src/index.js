import React from 'react';
import { use } from 'rndm-render';
import methods from './methods';
import components from './components';
import renderers from './renderers';

const plugin = {
  key: 'RNDM',
  components,
  methods,
  renderers,
};

use(plugin);

export default plugin;
