import React from "react";
import { View } from "react-native";

const Seperator=({height,width,...extraProps})=>{
return(
    <View style={{height,width,...extraProps}}  />

)}

Seperator.defaultProps={
    height:0,
    width:0,
}

export default Seperator;