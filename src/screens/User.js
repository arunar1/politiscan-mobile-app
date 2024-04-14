import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const User = ({ navigation, route }) => {
    const { data } = route.params;
    const [searchQuery, setSearchQuery] = useState('');

    let x = 0;

    data.map((item) => {
        if (item.verified) {
            x = x + 1;
        }
    });


    const handleItemPress = (item) => {
        navigation.navigate('verifyadmin', { item: item ,user:'politicaladmin'});
    };
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }) => (
        item.verified ? (
            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: '#d0eeec' }]}  onPress={() => handleItemPress(item)}>
                <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>Name : {item.name}</Text>
                    <Text style={styles.detail}>Adhar Number : {item.aadharNo}</Text>
                    <Text style={styles.detail}>Email : {item.email}</Text>
                    <Text style={[styles.detail, { color: 'red' }]}>Verified</Text>
                </View>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: '#ccc' }]}  onPress={() => handleItemPress(item)}>
                <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                <View style={styles.detailsContainer}>
                    <Text selectable={true} style={styles.name}>Name : {item.name}</Text>
                    <Text selectable={true} style={styles.detail}>Adhar Number : {item.aadharNo}</Text>
                    <Text  selectable={true}style={styles.detail}>Email : {item.email}</Text>
                    <Text style={[styles.detail, { color: 'red' }]}>Not Verified</Text>
                </View>
            </TouchableOpacity>
        )
    );

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'space-around', flexDirection: 'row', padding: 20 }}>
                <Text style={{ fontFamily: 'Italic' }}>Verified users : {x}</Text>
                <Text style={{ fontFamily: 'Italic' }}>Non verified users : {data.length - x}</Text>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55,
        backgroundColor: '#fff',
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        
    },
    profileImage: {
        width: 70,
        height: 100,
        borderRadius: 25,
        marginRight: 10,
    },
    detailsContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'Italic',
    },
    detail: {
        fontSize: 12,
        marginBottom: 3,
        fontFamily: 'Italic',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius:10
    },
});

export default User;
