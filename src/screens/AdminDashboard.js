import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { images } from '../constants';
import { setHeight, setWidth } from '../utils';
import { Seperator } from '../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons'
import {Octicons} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'

const AdminDashboard = ({ navigation, route }) => {
  const { data } = route.params;
  const handleLogout = () => {    
    navigation.navigate('login');
  };

  const showSetting=()=>{
    navigation.navigate('setting',{data})
  }


  console.log(data)
  return (
    <ScrollView style={styles.container} selectable={true}>
     <Seperator height={setHeight(5)} />

      <View style={styles.header}>
      <View style={styles.btnStyle}>
      <TouchableOpacity style={styles.settingButton} >
      <MaterialCommunityIcons  name="cog" size={40} color="white"  onPress={showSetting}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
       <MaterialCommunityIcons name="logout" size={40} color="white" />
      </TouchableOpacity>
       </View>
        <Image
          source={{uri: data.profileImage }}
          style={styles.profilePic}
        />
        <Text selectable={true} style={styles.name} numberOfLines={2} ellipsizeMode="tail" multiline={true}>
            {data.name.toUpperCase()}
        </Text>
      </View>

      <Seperator height={setHeight(2)} />


      <View style={styles.userInfo}>
        <Text style={styles.label}>Role</Text>
        <Text selectable={true} style={styles.info}>MLA</Text>

        <Text style={styles.label}>Constituency</Text>
        <Text selectable={true} style={styles.info}>{data.constituency}</Text>

        <Text style={styles.label}>District</Text>
        <Text selectable={true} style={styles.info}>{data.district}</Text>

        <Text style={styles.label}>Phone Number</Text>
        <Text  selectable={true} style={styles.info}>{data.mobileNumber}</Text>

        <Text style={styles.label}>Aadhaar No</Text>
        <Text selectable={true} style={styles.info}>{data.aadharNo}</Text>

        <Text style={styles.label}>Email ID</Text>
        <Text  selectable={true} style={styles.info}>{data.email}</Text>
      </View>
      <Seperator height={setHeight(2)} />

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("add-details", { constituency: data.constituency })}>
            {/* <Text style={styles.buttonText}>Add Project</Text> */}
            <Ionicons name="add-circle" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('projectlist',{data: data})}>
            {/* <Text style={styles.buttonText}>Show Projects</Text> */}
            <Ionicons name="list" size={30} color="white"/>

          </TouchableOpacity>

          <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('adminresult',{data: data})}>
          {/* <Text style={styles.buttonText}>Rated Project</Text> */}
          <MaterialIcons name="star-rate" size={30} color="white" />
        </TouchableOpacity>
        </View>

        <Seperator height={setHeight(2)} />


        
      </View>
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
    padding:30
  },
  label: {
    fontSize: 16,
    marginTop:10,
    // fontWeight: 'bold',
    marginBottom:5,
    fontFamily:'Bold'
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily:'Regular'

  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonRow: {
    flexDirection: 'row',
    width:'100%',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  button: {
    backgroundColor: '#5a1f85',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: setWidth(100),
    marginBottom: 20,
    width:setWidth(25),
    alignItems:'center'
  },
  singleButton: {
    width: setWidth(45),
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    // alignSelf: 'flex-end',
    // marginRight: 20,
    // marginBottom:-20,
    // borderRadius: 5,
    // marginTop:20,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  btnStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:setWidth(80)
  },
  settingButton:{
    // marginRight: 20,
    // marginBottom:-20,
    // borderRadius: 5,
    // marginTop:20,

  },
});

export default AdminDashboard;
