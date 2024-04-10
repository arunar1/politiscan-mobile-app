import React from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import { setWidth,setHeight } from '../utils';
const Predction = ({navigation,route}) => {
    const {pos,neg}=route.params
    console.log(pos,neg)
    return (
        <View style={styles.container}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <View style={{backgroundColor:'#ccc',width:setWidth(80),height:10,borderRadius:10,marginBottom:10}}>
                    <View style={{backgroundColor:'red',width:setWidth(80*pos/(pos+neg)),height:10,borderRadius:10}}></View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:setWidth(80),marginBottom:20}}>
                    <Text>0</Text>
                    <Text>25</Text>
                    <Text>50</Text>
                    <Text>75</Text>
                    <Text>100</Text>
                </View>
            </View>   
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55,
        padding: 16,
        justifyContent:'center'
       
    },
})

export default Predction;
