import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddProjectScreen = () => {
    const [projectId, setProjectId] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const generateRandomId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';
        for (let i = 0; i < 2; i++) {
            randomId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    setProjectId(randomId);
        // Generate a random number between 1000 and 9999
        // const randomId = Math.floor(Math.random() * 9000) + 1000;
        // setProjectId(randomId.toString());
        
    };

    const handleAddProject = () => {
        // Here you can handle adding the project to your database or perform any other actions
        console.log('Project ID:', projectId);
        console.log('Project Description:', projectDescription);
    };

    return (
        <View style={styles.container}>
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

            <Text style={styles.label}>Project Description:</Text>
            <TextInput
                style={styles.input}
                value={projectDescription}
                onChangeText={setProjectDescription}
                placeholder="Enter project description"
                multiline={true}
                numberOfLines={4}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
                <Text style={styles.buttonText}>Add Project</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
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
});

export default AddProjectScreen;
