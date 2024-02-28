import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const RotateAnimation = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      )
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Image
      style={{ transform: [{ rotate: spin }] }}
      source={require('./path/to/your/refresh-icon.png')}
    />
  );
};

export default RotateAnimation;
