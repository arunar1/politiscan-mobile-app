import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';
import { setWidth } from '../utils';
import { useRef } from 'react';
import LottieView from 'lottie-react-native';
const AdminResult = ({ navigation, route }) => {
    const { data } = route.params;
    const [dataSet, setDataSet] = useState([]);

    const animation = useRef(null);

    const [buttonVisible,setButtonVisible]=useState(true)

    const [load,setLoad]=useState(false)
    let x =0
    let y =0

    const [pos,setPos]=useState(0)
    const [neg,setNeg]=useState(0)

    const [isOk,SetIsOk]=useState(false)

  




    const fetchDataAll = async () => {
        try {
            const response = await axios.post(`${Api.API_BACKEND}/project/allsentimentResult`, {
                constituency: data.constituency
            });
            setDataSet(response.data);
           if(response.data.length==0){
            // Alert.alert("Alert","Project are not rated......")
                setButtonVisible(false)
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

    // console.log(dataSet)

    console.log(pos,neg)

    let total=pos+neg
    



    return dataSet.length  || load ? (
        <ScrollView style={styles.container}>
            <Text style={styles.head}>Rating</Text>
           <View style={{padding:16}}>
           <View >
                
                {buttonVisible ? (<View style={{justifyContent:'center',width:setWidth(90),alignItems:'center'}}>
                    <TouchableOpacity style={{backgroundColor:'#ccc',justifyContent:'center',alignContent:'center',marginBottom:20,padding:10,borderRadius:10,width:setWidth(90)}} onPress={()=>{navigation.navigate('prediction',{pos:pos,neg:neg})}}>
                    <Text style={{fontFamily:'Regular',fontSize:15,color:'red',textAlign:'center',alignItems:'centerr'}}>Predict</Text>
                </TouchableOpacity>
                    </View>):null}
                    </View>

                    {dataSet.length == 0 ? (<View  style={[styles.containerload,{alignItems:'center'}]}>
        <Text style={{fontFamily:'Italic',fontSize:22}}>Projects are not rated</Text>
      </View>):null}
      
      <Text style={{fontFamily:'Italic',fontSize:15,marginBottom:20}}>Rated Projects : {dataSet.length}</Text>

            <FlatList
                data={dataSet}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    x= x + getPositiveSentiments(item);
                    y=y + getNegativeSentiments(item);
                    setPos(x)
                    setNeg(y)
                    
                    return(
                        (
                            <TouchableOpacity
                                style={styles.projectItem}
                                onPress={() => navigation.navigate('projectdetails', {item:item, data:data})}
                            
                            >
                                
                                {console.log(item)}
                                <Text style={[styles.projectTitle,{backgroundColor:'#d0eeec'}]}>Project ID: {item.projectId}</Text>
                                <Text selectable={true} style={[styles.projectTitle]} numberOfLines={2} multiline> {item.projectName}</Text>
        
                                <Text selectable={true} style={styles.text}>Total Positive   Sentiments: {getPositiveSentiments(item)}</Text>
                                <Text  selectable={true} style={styles.text}>Total Negative Sentiments: {getNegativeSentiments(item)}</Text>
                            </TouchableOpacity>
                        )
                    )
                }

            }
            />
           </View>
        </ScrollView>
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
        marginTop: 30,
        // padding: 16,
       
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
        fontFamily:'Italic',
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
        width:setWidth(90),
        borderRadius:10,
        padding:5,
        margin:10,
        fontFamily:'Regular',
        textAlign:'center'
    },
    head: {
    fontSize: 22,
    marginBottom: 20,
    fontFamily:'Bold',
    justifyContent:'center',
    textAlign:'center',
    backgroundColor:'#5a1f85',
    paddingVertical:20,
    color:'white'
    },
    containerload:{
        flex:1,
        justifyContent:"center",
      }
});

export default AdminResult;
