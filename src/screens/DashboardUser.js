import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { images } from '../constants';
import { setHeight, setWidth } from '../utils';
import { Seperator } from '../components';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign} from '@expo/vector-icons';
import {Octicons} from '@expo/vector-icons'


const DashboardUser = ({ navigation, route }) => {
  const { data } = route.params;
  console.log(data.profileImage)

  const handleLogout = () => {    
    navigation.navigate('login');
  };

  const showSetting=()=>{
    navigation.navigate('setting',{data})
  }



  return (
    <ScrollView selectable={true} style={styles.container}>
              
      <Seperator height={setHeight(5)} />
      <View style={styles.header}>
      <View style={styles.btnStyle}>
              
              <TouchableOpacity style={styles.settingButton} >
              <MaterialCommunityIcons  name="cog" size={40} color="white"  onPress={showSetting}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialCommunityIcons  name="logout" size={40} color="white" />
              </TouchableOpacity>
              </View>
        <Image
          source={{ uri: data.profileImage }}
          style={styles.profilePic}
        />
        <Text selectable={true} style={styles.name} numberOfLines={2} ellipsizeMode="tail" multiline={true}>
  {data.name.toUpperCase()}
</Text>
      </View>
      <Seperator height={setHeight(3)} />



      <View style={styles.userInfo}>
        <Text style={styles.label}>Constituency</Text>
        <Text selectable={true} style={styles.info}>{data.constituency}</Text>

        <Text style={styles.label}>District</Text>
        <Text selectable={true} style={styles.info}>{data.district}</Text>

        <Text style={styles.label}>Phone Number</Text>
        <Text selectable={true} style={styles.info}>{data.mobileNumber}</Text>

        <Text style={styles.label}>Aadhaar No</Text>
        <Text selectable={true} style={styles.info}>{data.aadharNo}</Text>

        <Text style={styles.label}>Email ID</Text>
        <Text selectable={true} style={styles.info}>{data.email}</Text>
      </View>
      <Seperator height={setHeight(3)} />


      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('notification',{data: data})}>
          {/* <Text style={styles.buttonText}>Notification</Text> */}
          <AntDesign name="notification" size={30} color="white" />

        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('projectlist',{data: data})}>
          {/* <Text style={styles.buttonText}>Show Projects</Text> */}
          <Ionicons name="list" size={30} color="white"/>
        </TouchableOpacity>
      </View>
      <Seperator height={setHeight(2)} />

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'space-around',

  },
  header: {
    width:setWidth(90),
    justifyContent:'space-evenly',
    height: setWidth(65),
    backgroundColor:'#5a1f85',
    borderRadius:setWidth(5),
    alignItems:'center'
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 55,
    marginRight: 15,
  },
  name: {
    fontSize: 26,
    fontFamily:'Bold',
    color:'white'
    // width:setWidth(40)

  },
  userInfo: {
    marginBottom: 2,
    borderRadius:setWidth(5),
    backgroundColor:'#C4E4E2',
    padding:30,
    
  },
  label: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 14,
    fontFamily:'Bold',
    marginTop:10,


  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily:'Regular'
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
    backgroundColor:'#5a1f85',
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
    // alignSelf: 'flex-end',
    // marginRight: 20,
    // marginBottom:-20,
    // borderRadius: 5,
    // marginTop:20,
  },
  settingButton:{
    // marginRight: 20,
    // marginBottom:-20,
    // borderRadius: 5,
    // marginTop:20,

  },
  btnStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:setWidth(80)
  }
});

export default DashboardUser;
