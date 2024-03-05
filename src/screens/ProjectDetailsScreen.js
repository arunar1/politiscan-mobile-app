import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';

const ProjectDetailsScreen = ({ route, navigation }) => {
  const {item, data } = route.params;
  console.log("`````````````````````````````````````````````````````````",data.userType)
  const [feedback, setFeedback] = useState('');

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

      if (response.status === 200) {
        Alert.alert('Feedback Submitted', response.data.message);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    }
  };


  const showResult =()=>{

  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.projectId}>Project ID: {item.projectId}</Text>
          <Text style={styles.projectName}>{item.projectName}</Text>
        </View>

  

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Total Budget:</Text>
            <Text style={styles.detailValue}>${item.totalBudget}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Type of Project:</Text>
            <Text style={styles.detailValue}>{item.projectType}</Text>
          </View>
          <View style={styles.detailItempro}>
            <Text style={styles.detailLabel}>Project Details:</Text>
          </View>
          <View>
            <Text style={styles.discription}>{item.projectDetails}</Text>
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
        <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
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
