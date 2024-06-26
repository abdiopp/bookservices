import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Serviceimg from '../../components/Serviceimg';
import styles from '../Styles/Style';
import styleclr from '../Styles/Styleclr';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SegmentedButtons, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFetchDoc} from '../../contaxts/FetchDoc';
import {Calendar} from 'react-native-calendars';
import {useAuthContaxt} from '../../contaxts/AuthContaxt';
import notify from '../../config/global';
import {AirbnbRating} from 'react-native-ratings';

const initialState = {detailFromUser: ''};

export default function ServiceDetail({navigation}) {
  const route = useRoute();
  const {id} = route.params;

  const {user} = useAuthContaxt();
  const {workers} = useFetchDoc();
  const [state, setState] = useState(initialState);
  const [isloading, setisloading] = useState(false);
  const [value, setValue] = useState('');
  const [workerDetail, setWorkerDetail] = useState({});
  const [selected, setSelected] = useState({});
  const [ShowModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [rating, setRating] = useState(0);

  const handlePaymentMethodChange = value => {
    setPaymentMethod(value);
    if (value === 'Bank') {
      setShowBankDetails(true);
    } else {
      setShowBankDetails(false);
    }
  };

  const handleChange = (name, value) => {
    setState(s => ({...s, [name]: value}));
  };

  useEffect(() => {
    let tempworkers = workers;
    let tempworker = tempworkers.filter(item => {
      return item.uid == id;
    });

    if (tempworker.length > 0) {
      let worker = tempworker[0];
      setWorkerDetail(worker);
      fetchAverageRating(worker.uid);
    }
    let uid = tempworker[0].uid;
    let bgColor = tempworker[0].bgColor;
    let category = tempworker[0].category;
    let city = tempworker[0].city;
    let description = tempworker[0].description;
    let location = tempworker[0].location;
    let price = tempworker[0].price;
    let serviceType = tempworker[0].serviceType;
    let workerName = tempworker[0].workerName;
    let imgUrl = tempworker[0].imgUrl;
    let whatsappNumber = tempworker[0].whatsappNumber;
    let data = {
      uid,
      bgColor,
      category,
      city,
      description,
      location,
      price,
      serviceType,
      workerName,
      imgUrl,
      whatsappNumber,
    };
    setWorkerDetail(data);
  }, []);

  const fetchAverageRating = async workerId => {
    try {
      const reviewsSnapshot = await firestore()
        .collection('reviews')
        .where('workerId', '==', workerId)
        .get();

      let totalRating = 0;
      let reviewCount = reviewsSnapshot.size;

      reviewsSnapshot.forEach(doc => {
        totalRating += doc.data().rating;
      });

      const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;
      setWorkerDetail(prev => ({...prev, averageRating}));
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const handleDate = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    const {
      bgColor,
      category,
      city,
      location,
      price,
      serviceType,
      workerName,
      whatsappNumber,
    } = workerDetail;
    const {dateString, day, month, timestamp, year} = selected;
    const {address, email, phone, username, uid} = user;
    const {detailFromUser} = state;
    const propertyType = value;
    const orderData = {
      bgColor,
      category,
      city,
      location,
      price,
      serviceType,
      workerName,
      dateString,
      day,
      month,
      timestamp,
      year,
      address,
      email,
      phone,
      username,
      uid,
      detailFromUser,
      propertyType,
      whatsappNumber,
      status: 'pending',
      rating,
    };
    orderData.id = Math.random().toString(36).slice(2);
    setisloading(true);
    createOrder(orderData);
  };

  const createOrder = async orderData => {
    try {
      await firestore().collection('orders').doc(orderData.id).set(orderData);
      notify('Success', 'Order submitted successfully!', 'success');
      setisloading(false);
      setState(initialState);
      setValue('');
      setSelected({});
    } catch (error) {
      notify('Error', 'Order not submitted!', 'error');
      setisloading(false);
    }
  };

  const storeReview = async () => {
    const userId = user.uid;
    const workerId = workerDetail.uid;
    try {
      const existingReview = await firestore()
        .collection('reviews')
        .where('workerId', '==', workerId)
        .where('userId', '==', userId)
        .get();

      if (!existingReview.empty) {
        notify('Error', 'You have already rated this worker!', 'error');
        return;
      }

      await firestore().collection('reviews').add({
        workerId,
        userId,
        rating,
      });

      notify('Success', 'Review submitted successfully!', 'success');
    } catch (error) {
      notify('Error', 'Review not submitted!', 'error');
    }
  };

  return (
    <ScrollView>
      <Serviceimg
        name={workerDetail.category}
        color={workerDetail.bgColor}
        url={workerDetail.imgUrl}
      />
      <View style={styles.flexContainer}>
        <View>
          <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
            <Text style={[styleclr.primary]}>|</Text> Average Rating
          </Text>
          <Text style={{marginHorizontal: 20, textAlign: 'justify'}}>
            <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
              defaultRating={workerDetail?.averageRating?.toFixed(1) || 0}
              size={20}
              showRating={false}
              isDisabled={true}
            />
          </Text>
        </View>
        <View>
          <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
            <Text style={[styleclr.primary]}>|</Text> Type of Properties
          </Text>
        </View>
        <SafeAreaView style={styles.flexContainer}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: 'home',
                label: 'Home',
              },
              {
                value: 'office',
                label: 'Office',
              },
              {value: 'other', label: 'Other'},
            ]}
          />
        </SafeAreaView>
        <View>
          <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
            <Text style={[styleclr.primary]}>|</Text> Type of service
          </Text>
          <Text style={{marginHorizontal: 20, textAlign: 'justify'}}>
            {workerDetail.serviceType}
          </Text>

          <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
            <Text style={[styleclr.primary]}>|</Text> Price
          </Text>
          <Text style={{marginHorizontal: 20, textAlign: 'justify'}}>
            PKR {workerDetail.price}
          </Text>
          <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
            <Text style={[styleclr.primary]}>|</Text> City
          </Text>
          <Text
            style={{
              marginHorizontal: 20,
              textAlign: 'justify',
              fontWeight: 'bold',
            }}>
            {workerDetail.city}
          </Text>
          <Text style={{marginHorizontal: 30, textAlign: 'justify'}}>
            {workerDetail.location}
          </Text>
          <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
            <Text style={[styleclr.primary]}>|</Text> Description
          </Text>
          <Text style={{marginHorizontal: 20, textAlign: 'justify'}}>
            {workerDetail.description}
          </Text>

          <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
            <Text style={[styleclr.primary]}>|</Text> Contact Us
          </Text>
          <Text
            style={{
              marginHorizontal: 20,
              textAlign: 'justify',
              fontWeight: 'bold',
            }}>
            {' '}
            <Icon name="whatsapp" style={{color: '#70e000'}} /> +923267871244
          </Text>
          <Text style={{margin: 20, textAlign: 'justify', fontWeight: 'bold'}}>
            {' '}
            <Icon name="phone" style={{color: '#000'}} /> +9232678723444
          </Text>
          <View>
            <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
              <Text style={[styleclr.primary]}>|</Text> Select Payment Method
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton.Android
                value="COD"
                status={paymentMethod === 'COD' ? 'checked' : 'unchecked'}
                onPress={() => handlePaymentMethodChange('COD')}
              />
              <Text>COD</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton.Android
                value="Bank"
                status={paymentMethod === 'Bank' ? 'checked' : 'unchecked'}
                onPress={() => handlePaymentMethodChange('Bank')}
              />
              <Text>JazzCash</Text>
            </View>
          </View>
          {showBankDetails && (
            <View>
              <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
                <Text style={[styleclr.primary]}>|</Text> Bank Details
              </Text>
              <Text>Name: Muhammad Zohaib</Text>
              <Text>Account Number: +923182483175</Text>
            </View>
          )}

          <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
            <Text style={[styleclr.primary]}>|</Text> Service provider name
          </Text>
          <Text
            style={{
              marginHorizontal: 20,
              textAlign: 'justify',
              fontWeight: 'bold',
            }}>
            {workerDetail.workerName}
          </Text>
        </View>
        <ScrollView>
          <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
            <Text style={[styleclr.primary]}>|</Text> Type Address
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            value={state.detailFromUser}
            placeholder="Enter Full Address"
            onChangeText={value => handleChange('detailFromUser', value)}
          />
          <Image
            source={require('../../assets/images/map.png')}
            style={{
              width: '100%',
              height: 100,
              alignSelf: 'center',
              marginVertical: 20,
            }}
            resizeMode="cover"
          />
        </ScrollView>

        <View style={styles.flexCenter}>
          <View>
            <Text>{selected.dateString}</Text>
          </View>

          {isloading ? (
            <TouchableOpacity
              style={[styles.btnstylish, styles.shadowProp]}
              disabled={true}>
              <Text style={styles.textlight}>Loading...</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.btn1, styles.shadowProp]}
                onPress={() => setShowModal(true)}>
                <Text style={styles.textlight}>Select Date</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnstylish, styles.shadowProp]}
                onPress={handleSubmit}>
                <Text style={styles.textlight}>Book Now</Text>
              </TouchableOpacity>
            </>
          )}
          <View style={{marginVertical: 20, alignItems: 'center'}}>
            <Text style={[styles.h3, styles.h, {marginVertical: 10}]}>
              <Text style={[styleclr.primary]}>|</Text> Rate the Service
            </Text>
            <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
              defaultRating={0}
              size={30}
              onFinishRating={setRating}
            />
            <TouchableOpacity
              style={[styles.btnstylish, styles.shadowProp]}
              onPress={storeReview}>
              <Text style={styles.textlight}>Add Rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal visible={ShowModal} animationType="fade">
        <Calendar
          style={[styles.btn, styles.shadowProp]}
          onDayPress={date => setSelected(date)}
          markingType={'period'}
          markedDates={{
            [selected.dateString]: {
              selected: true,
              endingDay: true,
              color: 'orange',
              textColor: 'gray',
            },
            [selected.dateString]: {
              disabled: true,
              startingDay: true,
              color: 'orange',
              endingDay: true,
            },
          }}
        />
        <TouchableOpacity
          style={[styles.btn, styles.shadowProp]}
          onPress={handleDate}>
          <Text style={{textAlign: 'center'}}>Ok</Text>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}
