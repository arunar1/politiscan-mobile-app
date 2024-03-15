import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
            <View style={styles.result}>
                <Text style={styles.retext}>Yes : {votes.yes}</Text>
                <Text style={styles.retext}  >No : {votes.no}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55,
        padding: 16,
    },
    result:{
        width:setWidth(100),
        height:setHeight(50),
        justifyContent:'center',
        textAlign:'center',
        alignItems:'center',
        flexDirection:'row'
    },retext:{
        padding:10,
        fontSize:20,
        backgroundColor:'#ccc',
        margin:20
    }
});

export default PollResultScreen;
