import React, { Component } from 'react';
import { View, Image, Animated, Easing, Platform } from 'react-native';
import _ from 'lodash';

const getInitial = (height) => ({
  translateY: [ 0 - height * 1.4, height * 1.15 - height * 1.4, 0 - height * 1.4, height * -0.86 - height * 1.4],
  translateX: [ height, height * 0.14, height * 0.46, height * 1.34 ],
  skewY: [ '150deg','210deg' ],
  zIndex: [ 3, 2, 0, 1 ],
  components: [
    {
      key: 'bottom',
      backgroundColor: '#e72652',
      translateYOffsets: [ 0, -2, -1, -1, ]
    },
    {
      key: 'left',
      backgroundColor: '#528d8c',
      translateYOffsets: [ 0, 1, 1, 2, ]
    },
    {
      key: 'top',
      backgroundColor: '#a7b5a0',
      translateYOffsets: [ 2, 2, 3, 1, ]
    },
    {
      key: 'right',
      backgroundColor: '#404040',
      translateYOffsets: [ 0, 1, -1, 0, ]
    },
  ],
});

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.resetState(props);
  }

  componentWillReceiveProps(props) {
    this.resetState(props);
  }

  resetState(props) {
    const { height = 100 } = props;
    const half = height / 2;
    const width = half * 1.2;
    const transparency = 'e6';

    const initial = getInitial(half);

    this.state = {
      height,
      half,
      initial,
      logo: initial.components.reduce((o, i) => {
        o[i.key] = {
          width,
          height: half,
          backgroundColor: i.backgroundColor + transparency
        };
        return o
      }, {})
    };

    this.startAnimations()
  }

  startAnimations() {

    if (this.interval) clearInterval(this.interval);

    const { initial, half } = this.state;

    const range = _.range(initial.components.length);

    const ranges = initial.components.reduce((o,i, idx)=> {
      o[i.key] = {
        transform: {
          skewY: range.map(v => [ initial.skewY[(v + idx) % 2], initial.skewY[(v + idx + 1) % 2] ]),
          translateX: range.map(v => [initial.translateX[(v + idx) % 4], initial.translateX[(v + idx + 1) % 4]] ),
          translateY: range.map(v => [initial.translateY[(v + idx) % 4] + half * i.translateYOffsets[v], initial.translateY[(v + idx + 1) % 4] + half * i.translateYOffsets[(v + 1) % 4]] ),
        },
        zIndex: range.map(v => [initial.zIndex[(v + idx) % 4], initial.zIndex[(v + idx + 1) % 4]] ),
      };
      return o;
    }, {});

    let count = 0;

    const animation = (key) => {
      const duration = 1000;
      const toValue = 1;
      const inputRange = [0, 1];
      const modulus = count % 4;
      const properties = {toValue, duration};

      const values = {
        transform: Object.keys(ranges[key].transform).reduce((o,i)=>({...o, [i]: new Animated.Value(0)}),{}),
        zIndex: new Animated.Value(0),
      };

      const interpolations = {
        transform: Object.keys(ranges[key].transform).map(k => ({[k]: values.transform[k].interpolate({inputRange, outputRange: ranges[key].transform[k][modulus]})})),
        zIndex: values.zIndex.interpolate({inputRange, outputRange: ranges[key].zIndex[modulus]}),
      };

      this.state.logo[key] = {...this.state.logo[key], ...interpolations};

      return Animated.parallel([
        ...Object.values(values.transform).map(v => Animated.timing(v, properties)),
        Animated.timing(values.zIndex, {toValue, duration: duration / 2}),
      ])
    };

    const animate = () => {
      const animations = initial.components.map(i => animation(i.key));
      this.setState(this.state);
      Animated.parallel(animations).start(() => {
        count++;
      });
    }

    this.interval = setInterval(animate, 2000);

    animate()
  }

  render = () => {
    const Animation = (
      <View>
        <Animated.View style={this.state.logo.top}/>
        <Animated.View style={this.state.logo.left}/>
        <Animated.View style={this.state.logo.right}/>
        <Animated.View style={this.state.logo.bottom}/>
      </View>
    );

    const style = {width:  this.state.height * 1.2 * 1.1, height: this.state.height * 1.2};

    return (
      <View style={style}>{
        ['ios', 'web'].includes(Platform.OS) ?
          Animation :
          <Image
            style={style}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/rndm-com.appspot.com/o/rndm_200.png?alt=media&token=ca705331-6963-4287-9687-bc526feb0226'
            }} />
      }
      </View>
    )
  }
}
