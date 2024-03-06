import React, { useEffect ,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { setHeight } from '../utils';
import axios from 'axios';
import { Api } from '../constants';

const ViewResultScreen = ({navigation,route}) => {

  const {item} =route.params || {}
  

  const [data1, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${Api.API_BACKEND}/project/sentimentResult`, {
        projectId: item.projectId
      });
      setData(response.data[0].sentimentData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  

  useEffect(() => {
      fetchData();
  }, []);

  let positive=0;
  let negative=0


  data1.map((element)=>{
    
    if(element.sentimentValue===0){
      negative++
    }
    else if(element.sentimentValue===1){
      positive++
    }
  })




  const data = [
    { label: 'Yes', value: positive, color: 'green' },
    { label: 'No', value: negative, color: 'red' },
  ];

  return (
    <View style={styles.container}>
    <View style={styles.chart}>
      <View style={[styles.bar, { height: setHeight(data[0].value *2) }]} ><Text style={styles.text} >Yes</Text></View>
      <View style={[styles.bar, { height: setHeight(data[1].value *2),backgroundColor:'red' }]} ><Text style={styles.text}>No</Text></View>
    </View>

      <Text style={{paddingTop:20}}>View Result Screen</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  
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
