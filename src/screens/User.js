import React from 'react';
import { StyleSheet, View, FlatList, Text, Image } from 'react-native';

const User = ({ navigation, route }) => {
    const { data } = route.params;

    let x=0
    

    data.map((item)=>{
        if(item.verified){
            x=x+1
        }
    })

    console.log(x)

    const renderItem = ({ item }) => (
       item.verified ? (
            <View style={[styles.itemContainer,{backgroundColor:'#d0eeec'}]}>
            <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>Name : {item.name}</Text>
                <Text style={styles.detail}>Adhar Number : {item.aadharNo}</Text>
                <Text style={styles.detail}>Email : {item.email}</Text>
                <Text style={[styles.detail,{color:'red'}]}>Verified</Text>
            </View>
        </View>
        ):(
            <View style={[styles.itemContainer,{backgroundColor:'#ccc'}]}>
            <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>Name : {item.name}</Text>
                <Text style={styles.detail}>Adhar Number : {item.aadharNo}</Text>
                <Text style={styles.detail}>Email : {item.email}</Text>
                <Text style={[styles.detail,{color:'red'}]}>Not Verified</Text>

            </View>
        </View>
        )

    );

    return (
        <View style={styles.container}>
            <View style={{justifyContent:'space-around',flexDirection:'row',padding:20}}>
            <Text style={{fontFamily:'Italic'}}>Verified users : {x}</Text>
            <Text style={{fontFamily:'Italic'}}>Non verified users : {data.length - x}</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:55,
        backgroundColor: '#fff',
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        borderRadius:10
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    detailsContainer: {
        flex: 1,
    },
    name: {
        fontSize: 25,
        marginBottom: 5,
        fontFamily:'Italic',
        
    },
    detail: {
        fontSize: 16,
        marginBottom: 3,
        fontFamily:'Italic'
    },
});

export default User;
