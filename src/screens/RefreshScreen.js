
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RotateAnimation from './RotateAnimation';

const RefreshScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <RotateAnimation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RefreshScreen;
