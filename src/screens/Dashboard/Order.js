import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Surface } from 'react-native-paper'
import { useFetchDoc } from '../../contaxts/FetchDoc'
import OrderTable from '../../components/OrderTable'

export default function Order() {
  const {orders} = useFetchDoc()
  return (
    <SafeAreaView>
        <Surface style={{ margin:10}}>
      <ScrollView>
          <OrderTable itemData ={orders} />
      </ScrollView>
        </Surface>
    </SafeAreaView>
  )
}