import { View, Text, Button, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../Styles/Style'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar, Surface } from 'react-native-paper';
import styleclr from '../Styles/Styleclr';
import { useAuthContaxt } from '../../contaxts/AuthContaxt';
import { useFetchDoc } from '../../contaxts/FetchDoc';

export default function Home({ navigation }) {
  const { user } = useAuthContaxt()
  const { Categories, workers } = useFetchDoc()

  const [firstWorker, setfirstWorker] = useState('');
  useEffect(() => {
    if (workers.length > 0) {
        const temp = workers[0].category;
        setfirstWorker(temp);
    }
}, [workers]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <ScrollView >
      <View style={styles.flexContainer}>
        <Surface style={styles.radius}>
          <View >
            <Text style={styles.p} >Hello {user.username} 👋</Text>
          </View>
          <View >
            <Text style={[styles.h2, styles.h]}>What you are looking for today</Text>
          </View>
          <View >
            <Searchbar
              style={[styles.shadowProp, { marginVertical: 10 }]}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </View>
        </Surface>
        <Surface style={[styles.radius, { marginVertical: 5 }]}>
          <ScrollView horizontal>

            <Surface style={[styles.Box, styles.Box1, styles.radius]} elevation={2}>
              <View >
                <Text style={[styles.p]} >Offer AC Service <Icon name="info-circle" />  </Text>
              </View>
              <View >
                <Text style={[styles.h1, styles.h]} >Get 20%</Text>
              </View>
              <View>
                <Surface style={[styles.smallbtn, styles.Box2, styles.radius]}>
                  <Text style={[styles.p, styleclr.black, styles.shadowProp,]} >Grap Offer <Icon name="arrow-right" /></Text>
                </Surface>
              </View>
            </Surface>
            <Surface style={[styles.Box, styles.Box2, styles.radius]} elevation={2}>
              <View >
                <Text style={[styles.p]} >Offer AC Service <Icon name="info-circle" />  </Text>
              </View>
              <View >
                <Text style={[styles.h1, styles.h]} >Get 10%</Text>
              </View>
              <View>
                <Surface style={[styles.smallbtn, styles.Box3, styles.radius]}>
                  <Text style={[styles.p, styleclr.black, styles.shadowProp,]} >Grap Offer <Icon name="arrow-right" /></Text>
                </Surface>
              </View>
            </Surface>
            <Surface style={[styles.Box, styles.Box3, styles.radius]} elevation={2}>
              <View >
                <Text style={[styles.p]} >Offer AC Service <Icon name="info-circle" />  </Text>
              </View>
              <View >
                <Text style={[styles.h1, styles.h]} >Get 25%</Text>
              </View>
              <View>
                <Surface style={[styles.smallbtn, styles.Box1, styles.radius]}>
                  <Text style={[styles.p, styleclr.black, styles.shadowProp,]} >Grap Offer <Icon name="arrow-right" /></Text>
                </Surface>
              </View>
            </Surface>

          </ScrollView>
        </Surface>
        <Surface style={[styles.radius, { marginVertical: 5 }]}>
          <View style={styles.flexrow}>
            {
              Categories.map((item, index) => {
                if (index < 3)
                  return (
                    <View style={[styles.flexCenter]} key={index}>
                      <TouchableOpacity style={[styles.catradius,  { backgroundColor: `${item.bgColor}`, }]} onPress={() => { navigation.navigate(':category', { category: item.category }) }}>
                        <Image source={{uri:item.iconUrl}}  style={{ borderRadius: 100, width: 50, height: 50 }}/>
                      </TouchableOpacity>
                      <Text style={styles.p}>{item.category}</Text>
                    </View>
                  )
              })
            }

            <View style={[styles.flexCenter, {}]}>
              <TouchableOpacity style={[styles.SeeAllradius, styleclr.black, styles.CatBox4]} onPress={() => { navigation.navigate("Categories") }} >
                <Icon name="arrow-right" />
              </TouchableOpacity>
              <Text style={styles.p}>See All</Text>
            </View>
          </View>
        </Surface>
        <Surface style={styles.radius}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={[styleclr.black]}>| {firstWorker} Services</Text>
            </View>
            <Surface style={[styles.smallbtn, styles.CatBox4, styles.radius]}>
              <Text style={[styleclr.black]}
              onPress={() => { navigation.navigate(':category', { category: firstWorker }) }}
               >See All <Icon name="arrow-right" />
               </Text>
            </Surface>
          </View>
          <ScrollView horizontal>
            {
              workers.map((item, i) => {
                if (item.category == firstWorker)
                if(i<6)
                  return (
                <View key={i}>

                    <View style={[styles.flexCenter, { margin: 5 }]}>
                      <TouchableOpacity
                      onPress={() => { navigation.navigate(':id', { id: item.uid }) }}
                      >

                        <Image source={{ uri: item.imgUrl }} style={[styles.radius, { width: 100, height: 100 }]} />
                      </TouchableOpacity>
                      <Text style={[styles.p, styleclr.black, { marginTop: 5 }]}>{item.serviceType}</Text>
                    </View>
                </View>
                  )
              })
            }

          </ScrollView>
        </Surface>
      </View>
    </ScrollView>
  )
}