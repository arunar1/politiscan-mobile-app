import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import axios from "axios";

const DemoScreen = ({ route, navigation }) => {
  const [sentimentResult, setSentimentResult] = useState(null);
  const { inputText } = route.params;

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.post("http://192.168.154.133:4000/api/sentiment", {
            text: inputText,
          });
          const sentiment = response.data.sentiment;
          console.log(sentiment)
          setSentimentResult(sentiment);
        } catch (error) {
          console.error("Error fetching sentiment:", error);
          Alert.alert("Error", "Failed to fetch sentiment.");
        }
      } 

    fetchData(); 
  }, [inputText]); 

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={styles.text}>Feedback : {inputText}</Text>
      {sentimentResult !== null && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>Sentiment Result: <Text style={styles.sentimentResult}>{sentimentResult}</Text></Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  sentimentResult:{
    color:"red"
  }
});

export default DemoScreen;
