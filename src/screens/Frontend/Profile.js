import { View, Text, ScrollView, Image, TouchableOpacity, Linking, Platform } from 'react-native'
import React from 'react'
import styles from '../Styles/Style'
import styleclr from '../Styles/Styleclr'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Surface } from 'react-native-paper'
import { useAuthContaxt } from '../../contaxts/AuthContaxt'

export default function Profile() {
  const {user} = useAuthContaxt()
  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else { phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };
  return (
    <SafeAreaView>

      <ScrollView>
        <Surface style={[styles.radius, styles.Boxwhite, { margin: 10 }]}>
          <View>
            <View style={[styles.flexaround,]}>
              <Image source={require("../../assets/logo/Avater.png")} style={[styles.circle, { width: 80, height: 80 }]} />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.h}>{user.username}</Text>
                <Text style={styles.p}>{user.email}</Text>
              </View>
            </View>
          </View>

        </Surface>
        <Surface style={[styles.radius, styles.Boxwhite, { margin: 10 }]}>
          <Text style={[styles.h3, styleclr.black]}>Phone Number</Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.h, styles.formControl, { padding: 5, textAlign: "center" }]} onPress={(phone) => { this.dialCall(`+${user.phone}`) }} >+{user.phone}</Text>
          
          </View>
          <Text style={[styles.h3, styleclr.black]}>E-mail</Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.h, styles.formControl, { padding: 5, textAlign: "center" }]} >{user.email}</Text>
           
          </View>
          <Text style={[styles.h3, styleclr.black]}>Gender</Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.h, styles.formControl, { padding: 5, textAlign: "center" }]} >{user.gender}</Text>
           
          </View>
          <Text style={[styles.h3, styleclr.black]}>Date of Birth</Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.h, styles.formControl, { padding: 5, textAlign: "center" }]} >Note Set</Text>
          </View>
          <Text style={[styles.h3, styleclr.black]}>Address</Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.h, styles.formControl, { padding: 5, textAlign: "center" }]} >{user.address}</Text>
          </View>
        </Surface>
        
      </ScrollView>

    </SafeAreaView>
  )
}