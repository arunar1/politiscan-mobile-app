import React, { useEffect, useState,useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';
import LottieView from 'lottie-react-native'; // Import LottieView
import { useFocusEffect } from '@react-navigation/native';



const ProjectDetailsScreen = ({ route, navigation }) => {
    const [load,setLoad]=useState(false)



  const {item, data } = route.params;
  const [feedback, setFeedback] = useState('');
  const [details,seDetails]=useState([])
  const [responded,setResponded]=useState(false);
  const [result,setResult]=useState([]);
  const [feedClick,setFeedClick] = useState(false)

  const animation = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setFeedClick(false)
      };
    }, [])
  );

  

  useEffect(()=>{
    getData()
    
  },[])
  useEffect(()=>{
    checkFeedback()
  },[feedClick])

  


  const checkFeedback = async () => {
    try {
      const response = await axios.post(`${Api.API_BACKEND}/project/projectSentimentCheck`, {
        projectId: item.projectId,
        sentimentData: {
          aadharNo: data.aadharNo, 
        },
        constituency:data.constituency,
      });



      if (response.data.message==='Already Feedback added') {
        setResponded(true)
        if(response.data.details){
          setLoad(true)

          setResult(response.data.details)
        }
        
      }
      else{
        setLoad(true)
      }
      
    } catch (error) {
      // Alert.alert('Error', 'Please try again.');
    }
  };

  const getData= async()=>{
    try {
      const response= await axios.post(`${Api.API_BACKEND}/project/getProjectByCode`,{
        code:item.projectId
      })
      
      seDetails(response.data[0])

      
    } catch (error) {
      
    }
    
  }

  const validationFeedback=()=>{
    if(feedback.trim().length==0){
      Alert.alert('Error','Feedback is empty')
      false
    }else if(feedback.trim().length<20){
      Alert.alert('info','feedback is too small add some more')
    }
    else if(feedback.trim().length>60){
      Alert.alert('info','feedback is too big')
    }

    else{
      return true
    }
  }
  
  

  const submitFeedback = async () => {
    
    if(validationFeedback()){
      setFeedClick(true)
      console.log(feedback)
      try {
        const response = await axios.post(`${Api.API_BACKEND}/project/projectsentiment`, {
          projectId: item.projectId,
          sentimentData: {
            aadharNo: data.aadharNo, 
            sentiment: feedback,
          },
          constituency:data.constituency,
          projectName:item.projectName

        });
  
        console.log(response.data)

  
        console.log(response.status)
  
        if (response.status === 200 || response.status===201) {
          setFeedClick(false)
          Alert.alert('Message', response.data.message);
        } 
        
        else {
          setFeedClick(false)
          Alert.alert("Error",response.data.message)
        }
      } catch (error) {
        setFeedClick(false)
        console.error('Error submitting feedback:', error);
        Alert.alert('Error', 'Failed to submit feedback. Please try again.');
      }
    }
  };



  const showResult =()=>{
    navigation.navigate('rating',{item:item})
  }

  console.log(result.sentiment)

  console.log(load)

  return details.projectId  && load ?(
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.projectId}>Project ID: {details.projectId}</Text>
          <Text style={styles.projectName}>{item.projectName}</Text>
        </View>

  

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Total Budget </Text>
            <Text style={styles.detailValue}>${details.totalBudget}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Type of Project </Text>
            <Text style={styles.detailValue}>{details.projectType}</Text>
          </View>
          <View style={styles.detailItempro}>
            <Text style={styles.detailLabel}>Project Details</Text>
          </View>
          <View>
            <Text style={styles.discription}>{details.projectDetails}</Text>
          </View>
        </View>

        {data.userType === 'admin' ? (
          <TouchableOpacity style={[styles.submitButton,{marginTop:30}]} onPress={showResult}>
          <Text style={styles.submitButtonText}>Show Result</Text>
        </TouchableOpacity>
    
        ):responded!=true ? (
          <View style={styles.feedbackContainer}>
        <View style={styles.feedcount}><Text style={styles.feedbackLabel}>Feedback </Text>
        <Text>{`${feedback.length}/60`}</Text>
        </View>
        
        <TextInput
          style={styles.feedbackInput}
          placeholder="Add your feedback here"
          multiline
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
        />


<TouchableOpacity   style={[styles.submitButton,!feedClick? { backgroundColor: '#ccc' } : { backgroundColor: 'transparent' }]} onPress={submitFeedback}>
        {!feedClick?<Text style={{fontFamily:'Regular'}}>Submit Feedback</Text>:<LottieView
       
       autoPlay
       ref={animation}
       style={{
         width: 200,
         height: 250,
       }}
         source={require('../assets/images/loading.json')} 
       />}
        
      </TouchableOpacity>


        {/* <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity> */}
      </View>
        ):<View style={styles.responded}>
          {/* <Text>Already submitted your feedback</Text> */}
          <Text style={styles.detailLabelfeed}>Feedback</Text>
          <Text style={styles.respond}>{result.sentiment} : {result.sentimentValue==0 ? <Text>Negative</Text>:<Text>Positive</Text>}</Text>
        </View>}

          
      </View>
    </ScrollView>
  ):(<LottieView
    autoPlay
    ref={animation}
    style={[styles.containerload]}
      source={require('../assets/images/loading.json')}

  />
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  projectId: {
    fontSize: 18,
    fontFamily:'Bold'

  },
  projectName: {
    fontSize: 20,
    marginTop: 8,
    fontFamily:'Bold',
    color:'blue'


  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItempro: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily:'Bold',
    padding: 20,
  },
  detailLabelfeed:{
    fontSize: 16,
    fontFamily:'Bold',
  },
  detailValue: {
    fontSize: 16,
    padding: 20,
    fontFamily:'Italic'

  },
  projectDetails: {
    textAlign: 'justify',
    
    
  },
  feedbackContainer: {
    marginTop: 20,
  },
  feedbackLabel: {
    fontSize: 18,
    fontFamily:'Bold',
    marginBottom: 8,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:'Bold'
  },
  discription:{
    padding:20,
    fontFamily:'Italic'

  },
  responded:{
    marginTop:20,
    padding:20,

  },
  respond:{
    fontFamily:'Italic',
    backgroundColor:'#ccc',
    padding:20,
    borderRadius:20,
    marginTop:20,
  },
  feedcount:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  containerload:{
    flex:1,
    justifyContent:"center",
  }
});

export default ProjectDetailsScreen;
