
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

import LinearGradient from 'react-native-linear-gradient';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);



const DecideDirection = dir => {
  if (dir === 'left') {
    return [width, -width];
  } else {
    return [-width, width];
  }
};


const DefineBGColor = color => {
  if (color === undefined) {
    return '#E1E9EE';
  } else {
    return color;
  }
};



const DegineHGColor = color => {
  if (color === undefined) {
    return '#F2F8FC';
  } else {
    return color;
  }
};



const DefineSpeed = speed => {
  if (speed === undefined) {
    return 1000;
  } else {
    return speed;
  }
};

const Shimmer = props => {
  const animatedValue = new Animated.Value(0);
  useEffect(() => {
    //  console.log(props);
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DefineSpeed(props.speed),
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: DecideDirection(props.direction),
  });

  return (
    <MaskedView maskElement={<>{props.children}</>}>
      <View style={styles.container}>
        <View
          style={{
            height: height,
            width: width,
            backgroundColor: DefineBGColor(props.backgroundColor),
          }}>
          <AnimatedLG
            colors={[
              DefineBGColor(props.backgroundColor),
              DegineHGColor(props.highlightColor),
              DegineHGColor(props.highlightColor),
              DefineBGColor(props.backgroundColor),
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{translateX: translateX}],
            }}
          />
        </View>
      </View>
    </MaskedView>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: '#b0b0b0',
    width: width,
    height: height,
  },
});

export default Shimmer;
