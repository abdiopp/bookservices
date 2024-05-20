import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import firestore from '@react-native-firebase/firestore';
import notify from '../config/global';
const FetchDoc = createContext();

export default function FetchDocProvider(props) {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [Categories, setCategories] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getCategory();
    getWorker();
    getOrder();
    getUsers();
  }, []);

  const getCategory = () => {
    try {
      firestore()
        .collection('categories')
        .onSnapshot(querySnapshot => {
          let array = [];
          querySnapshot.forEach(documentSnapshot => {
            let data = documentSnapshot.data();
            array.push(data);
          });
          setCategories(array);
          setIsAppLoading(false);
        });
      console.log('second');
    } catch (err) {
      notify('category error', 'Failed to get data', 'error');
    }
  };
  const getWorker = () => {
    try {
      firestore()
        .collection('workers')
        .onSnapshot(querySnapshot => {
          let array = [];
          querySnapshot.forEach(documentSnapshot => {
            let data = documentSnapshot.data();
            array.push(data);
          });
          setWorkers(array);
          setIsAppLoading(false);
        });
      console.log('third');
    } catch (err) {
      notify('workers error', 'Failed to get data', 'error');
      return () => {};
    }
  };
  const getOrder = () => {
    try {
      firestore()
        .collection('orders')
        .onSnapshot(querySnapshot => {
          let array = [];
          querySnapshot.forEach(documentSnapshot => {
            let data = documentSnapshot.data();
            array.push(data);
          });
          setOrders(array);
          setIsAppLoading(false);
        });
      console.log('first');
    } catch (err) {
      notify('workers error', 'Failed to get data', 'error');
      return () => {};
    }
  };
  const getUsers = () => {
    try {
      firestore()
        .collection('users')
        .onSnapshot(querySnapshot => {
          let array = [];
          querySnapshot.forEach(documentSnapshot => {
            let data = documentSnapshot.data();
            array.push(data);
          });
          setUsers(array);
          setIsAppLoading(false);
        });
      console.log('second');
    } catch (err) {
      notify('workers error', 'Failed to get data', 'error');
      return () => {};
    }
  };
  return (
    <FetchDoc.Provider
      value={{Categories, isAppLoading, setCategories, workers, orders, users}}>
      {props.children}
    </FetchDoc.Provider>
  );
}

export const useFetchDoc = () => useContext(FetchDoc);
