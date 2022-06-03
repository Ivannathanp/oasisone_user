import React from 'react'
import { Button, Image, StyleSheet, Text, View } from "react-native";

function NestedScreen({route}) {
    return (
       <View>
           <Text style={styles.text}>{route.params.msg}</Text>
       </View>
    )
}

export default NestedScreen;

const styles=StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 25
    }
})
