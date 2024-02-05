import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert ,StyleSheet} from "react-native";
import axios from "axios";
import { setHeight,setWidth } from '../utils';


const DemoScreen = ({route,navigation}) => {
  const [sentimentResult, setSentimentResult] = useState(null);

  const {feedback}=route.params;

  const [inputText, setInputText] = useState("");

  const handleSubmit = async () => {
    if(inputText.split(' ').length>=3){
      try {
        const response = await axios.post("http://172.16.16.147:4000/api/sentiment", {
          data: inputText,
        });

        console.log(response.data)
    
        const sentiment = response.data.calculatedsentiment;
        setSentimentResult(sentiment);
      } catch (error) {
        console.error("Error fetching sentiment:", error);
        Alert.alert("Error", "Failed to fetch sentiment.");
      }
    }
    else{
      Alert.alert("Please", "Need atleast 3 or more words");

    }
    
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
        <Text style={{paddingBottom:30,fontSize:18,}}>Please share your comments on project :</Text>
      <TextInput
        placeholder="  Enter your data"
        multiline
        numberOfLines={4}
        onChangeText={(text) => setInputText(text)}
        value={inputText}
        style={{ height: 70,width:setWidth(90), borderColor: "gray", borderWidth: 1, marginBottom: 20 }}
      />
      <Button title="Submit"  style={styles.b} color={'purple'}  onPress={handleSubmit} />

      {sentimentResult !== null && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>Sentiment Result: <Text style={styles.textresult}>{sentimentResult === 1 ? "Positive" : (sentimentResult === -1 ? "Negative":"Neutral")}</Text></Text>
        </View>
      )}
    </View>
  );
};

const styles=StyleSheet.create({
    text:{
        fontSize:20,
        textAlign:'center',
        marginTop:50,

    },
    textresult:{
        color:'red'
    },
    button:{
        paddingTop:55,
    }

})

export default DemoScreen;
