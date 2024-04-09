import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import {useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { setHeight, setWidth } from '../utils';



const ProjectListScreen = ({ navigation,route }) => {
  const animation = useRef(null);

  const [details,setDetails]=useState([])
  const [result,setResult]=useState([]);

  const isVisible =useIsFocused()

  const [load,setLoad]=useState(false)


  


  
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
          console.log(response.data.message)
          if (projects && projects.length > 0) {
            setProjects( projects.reverse());
           
          } else if(response.data.message=="No projects found for the specified constituency.") {
            setLoad(true)

            Alert.alert('No Projects', 'No projects found');

          }
          else{
            Alert.alert('Error','Error in fetching project')
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
  }, []);

useEffect(()=>{
  checkFeedback();

},[isVisible])


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
      // Alert.alert('Error', 'Please try again.');
    }
  };

 

  // console.log(details)


  
 


  
  


  const deleteProject =(item)=>{

    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
          {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
          },
          {
              text: 'OK',
              onPress: async () => {
                  console.log('OK Pressed');
                  try {
                    const response=await axios.delete(`${Api.API_BACKEND}/project/deleteProject`,{
                      data:{projectId:item}
                    })
                    setProjects(projects.filter(project => project.projectId !== item));
                    setLoad(true)

                    
                  } catch (error) {
                    
                  }
                  
              }
          }
      ],
      { cancelable: false }
  );

    
  }

 

  return projects.length || load ? (
    <View style={styles.container}>
      <Text style={styles.head}>Projects</Text>
     <FlatList
  data={projects}
  keyExtractor={(item) => item.projectId.toString()} 
  renderItem={({ item }) => {
    const hasSentimentData = details.some(detail => {
      return detail.projectId === item.projectId && detail.sentimentData.some(data1 => data1.aadharNo === data.aadharNo);

    });

    return (
      <TouchableOpacity
        style={[styles.projectItem, data.userType==='admin'? '':{ backgroundColor: hasSentimentData ? '#d0eeec' : '#fff' }]}
        onPress={() => navigation.navigate('projectdetails', { item: item, data: data })}
      >
        <View>
          <Text style={styles.projectTitle}>{item.projectId}  :  <Text style={[styles.projectName,{color:'red'}]}>{item.Date}</Text></Text>
          <Text style={[styles.projectName,data.userType==='admin'?{width:setWidth(75)}:'']}>{item.projectName.trim()}</Text>
          

        </View>
        {data.userType === 'admin' ? (
          <MaterialCommunityIcons   name="delete" size={40} color="black" onPress={()=>{deleteProject(item.projectId)}} />
        ) : null}
      </TouchableOpacity>
    );
  }}
/>

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
    justifyContent:'space-between',
    width:setWidth(90)
  },
  projectTitle: {
    fontSize: 18,
    fontFamily:'Bold',
    marginBottom: 8,
    color:'blue'
  },
  projectName:{
    fontSize:18,
    padding:5,
    fontWeight:'500',
    fontFamily:'Regular',
    // width:setWidth(75)

   

  },
  head: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily:'Regular'
},
containerload:{
  flex:1,
  justifyContent:"center",
}
});

export default ProjectListScreen;
