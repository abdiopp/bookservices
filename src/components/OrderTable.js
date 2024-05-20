import * as React from 'react';
import {View, ScrollView, StyleSheet, Dimensions, Button} from 'react-native';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import firestore from '@react-native-firebase/firestore';
import notify from '../config/global';
import {useAuthContaxt} from '../contaxts/AuthContaxt';
import {Picker} from '@react-native-picker/picker';

const OrderTable = ({itemData}) => {
  const [orders, setOrders] = React.useState(itemData);
  const {user} = useAuthContaxt();

  const tableHead = [
    '#',
    'Status',
    'Name',
    'Date',
    'Address',
    'Phone',
    'ServiceType',
    'Worker Name',
    'Whatsapp No',
    'Price',
    'Action',
  ];
  const screenWidth = Dimensions.get('window').width;
  const columnWidth = screenWidth / tableHead.length + 100;

  const deleteDocument = async uid => {
    try {
      const collectionRef = firestore().collection('orders');
      await collectionRef.doc(uid).delete();
      const newOrders = orders.filter(order => order.uid !== uid);
      setOrders(newOrders);
      notify('Success', 'Order cancelled successfully', 'success');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const updateStatus = async (uid, newStatus) => {
    try {
      firestore().collection('orders').doc(uid).update({
        status: newStatus,
      });
      const updatedOrders = orders.map(order =>
        order.uid === uid ? {...order, status: newStatus} : order,
      );
      setOrders(updatedOrders);
      notify('Success', 'Order status updated successfully', 'success');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const renderAction = uid => (
    <Button
      title="Cancel"
      color="#ff0000"
      onPress={() => deleteDocument(uid)}
    />
  );

  const renderStatusCell = (status, uid) => {
    if (user.role === 'admin') {
      return (
        <Picker
          selectedValue={status}
          style={{height: 50, width: columnWidth}}
          onValueChange={itemValue => updateStatus(uid, itemValue)}>
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Confirmed" value="Confirmed" />
        </Picker>
      );
    } else {
      return (
        <Cell data={status} textStyle={tableStyles.text} width={columnWidth} />
      );
    }
  };

  return (
    <ScrollView horizontal={true}>
      <View style={tableStyles.container}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <Row
            data={tableHead}
            style={tableStyles.head}
            textStyle={tableStyles.textHead}
            widthArr={Array(tableHead.length).fill(columnWidth)}
          />
        </Table>
        <ScrollView style={tableStyles.dataWrapper}>
          {orders.map((item, index) => (
            <Table
              key={index}
              style={{backgroundColor: '#fff'}}
              borderStyle={{borderWidth: 1, borderColor: '#ced4da'}}>
              <TableWrapper style={tableStyles.row}>
                {[
                  index + 1,
                  renderStatusCell(item.status, item.uid),
                  item.username,
                  item.dateString,
                  item.address,
                  item.phone,
                  item.serviceType,
                  item.workerName,
                  item.whatsappNumber,
                  `$ ${item.price}`,
                ].map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellData}
                    textStyle={tableStyles.text}
                    width={columnWidth}
                  />
                ))}
                <Cell
                  key="action"
                  data={renderAction(item.uid)}
                  textStyle={tableStyles.text}
                  width={columnWidth}
                />
              </TableWrapper>
            </Table>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const tableStyles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#390099'},
  text: {
    margin: 6,
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#fff',
  },
  textHead: {margin: 6, textAlign: 'center', color: '#fff'},
  dataWrapper: {marginTop: -1},
  row: {flexDirection: 'row', backgroundColor: '#fff'},
});

export default OrderTable;
