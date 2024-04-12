import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView,Alert } from 'react-native';
import { Api } from '../constants';
import { useRef } from 'react';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';

const Notification = ({navigation,route}) => {

    const animation = useRef(null);

    const [details,setDetails]=useState([])

    const {data}=route.params

    const [load,setLoad]=useState(false)

    const [poll, setPoll] = useState([]);

    const isVisible =useIsFocused()

   

    useEffect(() => {
        getPoll();
        getAllpoll();
    }, [isVisible]);

    const getAllpoll= async()=>{
        const response =await axios.get(`${Api.API_BACKEND}/getPollResult`);
        // console.log(response.data)
        setDetails(response.data.data)

    }

    const getPoll = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/getpoll`, {});
            setPoll(response.data.data.reverse());
            // console.log(response.data.data.length)
            if(response.data.data.length==0){
                Alert.alert("Alert","Notification Not Added")
                setLoad(true)
                // navigation.goBack()
               }
        } catch (error) {
            console.error('Error fetching poll:', error);
        }
    };

    const renderPollItem = ({ item }) => {
        const hasPollData = details.some(detail => {
            // {console.log(detail.description)}
            // {console.log(item.description)}
            return detail.description === item.description && detail.aadhar === data.aadharNo;
        });
    
        return (
            data.constituency === item.constituency || item.constituency === 'Admin' ? (
            <TouchableOpacity
                style={[styles.pollItem, { backgroundColor: hasPollData ? '#d0eeec' : '#fff' }]}
                onPress={() => handlePollPress(item)}
            >
    
                    <View>
                        <Text style={{ fontFamily: 'Bold', marginBottom: 10 }}>{item.date} {item.constituency === 'Admin' ? '  ★' : ''}</Text>
                        <Text style={{ fontFamily: 'Regular' }}>{item.description}</Text>
                    </View>
            </TouchableOpacity>
            ):null
  
            
        );
    };
    
    const handlePollPress = (pollItem) => {
        navigation.navigate('polladdscreen', { item: data, pollItem: pollItem });
    };
    

    // console.log(details)



    return poll.length || load ? (
        <View style={styles.container}>
            <Text style={styles.head}>Notification</Text>
            {poll.length == 0 ? (<View  style={[styles.containerload,{alignItems:'center'}]}>
        <Text style={{fontFamily:'Italic',fontSize:22}}>Notification are not added</Text>
      </View>):null}
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
