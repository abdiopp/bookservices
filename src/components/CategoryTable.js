import * as React from 'react';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../screens/Styles/Style';
import firestore from '@react-native-firebase/firestore';
import { TouchableWithoutFeedback, View } from 'react-native';
import notify from '../config/global';
import { useFetchDoc } from '../contaxts/FetchDoc';
const CategoryTable = ({ itemsData }) => {
  const {Categories ,setCategories} = useFetchDoc()
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([4, 8, 16]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState(itemsData);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const deleteDocument = async (item) => {
    const { uid } = item
    try {
      const collectionRef = firestore().collection("categories");
      await collectionRef.doc(uid).delete();
     let newdocument= Categories.filter((cate)=>cate.uid !== uid)
     setCategories(newdocument)
      notify("Success", "Category delete succcessfuly", "success")
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>#</DataTable.Title>
        <DataTable.Title>Calories</DataTable.Title>
        
        <DataTable.Title>Action</DataTable.Title>

      </DataTable.Header>

      {items.slice(from, to).map((item, i) => (
        <DataTable.Row key={i}>
          <DataTable.Cell>{i + 1}</DataTable.Cell>
          <DataTable.Cell>{item.category}</DataTable.Cell>
         
          <DataTable.Cell>
            <TouchableWithoutFeedback onPress={() => deleteDocument(item)}>
              <View>
                <Icon style={[styles.h3]} name="trash" />
              </View>
            </TouchableWithoutFeedback>

          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default CategoryTable;