import { View, Image, ImageBackground, Text } from 'react-native'
import React from 'react'
import styles from '../screens/Styles/Style'

export default function Serviceimg({ name,color,url }) {
    return (
        
        <View style={styles.detailHeaderBox}>
            <ImageBackground source={{ uri: url }}resizeMode='cover' style={styles.detailHeaderBoxBgImage}>
                <View style={[styles.overlayView,{ backgroundColor:`${color}`,opacity:0.3}]} />
                <Text style={[styles.h1, { color: "#fff", textAlign:"center", top:"25%",  fontWeight:"bold" }]}>{name}</Text>
            </ImageBackground>
        </View>
    )
}