import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../Styles/Style'
import { ScrollView } from 'react-native-gesture-handler'
import { Searchbar, Surface } from 'react-native-paper'
import styleclr from '../Styles/Styleclr'
import { useFetchDoc } from '../../contaxts/FetchDoc'

export default function Categories({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { Categories } = useFetchDoc()


  const onChangeSearch = query => setSearchQuery(query);
  return (
    <ScrollView>
      <Surface style={[styles.CatBox4, { borderRadius: 40, margin: 10 }]} elevation={2}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </Surface>

      <Surface style={[styles.CategoryBox, styles.radius]} elevation={2}>
        <View>
          <Text style={[styles.h3, styles.h]} >| All Categories</Text>
        </View>

        <ScrollView >
          <View style={styles.flexaround}>
            {
              Categories.map((item, index) => {
                return (
                  <View key={index}>
                    <View style={[styles.flexCenter,{marginVertical:10}]}>
                      <TouchableOpacity style={[styles.catradius, { backgroundColor: `${item.bgColor}`, }]} onPress={() => { navigation.navigate(':category', { category: item.category }) }}>
                      <Image source={{uri:item.iconUrl}}  style={{ borderRadius: 100, width: 50, height: 50 }}/>
                      </TouchableOpacity>
                      <Text style={styles.p}>{item.category}</Text>
                    </View>
                  </View>
                )
              })
            }

          </View>
        </ScrollView>



      </Surface>

    </ScrollView>
  )
}