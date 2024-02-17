
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
const ProjectDetailsScreen = ({ route,navigation }) => {
    const { projectId, projectName } = route.params;

  const [feedback, setFeedback] = useState('');

  const submitFeedback = async () => {
    // try {
    //   const response = await axios.post('https://your-backend-api/submit-feedback', {
    //     projectId: project.projectId,
    //     feedback,
    //   });

    //   Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    // } catch (error) {
    //   console.error('Error submitting feedback:', error);
    //   Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    // }
    navigation.navigate('demo',{inputText:feedback})
  };

  const mockProject = {
    projectId: 1,
    projectName: 'Sample Project',
    totalBudget: '$500,000',
    projectType: 'Development',
    projectDetails: 'This is a sample project for demonstration .',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.projectId}>Project ID: {projectId}</Text>
        <Text style={styles.projectName}>{projectName}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total Budget:</Text>
          <Text style={styles.detailValue}>{mockProject.totalBudget}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Type of Project:</Text>
          <Text style={styles.detailValue}>{mockProject.projectType}</Text>
        </View>

        <View style={styles.detailItempro}>
          <Text style={styles.detailLabel}>Project Details</Text>
          <Text>{mockProject.projectDetails}</Text>
        </View>
      </View>

      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackLabel}>Feedback:</Text>
        <TextInput
          style={styles.feedbackInput}
          placeholder="Add your feedback here"
          multiline
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
          <Text style={styles.submitButtonText} >Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:45,
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
  detailItempro:{
    justifyContent: 'space-between',
    marginBottom: 12,
    
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    padding:20,
  },
  detailValue: {
    fontSize: 16,
    padding:20,
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
});

export default ProjectDetailsScreen;
