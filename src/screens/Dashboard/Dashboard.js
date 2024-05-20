import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { Surface } from 'react-native-paper'
import styles from '../Styles/Style'
import styleclr from '../Styles/Styleclr'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFetchDoc } from '../../contaxts/FetchDoc'
export default function Dashboard() {
  const {Categories, workers, orders, users } = useFetchDoc()
  return (
    <SafeAreaView>
      <Surface style={[styles.radius]}>
        <ScrollView>
          <View style={[styles.horizantlyCenter,styles.flexContainer, {marginVertical:10}]}>

            <Surface style={[styles.Box, styles.Box1, styles.radius ]} elevation={2}>
              
              <View >
                <Text style={[ styles.h2,styleclr.secondary]} > <Icon style={[ styles.h2]}name="user" /> Total Users</Text>
              </View>
              <View>
                <Surface style={[ styles.Box4, styles.radius,styles.horizantlyCenter,]}>
                  <Text style={[styles.h2, styleclr.secondary, styles.shadowProp,]} >{users.length}</Text>
                </Surface>
              </View>
            </Surface>
            <Surface style={[styles.Box, styles.Box1, styles.radius]} elevation={2}>
              
              <View >
                <Text style={[ styles.h2, styleclr.secondary]} > <Icon style={[ styles.h2]}name="renren" />Total Orders</Text>
              </View>
              <View>
                <Surface style={[ styles.Box4, styles.radius,styles.horizantlyCenter,]}>
                  <Text style={[styles.h2, styleclr.secondary, styles.shadowProp,]} >{orders.length}</Text>
                </Surface>
              </View>
            </Surface>
            <Surface style={[styles.Box, styles.Box1, styles.radius]} elevation={2}>
              
              <View >
                <Text style={[ styles.h2, styleclr.secondary]} > <Icon style={[ styles.h2]}name="renren" />Total Workers</Text>
              </View>
              <View>
                <Surface style={[ styles.Box4, styles.radius,styles.horizantlyCenter,]}>
                  <Text style={[styles.h2, styleclr.secondary, styles.shadowProp,]} >{workers.length}</Text>
                </Surface>
              </View>
            </Surface>
          
            <Surface style={[styles.Box, styles.Box1, styles.radius]} elevation={2}>
              
              <View >
                <Text style={[ styles.h2, styleclr.secondary]} > <Icon style={[ styles.h2]}name="renren" /> Categories</Text>
              </View>
              <View>
                <Surface style={[ styles.Box4, styles.radius,styles.horizantlyCenter,]}>
                  <Text style={[styles.h2, styleclr.secondary, styles.shadowProp,]} >{Categories.length}</Text>
                </Surface>
              </View>
            </Surface>
          
            

          </View>
        </ScrollView>
      </Surface>
    </SafeAreaView>
  )
}