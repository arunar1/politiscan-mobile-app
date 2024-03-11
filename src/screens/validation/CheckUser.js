import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Api } from '../../constants';

const CheckUser = ({ navigation }) => {
    const [userRecords, setUserRecords] = useState([]);

    useEffect(() => {
        getRecords();
    }, []);

    const getRecords = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/login/checkUser`);
            setUserRecords(response.data);
        } catch (error) {
            console.error('Error fetching user records:', error);
        }
    };

    const handleItemPress = (item) => {
        navigation.navigate('verifyadmin', { item: item });
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.email}>{item.name}</Text>
            <Text style={styles.email}>{item.constituency}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={userRecords}
                keyExtractor={(item) => item._id}
                renderItem={renderUserItem}
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
    itemContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    email: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CheckUser;
