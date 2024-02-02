import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ProjectListScreen = ({ navigation }) => {
  const projects = [
    { projectId: 1, projectName: 'Project A' },
    { projectId: 2, projectName: 'Project B' },
    { projectId: 3, projectName: 'Project C' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.projectId.toString()} // Assuming 'projectId' is a number
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.projectItem}
            onPress={() => navigation.navigate('ProjectDetails', { project: item })}
          >
            <Text style={styles.projectTitle}>{item.projectName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:55,
    padding: 16,
  },
  projectItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ProjectListScreen;
