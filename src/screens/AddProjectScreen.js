import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Api } from '../constants';

const AddProjectScreen = ({ navigation, route }) => {
    const { constituency } = route.params;
    console.log(constituency);

    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectType, setProjectType] = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const generateRandomId = () => {

        const characters = constituency.slice(0, 4).toUpperCase();
        const randomId = Math.floor(Math.random() * 9000) + 1000;
        setProjectId(characters + randomId.toString());
    };

    const handleAddProject = async() => {
        // Here you can handle adding the project to your database or perform any other actions
        console.log('Project ID:', projectId);
        console.log('Project Name:', projectName);
        console.log('Project Type:', projectType);
        console.log('Total Budget:', totalBudget);
        console.log('Project Description:', projectDescription);

        if (!constituency || !projectId.trim() || !projectName.trim() || !projectType.trim() || !totalBudget.trim() || !projectDescription.trim()) {
            Alert.alert('Error', 'All fields are required');
            return;
        }


        try {
            const response = await axios.post(`${Api.API_BACKEND}/project/projectadd`, {
                info: { constituency, projectId, projectName, projectType, totalBudget, projectDescription }
            });
        
            console.log('Response:', response); 
        
        if(response.data){
            Alert.alert("success",response.data.message)
        }


            
        } catch (error) {
            Alert.alert("Error",error)
        }
        

        
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Project ID:</Text>
            <TextInput
                style={styles.input}
                value={projectId}
                onChangeText={setProjectId}
                placeholder="Auto-generated or enter manually"
                editable={false}
            />
            <TouchableOpacity style={styles.generateButton} onPress={generateRandomId}>
                <Text style={styles.buttonText}>Generate Random ID</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Project Name:</Text>
            <TextInput
                style={styles.input}
                value={projectName}
                onChangeText={setProjectName}
                placeholder="Enter project name"
            />

            <Text style={styles.label}>Project Type:</Text>
            <TextInput
                style={styles.input}
                value={projectType}
                onChangeText={setProjectType}
                placeholder="Enter project type"
            />

            <Text style={styles.label}>Total Budget:</Text>
            <TextInput
                style={styles.input}
                value={totalBudget}
                keyboardType="numeric"
                onChangeText={setTotalBudget}
                placeholder="Enter total budget"
            />

            <Text style={styles.label}>Project Description:</Text>
            <ScrollView style={styles.descriptionContainer} nestedScrollEnabled={true}>
                <TextInput
                    style={styles.descriptionInput}
                    value={projectDescription}
                    onChangeText={setProjectDescription}
                    placeholder="Enter project description"
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                    autoGrow={true}
                    minHeight={100}
                    maxHeight={200}
                />
            </ScrollView>

            <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
                <Text style={styles.buttonText}>Add Project</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop:70,
        flexGrow: 1,
        padding: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    generateButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#27ae60',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    descriptionContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    descriptionInput: {
        padding: 10,
        minHeight: 100,
        maxHeight: 200,
    },
});

export default AddProjectScreen;
