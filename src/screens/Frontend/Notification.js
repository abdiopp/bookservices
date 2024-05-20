import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Surface } from 'react-native-paper'
import NotificationTable from '../../components/NotificationTable'
import { useFetchDoc } from '../../contaxts/FetchDoc'
import { useAuthContaxt } from '../../contaxts/AuthContaxt'

export default function Notification() {
  const {user} = useAuthContaxt()
  console.log("🚀 ~ Notification ~ user:", user)
  const {orders} = useFetchDoc()
  console.log("🚀 ~ Notification ~ orders:", orders)
  const [userOrder, setUserOrder] = useState([])
  useEffect(()=>{
   let tempOrder= orders.filter((item) =>item.uid === user.uid)
   setUserOrder(tempOrder)
  },[orders])
  return (
    <SafeAreaView>
        <Surface style={{ margin:10}}>
      <ScrollView>
          <NotificationTable itemData ={userOrder} />
      </ScrollView>
        </Surface>
    </SafeAreaView>
  )
}