import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text,ScrollView } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';
import { setHeight, setWidth } from '../utils';

const PollResultScreen = ({ navigation, route }) => {
    const { item } = route.params;
    const [data, setData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [constituencies, setConstituencies] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('');
    const [constituencyVotes, setConstituencyVotes] = useState({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(`${Api.API_BACKEND}/getPollResult`);
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching poll results:', error);
        }
    };

    const filterData = (pollResults) => {
        const filteredResults = pollResults.filter(record => 
            record.description === item.description && 
            record.district && 
            record.constituency
        );
    
        // Filter districts
        const filteredDistricts = filteredResults
            .map(record => record.district)
            .filter((value, index, self) => self.indexOf(value) === index);
        
        // Filter constituencies based on the selected district
        const filteredConstituencies = filteredResults
            .filter(record => record.district === selectedDistrict)
            .map(record => record.constituency)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort(); // Sort the constituencies alphabetically
    
        const votes = {};
        filteredResults.forEach(record => {
            if (!votes[record.constituency]) {
                votes[record.constituency] = { yes: 0, no: 0 };
            }
            if (record.vote === 'yes') {
                votes[record.constituency].yes++;
            } else if (record.vote === 'no') {
                votes[record.constituency].no++;
            }
        });
    
        setDistricts(filteredDistricts);
        setConstituencies(filteredConstituencies);
        setConstituencyVotes(votes);
    };
    
    useEffect(() => {
        filterData(data);
    }, [data, item, selectedDistrict]); 
    

    const renderConstituencyVotes = () => {
        if (!selectedDistrict || !selectedConstituency) {
            return null;
        }

        const votes = constituencyVotes[selectedConstituency] || { yes: 0, no: 0 };

        return (
            <View >
            <View style={styles.result}>
                <Text style={styles.retext}>Positive : {votes.yes}</Text>
                <Text style={styles.retext}  >Negative : {votes.no}</Text>
            </View>
        <View style={{justifyContent:'center',width:setWidth(90),alignItems:'center',}}>
        <View style={styles.chart}>
            <View style={[styles.bar, { height: setHeight(votes.yes*25/(votes.yes+votes.no+1)) }]} ><Text style={styles.text} >Yes</Text></View>
            <View style={[styles.bar, { height: setHeight(votes.no*25/(votes.yes+votes.no+1)),backgroundColor:'red' }]} ><Text style={styles.text}>No</Text></View>
          </View>
        </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text>Select District:</Text>
            <Picker
                selectedValue={selectedDistrict}
                onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
            >
                <Picker.Item label="Select District" value="" />
                {districts.map((district, index) => (
                    <Picker.Item key={index} label={district} value={district} />
                ))}
            </Picker>

            <Text>Select Constituency:</Text>
            <Picker
                selectedValue={selectedConstituency}
                onValueChange={(itemValue) => setSelectedConstituency(itemValue)}
            >
                <Picker.Item label="Select Constituency" value="" />
                {constituencies.map((constituency, index) => (
                    <Picker.Item key={index} label={constituency} value={constituency} />
                ))}
            </Picker>

            {renderConstituencyVotes()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55,
        padding: 16,
        
    },
    result:{
        width:setWidth(90),
        height:setHeight(30),
        justifyContent:'center',
        textAlign:'center',
        alignItems:'center',
        flexDirection:'row'
    },retext:{
        padding:10,
        fontSize:20,
        backgroundColor:'#ccc',
        margin:20,
        fontFamily:'Regular',
        borderRadius:10
    },
    chart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '50%',
        maxHeight:400, 
        paddingHorizontal: 10,
        marginBottom:20,
    
      },
      bar: {
        flex: 1,
        backgroundColor: '#3498db', 
        margin:20,
        alignItems:'center',
        justifyContent:'flex-end',
        maxHeight:300,
        position:'relative',
        

       
      },
      text:{
        top:50,
        width:60,
        textAlign:'center',
        height:40,
        fontFamily:'Regular'
        
       
      },
     
});

export default PollResultScreen;
