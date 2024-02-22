import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const ViewResultScreen = () => {
  const data = [
    { label: 'Yes', value: Math.floor(Math.random() * 100), color: 'green' },
    { label: 'No', value: Math.floor(Math.random() * 100), color: 'red' },
  ];

  const pieData = data.map((item, index) => ({
    key: `pie-${index}`,
    value: item.value,
    svg: { fill: item.color },
    arc: { outerRadius: '100%', padAngle: 0.01 },
    label: `${item.label}  (${item.value}%)`, // Include percentage in label
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {data.length > 0 ? (
        <>
          <PieChart
            style={{ height: 300, width: 200 }}
            data={pieData}
            innerRadius="0%"
            outerRadius="80%"
          >
            <Labels />
          </PieChart>
          <View style={styles.legendContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const Labels = ({ slices }) => {
  return slices.map((slice, index) => {
    const { labelCentroid, data } = slice;
    return (
      <Text
        key={index}
        x={labelCentroid[0]}
        y={labelCentroid[1]}
        fill={'white'}
        textAnchor={'middle'}
        alignmentBaseline={'middle'}
        fontSize={16}
      >
        {data.label}
      </Text>
    );
  });
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendColorBox: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
  },
});

export default ViewResultScreen;