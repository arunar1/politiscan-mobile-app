import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';
import { setWidth } from '../utils';

const AdminResult = ({ navigation, route }) => {
    const { data } = route.params;
    const [dataSet, setDataSet] = useState([]);



    const fetchDataAll = async () => {
        try {
            const response = await axios.post(`${Api.API_BACKEND}/project/allsentimentResult`, {
                constituency: data.constituency
            });
            setDataSet(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataAll();
    }, []);

    const getPositiveSentiments = (project) => {
        let positive = 0;
        project.sentimentData.forEach(sentiment => {
            if (sentiment.sentimentValue === 1) {
                positive++;
            }
        });
        return positive;
    };

    const getNegativeSentiments = (project) => {
        let negative = 0;
        project.sentimentData.forEach(sentiment => {
            if (sentiment.sentimentValue === 0) {
                negative++;
            }
        });
        return negative;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={dataSet}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.projectItem}
                        onPress={() => navigation.navigate('projectdetails', {item:item, data:data})}
                    >
                        <Text style={[styles.projectTitle]}>Project ID: {item.projectId}</Text>
                        <Text style={styles.text}>Total Positive   Sentiments: {getPositiveSentiments(item)}</Text>
                        <Text style={styles.text}>Total Negative Sentiments: {getNegativeSentiments(item)}</Text>
                    </TouchableOpacity>
                )}
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
        justifyContent:'center',
        alignItems:'center'
    },
    projectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        backgroundColor:'#ccc',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
        width:setWidth(80),
        textAlign:'center'
    },
    text:{
        backgroundColor:'#ccc',
        width:setWidth(50),
        borderRadius:10,
        padding:5,
        margin:10,
    }
});

export default AdminResult;
