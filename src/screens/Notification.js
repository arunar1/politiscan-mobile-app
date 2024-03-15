import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Api } from '../constants';

const Notification = ({navigation}) => {
    const [poll, setPoll] = useState([]);

    useEffect(() => {
        getPoll();
    }, []);

    const getPoll = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/getpoll`, {});
            setPoll(response.data.data);
        } catch (error) {
            console.error('Error fetching poll:', error);
        }
    };

    const renderPollItem = ({ item }) => (
        <TouchableOpacity style={styles.pollItem} onPress={() => handlePollPress(item)}>
            <Text>{item.description}</Text>
        </TouchableOpacity>
    );

    const handlePollPress = (pollItem) => {
        navigation.navigate('polladdscreen',{})
    };

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Notification</Text>
            <FlatList
                data={poll}
                renderItem={renderPollItem}
                keyExtractor={(item) => item._id}
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
    head: {
        fontSize: 22,
        marginBottom: 10,
    },
    pollItem: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5, 
    },
});

export default Notification;
