import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert ,StyleSheet} from "react-native";
import axios from "axios";

const DemoScreen = () => {
  const [inputText, setInputText] = useState("");
  const [sentimentResult, setSentimentResult] = useState(null);

  const handleSubmit = async () => {
    try {
        const response = await axios.post("http://192.168.0.116:4000/api/sentiment", {
          data: inputText,
        });
    
        const sentiment = response.data.sentiment;
        setSentimentResult(sentiment);
      } catch (error) {
        console.error("Error fetching sentiment:", error);
        Alert.alert("Error", "Failed to fetch sentiment.");
      }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <TextInput
        placeholder="Enter your data"
        onChangeText={(text) => setInputText(text)}
        value={inputText}
        style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20 }}
      />
      <Button title="Submit" onPress={handleSubmit} />

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
    }

})

export default DemoScreen;
