import React, { useEffect ,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { setHeight } from '../utils';
import axios from 'axios';
import { Api } from '../constants';
import { Alert } from 'react-native';
import { useRef } from 'react';
import LottieView from 'lottie-react-native';

const ViewResultScreen = ({navigation,route}) => {

  const {item} =route.params || {}

  const [load,setLoad]=useState(false)
  
  const animation = useRef(null);


  const [data1, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${Api.API_BACKEND}/project/sentimentResult`, {
        projectId: item.projectId
      });
      if(response.data[0].sentimentData==null){
        setLoad(true)

        return
      }
      
        setData(response.data[0].sentimentData);
     
    } catch (error) {
      // console.error('Error fetching data:', error);
      setLoad(true)
      Alert.alert("Info","No feedback is added")
      // navigation.goBack();
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

  let x=data[0].value + data[1].value
  if(x==0){
    x=1
  }
  


  console.log(data1)
 

  return  data1.length  || load ?(
    <View style={styles.container}>
    <View style={styles.chart}>
      <View style={[styles.bar, { height: setHeight(data[0].value*100/(x)) }]} ><Text style={styles.text} >Yes</Text></View>
      <View style={[styles.bar, { height: setHeight(data[1].value*100/(x)),backgroundColor:'red' }]} ><Text style={styles.text}>No</Text></View>
    </View>

      <Text style={{paddingTop:20,fontFamily:'Bold',borderTopWidth: 1, borderTopColor: 'lightgray',}}>View Result Screen</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={[styles.label, { color: item.color }]}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  ):(
    <LottieView 

    autoPlay
    ref={animation}
    style={[styles.containerload]}
      source={require('../assets/images/loading.json')}
    
    />
    

  )
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
    maxHeight:400, 
    paddingHorizontal: 10,
   
    marginBottom:20,

  },
  bar: {
    flex: 1,
    backgroundColor: '#3498db', 
    margin:20,
    alignItems:'center',
    justifyContent:'flex-end',
    maxHeight:300,
    position:'relative'
   
  },
  text:{
    top:50,
    width:60,
    textAlign:'center',
    height:40,
    fontFamily:'Regular'
    
   
  },
  containerload:{
    flex:1,
    justifyContent:"center",
  }
});

export default ViewResultScreen;
