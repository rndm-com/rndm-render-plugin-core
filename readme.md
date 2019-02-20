# RNDM Render Plugin: Core

## About

This plugin provides the core functionality for the [RNDM Render package](https://github.com/rndm-com/rndm-render).

_**Please Note**: This plugin is also contained within the [Core Preset](https://github.com/rndm-com/rndm-render-preset-core) package, which also includes other functionality such as React Native components and lodash methods. If you are looking to get started, we highly recommend the [RNDM Client](https://github.com/rndm-com/rndm-client) which includes the standard [RNDM Render](https://github.com/rndm-com/rndm-render) and the core plugin._

## Installation

If you have not already done so, then please ensure you have installed the [RNDM Render](https://github.com/rndm-com/rndm-render) package.

### From NPM

```sh
npm install --save @rndm/render-plugin-core
```

### Post Installation

In order to allow this plugin to work, it must first be included in your project. You can do this inside your main index file:

```javascript
import '@rndm/render-plugin-core';
```

## Usage

The Core Plugin comes with a suite renderers, methods and components.

### Components

#### Logo

This is a helpful Animated RNDM Logo Component. If you would like to include this in your project, you can do so by running the below JSON through the RNDM Render function:

```javascript
import { render } '@rndm/render';
import '@rndm/render-plugin-core';

const component = {
    type: 'RNDM.Logo',
};

export default () => render(component);

```

##### Props:

_**height**_
**type**: Number
**state***: Optional
**default**: 100

#### Renderer

This is a helpful sub rendering component that will allow you to define additional renderables.

```javascript
import { render } '@rndm/render';
import '@rndm/render-plugin-core';

const component = {
    type: 'RNDM.Renderer',
    props: {
        layout: {
            type: 'RNDM.Logo',
        },
    },
};

export default () => render(component);

```

##### Props:

_**layout**_
**type**: JSON Component
**state***: Optional
**default**: null

### Methods

#### Logical.or

**Example**

```javascript
{
    type: 'RNDM.Logical.or',
    isFunc: true,
    args: [
        true,
        false,
        true,
    ],
}

// the result would be: true

```

#### Logical.and

**Example**

```javascript
{
    type: 'RNDM.Logical.and',
    isFunc: true,
    args: [
        true,
        false,
        true,
    ],
}

// the result would be: false

```

#### log

**Example**

```javascript
{
    type: 'RNDM.log',
    isFunc: true,
    args: [
        "test",
    ],
}

// This will log out 'test'

```

#### concatenate

**Example**

```javascript
{
    type: 'RNDM.Number.parseInt',
    isFunc: true,
    args: [
        "10",
    ],
}

// the result would be: 10

```

#### Number Methods

* [Number.parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)
* [Number.parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)


**Example**

```javascript
{
    type: 'RNDM.Number.parseInt',
    isFunc: true,
    args: [
        "10",
    ],
}

// the result would be: 10

```

#### Math Methods

For full details check out the [Math Reference Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math). Includes the following methods:

* Math.abs
* Math.acos
* Math.acos
* Math.asinh
* Math.atan
* Math.atan2
* Math.atanh
* Math.cbrt
* Math.ceil
* Math.clz32
* Math.cos
* Math.cosh
* Math.exp
* Math.expm1
* Math.floor
* Math.fround
* Math.hypot
* Math.imul
* Math.log
* Math.log1p
* Math.log2
* Math.log10
* Math.max
* Math.min
* Math.pow
* Math.random
* Math.round
* Math.sign
* Math.sin
* Math.sinh
* Math.sqrt
* Math.tan
* Math.tanh
* Math.trunc

**Example**

```javascript
{
    type: 'RNDM.Math.abs',
    isFunc: true,
    args: [
        -1,
    ],
}

// the result would be: 1

```

### Renderers

#### Core (default renderer)

The Core renderer is the default renderer that takes well formed JSON/ JavaScript objects and turns them into fully formed applications. An Example of this could be the below static JSON:

{
    type: 'RNDM.Logo'
}

This will create a RNDM Logo component. However, more complex elements can be constructed to create full pages, views and methods complete with full functionality!

A pseudo-code version of a more complex object might look like the below:

```javascript
{
  type: 'react-native.View',
    props: {
  style: {
    width: 100,
      height: 100,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
  },
  children: [
    {
      type: 'react-native.Text',
      props: {
        style: {
          color: 'white',
        },
        children: "#ff0034",
      },
    },
    {
      type: 'react-native.View',
      props: {
        style: {
          color: '#ffffff',
        },
        children: "World",
      },
    },
  ]
};
```

As you can note from the above, Children can be passed in as objects, arrays of text items and will be handled accordingly.

#### Function Chain

This renderer can be used to determine the output of a chain of functions providing the end result.

Check out the [Playground](https://www.rndm.com/playground) page to see how these features work.
