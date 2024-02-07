import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const viewResultScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from backend API
      const response = await fetch('YOUR_BACKEND_API_URL');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Example data format: [{ label: 'Yes', value: 20 }, { label: 'No', value: 30 }]
  const pieData = data.map((item, index) => ({
    key: `pie-${index}`,
    value: item.value,
    svg: { fill: index === 0 ? 'green' : 'red' }, // Assuming Yes is represented by the first item
    arc: { outerRadius: '80%', padAngle: 0.03 },
    label: item.label,
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {data.length > 0 ? (
        <PieChart style={{ height: 200, width: 200 }} data={pieData} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default viewResultScreen;
