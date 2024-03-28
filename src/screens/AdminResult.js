import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';
import { setWidth } from '../utils';
import { useRef } from 'react';
import LottieView from 'lottie-react-native';
const AdminResult = ({ navigation, route }) => {
    const { data } = route.params;
    const [dataSet, setDataSet] = useState([]);

    const animation = useRef(null);

    const [load,setLoad]=useState(false)




    const fetchDataAll = async () => {
        try {
            const response = await axios.post(`${Api.API_BACKEND}/project/allsentimentResult`, {
                constituency: data.constituency
            });
            setDataSet(response.data);
           if(response.data.length==0){
            Alert.alert("Alert","No Project Rated")
                setLoad(true)
            // navigation.goBack()
           }
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

    console.log(dataSet)

    return dataSet.length || load ? (
        <View style={styles.container}>
            <Text style={styles.head}>Rating</Text>
            <FlatList
                data={dataSet}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.projectItem}
                        onPress={() => navigation.navigate('projectdetails', {item:item, data:data})}
                    
                    >
                        {console.log(item)}
                        <Text style={[styles.projectTitle,{backgroundColor:'#d0eeec'}]}>Project ID: {item.projectId}</Text>
                        <Text style={[styles.projectTitle]} numberOfLines={2} multiline>Project Name: {item.projectName}</Text>

                        <Text style={styles.text}>Total Positive   Sentiments: {getPositiveSentiments(item)}</Text>
                        <Text  style={styles.text}>Total Negative Sentiments: {getNegativeSentiments(item)}</Text>
                    </TouchableOpacity>
                )}
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
        fontFamily:'Bold',
        marginBottom: 8,
        // backgroundColor:'#d0eeec',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:5,
        width:setWidth(90),
        textAlign:'center'
    },
    text:{
        // backgroundColor:'#d0eeec',
        width:setWidth(60),
        borderRadius:10,
        padding:5,
        margin:10,
        fontFamily:'Regular',
        textAlign:'center'
    },
    head: {
        fontSize: 22,
        marginBottom: 10,
        fontFamily:'Regular'
    },
    containerload:{
        flex:1,
        justifyContent:"center",
      }
});

export default AdminResult;
