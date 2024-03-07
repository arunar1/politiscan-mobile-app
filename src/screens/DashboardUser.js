import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { images } from '../constants';
import { setWidth } from '../utils';
import { Seperator } from '../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const DashboardUser = ({ navigation, route }) => {
  const { data } = route.params;
  console.log(data.profileImage)

  const handleLogout = () => {    
    navigation.navigate('login');
  };



  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <MaterialCommunityIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
      {/* <Seperator height={setWidth(2)} /> */}
      <View style={styles.header}>
        <Image
          source={{ uri: data.profileImage }}
          style={styles.profilePic}
        />
        <Text style={styles.name} numberOfLines={2} multiline >{data.name}</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.label}>Constituency:</Text>
        <Text style={styles.info}>{data.constituency}</Text>

        <Text style={styles.label}>District:</Text>
        <Text style={styles.info}>{data.district}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.info}>{data.mobileNumber}</Text>

        <Text style={styles.label}>Aadhar No:</Text>
        <Text style={styles.info}>{data.aadharNo}</Text>

        <Text style={styles.label}>Email ID:</Text>
        <Text style={styles.info}>{data.email}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('notification')}>
          <Text style={styles.buttonText}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('projectlist',{data: data})}>
          <Text style={styles.buttonText}>Show Projects</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',

  },
  header: {
    width:setWidth(90),
    flexDirection: 'row',
    justifyContent:'space-evenly',
    height: setWidth(35),
    backgroundColor:'#82d5e3',
    borderRadius:setWidth(5),
    alignItems:'center'
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginRight: 15,
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
    width:setWidth(40)

  },
  userInfo: {
    marginBottom: 2,
    borderRadius:setWidth(5),
    backgroundColor:'#cbedeb',
    padding:30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  centeredButtonContainer: {
    alignItems: 'center',
  },
  button: {
    width: setWidth(40),
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderRadius:setWidth(50),
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  logoutButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom:-50,
    borderRadius: 5,
  },
});

export default DashboardUser;
