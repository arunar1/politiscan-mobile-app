import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const ProjectListScreen = ({ navigation,route }) => {

  const [details,setDetails]=useState([])
  const [result,setResult]=useState([]);


  
  const {data} = route.params
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post(`${Api.API_BACKEND}/project/getByConstituency`, {
          constituency: data.constituency
        });

        
        if (response.status === 200) {
          const { projects } = response.data;
          if (projects && projects.length > 0) {
            setProjects(projects);
          } else {
            Alert.alert('No Projects', 'No projects found for the specified constituency');
            navigation.goBack();
          }
        } else {
          throw new Error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        Alert.alert('Error', 'Failed to fetch projects. Please try again.');
      }
    };

    fetchProjects();
    checkFeedback();
  }, []);


  const checkFeedback = async () => {
    try {
      const response = await axios.post(`${Api.API_BACKEND}/project/AllprojectSentimentCheck`, {
        sentimentData: {
          aadharNo: data.aadharNo, 
        },
        constituency:data.constituency
      });


      setDetails(response.data.projectDetails)
      
    } catch (error) {
      Alert.alert('Error', 'Please try again.');
    }
  };

 

  console.log(details)


  
 


  
  


  const deleteProject =()=>{}

  return (
    <View style={styles.container}>
     <FlatList
  data={projects}
  keyExtractor={(item) => item.projectId.toString()} 
  renderItem={({ item }) => {
    const hasSentimentData = details.some(detail => {
      return detail.projectId === item.projectId && detail.sentimentData.some(data => data.aadharNo === data.aadharNo);
    });

    return (
      <TouchableOpacity
        style={[styles.projectItem, { backgroundColor: hasSentimentData ? '#c0e6ff' : '#fff' }]}
        onPress={() => navigation.navigate('projectdetails', { item: item, data: data })}
      >
        <View>
          <Text style={styles.projectTitle}>{item.projectId}</Text>
          <Text style={styles.projectTitle}>{item.projectName.trim()}</Text>
        </View>
        {data.userType === 'admin' ? (
          <MaterialCommunityIcons name="delete" size={24} color="black" onPress={deleteProject} />
        ) : null}
      </TouchableOpacity>
    );
  }}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 55,
    padding: 16,
  },
  projectItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ProjectListScreen;
