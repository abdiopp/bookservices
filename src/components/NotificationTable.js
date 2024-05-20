import * as React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Table, Row } from 'react-native-table-component';
const NotificationTable = ({ itemData }) => {
  const tableHead = ["#",'Worker Name','Date','ServiceType','Phone','Price'];
  const screenWidth = Dimensions.get('window').width;
  const cellWidth = screenWidth / tableHead.length+100;
  const columnWidth = screenWidth / tableHead.length+100;
  return (
    <ScrollView horizontal={true}>
    <View style={tableStyles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
        <Row data={tableHead} style={tableStyles.head} textStyle={tableStyles.textHead}
        widthArr={Array(tableHead.length).fill(columnWidth)} 
        />
      </Table>
      <ScrollView style={tableStyles.dataWrapper}>
        {itemData.map((item, index) => (
          <Table key={index} style={{backgroundColor:"#fff", }} borderStyle={{ borderWidth: 1, borderColor:"#ced4da", }}>
            <Row data={[index+1,item.workerName,item.dateString ,item.serviceType, item.phone,`PKR ${item.price}`]} textStyle={[tableStyles.textHead]}
            widthArr={Array(tableHead.length).fill(columnWidth)}
            />
          </Table>
        ))}
      </ScrollView>
    </View>
  </ScrollView>
  );
};

const tableStyles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center',color:"#fff", },
  textHead: { margin: 6, textAlign: 'center',color:"#000", },
  dataWrapper: { marginTop: -1 },
});
export default NotificationTable;