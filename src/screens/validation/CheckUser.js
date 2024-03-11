import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Api } from '../../constants';
import { FlatList } from 'react-native-gesture-handler';

const CheckUser = () => {

    useEffect(() => {
        getResponse();
    }, []);

    const [details, setDetails] = useState([]);

    const getResponse = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/checkUser`);
            setDetails(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={details}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <Text>{item.email}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55,
        padding: 16,
    }
})

export default CheckUser;
