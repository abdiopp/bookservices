import { View, Text, Button, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../Styles/Style'
import { useRoute } from '@react-navigation/native';
import { Avatar, Card, IconButton, Surface } from 'react-native-paper';
import styleclr from '../Styles/Styleclr';
import { useFetchDoc } from '../../contaxts/FetchDoc';
export default function SubCategories({ navigation }) {
  const route = useRoute();
  const { category } = route.params;
  const { workers } = useFetchDoc()
  const [subCategoryWorker, setSubCategoryWorker] = useState([])
  useEffect(() => {
    let tempworkers = workers
    let tempworker = tempworkers.filter((item) => {
      return (
        item.category == category
      )
    })

    setSubCategoryWorker(tempworker)
  }, [])

  return (
    <View style={styles.flexContainer}>
      <View>
        <Text style={[styles.h3, styles.h, { marginVertical: 10 }]} ><Text style={[styles.h3, styles.h, styleclr.primary]}>|</Text> All Categories</Text>
      </View>
      <ScrollView>
        <Surface style={[styles.radius]}>
          {
            subCategoryWorker.map((item, index) => {
              
              return (
                <View key={index}>
                  <View style={[styles.flexcart, styles.radius, { marginBottom: 10, backgroundColor: `${item.bgColor}` }]}>
                    <View style={[styles.flexcart,]}>
                      <Image source={{ uri: item.imgUrl }} style={[styles.radius, { width: 100, height: 100, paddingVertical: 10 }]} />
                      <View style={{ marginHorizontal: 10, justifyContent: "center", width: 120 }}>
                        <Text style={styleclr.white}>{item.serviceType}</Text>
                        <Text style={[styles.p, styleclr.white, { marginVertical: 10 }]}>Start From</Text>
                        <View>
                          <Text style={[styleclr.warning]}>$ {item.price}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.flexCenter]}>

                      <TouchableOpacity
                        onPress={() => { navigation.navigate(':id', { id: item.uid }) }} >
                        <Image source={require("../../assets/icon/rightarow.png")} style={[{ width: 40, height: 40, marginHorizontal: 10, }]} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </Surface>
      </ScrollView>
    </View>
  )
}