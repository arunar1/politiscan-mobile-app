import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { images } from '../constants';
import { setWidth } from '../utils';
import { Seperator } from '../components';

const AdminDashboard = ({ navigation, route }) => {
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <Seperator height={setWidth(2)} />
      <View style={styles.header}>
        <Image
          source={images.PROFILE_PIC}
          style={styles.profilePic}
        />
        <Text style={styles.name} numberOfLines={2} multiline>{data.name}</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.label}>Role:</Text>
        <Text style={styles.info}>MLA</Text>

        <Text style={styles.label}>Constituency:</Text>
        <Text style={styles.info}>{data.constituency}</Text>

        <Text style={styles.label}>District:</Text>
        <Text style={styles.info}>Kozhikode</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.info}>123-456-7890</Text>

        <Text style={styles.label}>Email ID:</Text>
        <Text style={styles.info}>arunar@example.com</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("add-details", { constituency: data.constituency })}>
          <Text style={styles.buttonText}>Add Project</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('projectlist')}>
          <Text style={styles.buttonText}>Show Projects</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('rating')}>
          <Text style={styles.buttonText}>Rated Project</Text>
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
    height: setWidth(25),
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 15,
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
    width: 200,
  },
  userInfo: {
    marginBottom: 20,
    marginLeft: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
   
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: setWidth(100),
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdminDashboard;
