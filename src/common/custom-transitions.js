import React, { Navigator, } from 'react-native';
import buildStyleInterpolator from 'buildStyleInterpolator';

var PixelRatio = require('PixelRatio');

var PIXEL_RATIO = PixelRatio.get();

var FromTheFrontAndroid = {
  opacity: {
    from: 0,
    to: 1,
    min: 0.3,
    max: 1,
    type: 'linear',
    extrapolate: false,
    round: 1000,
  },
  transformTranslate: {
    from: {x: 0, y: 50, z: 0},
    to: {x: 0, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PIXEL_RATIO,
  }
};

var ToTheBackAndroid = {
  opacity: {
    value: 1,
    type: 'constant',
  },
};

var NoTransition = {
    opacity: {
        value: 1.0,
        type: 'constant',
    }
};

const NONE = Object.assign({}, Navigator.SceneConfigs.FadeAndroid, {
    gestures: null,
    defaultTransitionVelocity: 1000,
    animationInterpolators: {
        into: buildStyleInterpolator(NoTransition),
        out: buildStyleInterpolator(NoTransition),
    },
});

const FloatFromBottomAndroidCustom = Object.assign({}, Navigator.SceneConfigs.FadeAndroid, {
    gestures: null,
    defaultTransitionVelocity: 20,
    springFriction: 2,
    animationInterpolators: {
      into: buildStyleInterpolator(FromTheFrontAndroid),
      out: buildStyleInterpolator(ToTheBackAndroid),
    }
});

const Transitions = {
    NONE,
    FloatFromBottomAndroidCustom
};

export default Transitions;
