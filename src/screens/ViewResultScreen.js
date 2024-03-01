import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { setHeight } from '../utils';

const ViewResultScreen = () => {
  const data = [
    { label: 'Yes', value: Math.floor(Math.random() * 100), color: 'green' },
    { label: 'No', value: Math.floor(Math.random() * 100), color: 'red' },
  ];

  return (
    <View style={styles.container}>
    <View style={styles.chart}>
      <View style={[styles.bar, { height: setHeight(23/2),backgroundColor:'red' }]} ><Text style={styles.text}>No</Text></View>
      <View style={[styles.bar, { height: setHeight(67/2) }]} ><Text style={styles.text} >Yes</Text></View>
    </View>

      <Text>View Result Screen</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={[styles.label, { color: item.color }]}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    marginRight: 10,
  },
  value: {
    fontWeight: 'bold',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '50%',
    height: 300, 
    paddingHorizontal: 10,
  },
  bar: {
    flex: 1,
    backgroundColor: '#3498db', 
    margin:20,
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    color:'white'
  }
});

export default ViewResultScreen;
