import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { images } from '../constants';
import { setWidth } from '../utils';
import { Seperator } from '../components';

const DashboardUser = ({ navigation, route }) => {
  const { data } = route.params;
  console.log(data.profileImage)
  return (
    <View style={styles.container}>
      <Seperator height={setWidth(2)} />
      <View style={styles.header}>
        <Image
          source={{ uri: data.profileImage }}
          style={styles.profilePic}
        />
        <Text style={styles.name}>{data.name}</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.label}>Constituency:</Text>
        <Text style={styles.info}>Koyilandy</Text>

        <Text style={styles.label}>MLA</Text>
        <Text style={styles.info}>kanathil jamila</Text>

        <Text style={styles.label}>District:</Text>
        <Text style={styles.info}>kozhikode</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.info}>123-456-7890</Text>

        <Text style={styles.label}>Email ID:</Text>
        <Text style={styles.info}>arunar@example.com</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
          <Text style={styles.buttonText}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Projects Button Pressed')}>
          <Text style={styles.buttonText} onPress={() => {
            navigation.navigate('projectlist')
          }}>Show Projects</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centeredButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Centered Button Pressed')}>
          <Text style={styles.buttonText}>Rate Projects</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: setWidth(25)
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 40,
    marginRight: 15,
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  userInfo: {
    marginBottom: 2,
    marginLeft: 20,
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
});

export default DashboardUser;
