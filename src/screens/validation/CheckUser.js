import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Api } from '../../constants';

const CheckUser = ({ navigation }) => {
    const [userRecords, setUserRecords] = useState([]);
    const [adminRecords, setAdminRecords] = useState([]);
    const [displayAdmin, setDisplayAdmin] = useState(false);

    useEffect(() => {
        getRecords();
    }, []);

    const getRecords = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/login/checkUser`);
            setUserRecords(response.data.userdetails);
            setAdminRecords(response.data.admindetails);
        } catch (error) {
            console.error('Error fetching records:', error);
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

    const renderAdminItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.email}>{item.name}</Text>
            <Text style={styles.email}>{item.constituency}</Text>
        </TouchableOpacity>
    );

    const toggleDisplay = () => {
        setDisplayAdmin(!displayAdmin);
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleDisplay}>
                    <Text style={styles.buttonText}>{displayAdmin ? 'Show Users' : 'Show Admins'}</Text>
                </TouchableOpacity>
            </View>
            {displayAdmin ? (
                <FlatList
                    data={adminRecords}
                    keyExtractor={(item) => item._id}
                    renderItem={renderAdminItem}
                />
            ) : (
                <FlatList
                    data={userRecords}
                    keyExtractor={(item) => item._id}
                    renderItem={renderUserItem}
                />
            )}
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CheckUser;
