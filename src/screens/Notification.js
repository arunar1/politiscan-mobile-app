import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView,Alert } from 'react-native';
import { Api } from '../constants';
import { useRef } from 'react';
import LottieView from 'lottie-react-native';

const Notification = ({navigation,route}) => {

    const animation = useRef(null);


    const {data}=route.params

    const [load,setLoad]=useState(false)

    const [poll, setPoll] = useState([]);

    useEffect(() => {
        getPoll();
    }, []);

    const getPoll = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/getpoll`, {});
            setPoll(response.data.data);
            console.log(response.data.data.length)
            if(response.data.data.length==0){
                Alert.alert("Alert","Notification Not Added")
                setLoad(true)
                // navigation.goBack()
               }
        } catch (error) {
            console.error('Error fetching poll:', error);
        }
    };

    const renderPollItem = ({ item }) => (
        <TouchableOpacity style={styles.pollItem} onPress={() => handlePollPress(item)}>
            <Text style={{fontFamily:'Regular'}}>{item.description}</Text>
        </TouchableOpacity>
    );

    const handlePollPress = (pollItem) => {
        navigation.navigate('polladdscreen',{item:data , pollItem:pollItem})
    };

    console.log(poll)



    return poll.length || load ? (
        <View style={styles.container}>
            <Text style={styles.head}>Notification</Text>
            <FlatList
                data={poll}
                renderItem={renderPollItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    ):(
       <LottieView 

       autoPlay
    ref={animation}
    style={[styles.containerload]}
      source={require('../assets/images/loading.json')}
       
       /> 
    )
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
        fontFamily:'Regular'
    },
    pollItem: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5, 
    },
    containerload:{
        flex:1,
        justifyContent:"center",
      }
});

export default Notification;
