import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';

const ProjectDetailsScreen = ({ route, navigation }) => {
  const {item, data } = route.params;
  const [feedback, setFeedback] = useState('');
  const [details,seDetails]=useState([])

  useEffect(()=>{
    getData()
  },[])

  const getData= async()=>{
    try {
      const response= await axios.post(`${Api.API_BACKEND}/project/getProjectByCode`,{
        code:item.projectId
      })
      
      seDetails(response.data[0])

      
    } catch (error) {
      
    }
    
  }
  console.log(details)

  const validationFeedback=()=>{
    if(feedback.trim().length==0){
      Alert.alert('Error','Feedback is empty')
      false
    }else if(feedback.trim().length<20){
      Alert.alert('info','feedback is too small add some more')
    }
    else{
      return true
    }
  }
  
  

  const submitFeedback = async () => {
    try {
      const response = await axios.post(`${Api.API_BACKEND}/project/projectsentiment`, {
        projectId: item.projectId,
        sentimentData: {
          aadharNo: data.aadharNo, 
          sentiment: feedback,
        },
        constituency:data.constituency
      });

      console.log(response.data)

      console.log(response.status)

      if (response.status === 200 || response.status===201) {
        Alert.alert('Message', response.data.message);
      } 
      
      else {
        Alert.alert("Error",response.data.message)
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    }
  };

  console.log(details)


  const showResult =()=>{
    navigation.navigate('rating',{item:item})
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.projectId}>Project ID: {details.projectId}</Text>
          <Text style={styles.projectName}>{item.projectName}</Text>
        </View>

  

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Total Budget:</Text>
            <Text style={styles.detailValue}>${details.totalBudget}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Type of Project:</Text>
            <Text style={styles.detailValue}>{details.projectType}</Text>
          </View>
          <View style={styles.detailItempro}>
            <Text style={styles.detailLabel}>Project Details:</Text>
          </View>
          <View>
            <Text style={styles.discription}>{details.projectDetails}</Text>
          </View>
        </View>

        {data.userType === 'admin' ? (
          <TouchableOpacity style={styles.submitButton} onPress={showResult}>
          <Text style={styles.submitButtonText}>Show Result</Text>
        </TouchableOpacity>
    
        ):<View style={styles.feedbackContainer}>
        <Text style={styles.feedbackLabel}>Feedback:</Text>
        <TextInput
          style={styles.feedbackInput}
          placeholder="Add your feedback here"
          multiline
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={()=>{validationFeedback() && submitFeedback()}}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>}

          
      </View>
    </ScrollView>
  );
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
    fontWeight: 'bold',
  },
  projectName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
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
    fontWeight: 'bold',
    padding: 20,
  },
  detailValue: {
    fontSize: 16,
    padding: 20,
  },
  projectDetails: {
    textAlign: 'justify',
  },
  feedbackContainer: {
    marginTop: 20,
  },
  feedbackLabel: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  discription:{
    padding:20,
  }
});

export default ProjectDetailsScreen;
