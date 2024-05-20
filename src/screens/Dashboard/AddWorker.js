import { View, Text, TextInput, TouchableOpacity, Button, Platform, PermissionsAndroid, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import styles from '../Styles/Style'
import styleclr from '../Styles/Styleclr'
import firestore, { firebase } from '@react-native-firebase/firestore';
import notify from '../../config/global'
import { Picker } from '@react-native-picker/picker'
import { ActivityIndicator, MD2Colors, Surface } from 'react-native-paper'
// import { storage, getStorage, ref, uploadBytes, getDownloadURL } from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { ScrollView } from 'react-native-gesture-handler'
import { useFetchDoc } from '../../contaxts/FetchDoc'
import CategoryTable from '../../components/CategoryTable'
import globalFun from '../../constants/globalFun';

const initialState = { workerName: "", category: "", price: "", serviceType: "", mobileNumber: "", whatsappNumber: "", location: "", city: "", description: "", }
const colorArr = ["#3c096c", "#ff0054", "#653a2a", "#1f7a8c", "#4a2040", "#256d1b", "#654f6f", "#9e0059"]
export default function AddWorker() {
  const { Categories } = useFetchDoc()
  const { isModalVisible,
    setModalVisible,
    image,
    setImage,
    imageType,
    setImageType,
    imageSize,
    setImageSize,
    handleCamra,
    handleGallery, } = globalFun()
  const [loading, setisloading] = useState(false)
  const [state, setState] = useState(initialState)

  // --------------- choice file
  const pickDocument = async () => {

  };
  // ---------- add category
  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }
  const handleSubmite = () => {
    const { workerName, category, price, serviceType, mobileNumber, whatsappNumber, location, city, description } = state

    if (!workerName) {
      return notify("Workername Err", "worker name minmum length 3", "error");
    }
    if (category === "") {
      return notify("category Err", "Select category ", "error");
    }
    if (!price) {
      return notify("Price Err", "Add price ", "error");
    }
    if (!serviceType) {
      return notify("ServiceType Err", "serviceType name minmum length 3", "error");
    }
    if (!mobileNumber) {
      return notify("MobileNumber Err", "mobileNumber Correct Formate 923000000000", "error");
    }
    if (!whatsappNumber) {
      return notify("WhatsappNumber Err", "whatsappNumber Correct Formate 923000000000", "error");
    }
    if (!location) {
      return notify("Location Err", "location minmum length 3", "error");
    }
    if (!city) {
      return notify("City Err", "city name minmum length 3", "error");
    }
    if (!description) {
      return notify("Description Err", "description minmum length 3", "error");
    }

    let formData = { workerName, category, price, serviceType, mobileNumber, whatsappNumber, location, city, description };
    formData.uid = Math.random().toString(36).slice(2)
    formData.bgColor = colorArr[Math.floor(Math.random() * (7 + 1))]
    setisloading(true)
    createWorker(formData)

  }
  const createWorker = async (formData) => {
    try {

      const fileType = imageType;
      const uriPath = image;
      const Type = fileType.split('/').pop();
      const id = Math.random().toString(36).slice(2);
      const childPath = `/workers/${id}.${Type}`;
      const reference = storage().ref().child(childPath);
      await reference.putFile(uriPath);
      const URL = await reference.getDownloadURL();
      formData.imgUrl = URL
      formData.dateCreated = firebase.firestore.FieldValue.serverTimestamp(),
        await firestore().collection('workers').doc(formData.uid).set(formData);

      notify('Success', 'worker added successfully!', 'success');
      setisloading(false);
      setState(initialState);
      setImage('');
      setImageType('');
      setImageSize('');
    } catch (error) {
      console.error('Error adding worker:', error);
      notify('Error', 'worker not added!', 'error');
      setisloading(false);
    }
  };
  const handleCancel = () => {
    setFocusedText('cancel');
    setImage('');
    setState(initialState);
    setImageSize(null);
    setImageType('');
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <>
      <ScrollView>
        <View style={[styles.horizantlyCenter, styles.flexContainer, { backgroundColor: "#fff" }]}>
          <View style={[styles.horizantlyCenter, { width: "100%", marginTop: 20 }]}>
            <View>
              <View>
                {
                  image ?
                    <>
                      <Text>Type: {imageType}</Text>
                      <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
                      <Text>Size: {imageSize} KB</Text>
                    </>
                    : ""
                }

              </View>
            </View>
            <TouchableOpacity
              style={[styles.formControl, { padding: 15 }]}
              activeOpacity={0.5}
              onPress={toggleModal}
            >
              <Text >Choose image</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.formControl}
            placeholder='Enter Name'
            placeholderTextColor={"#D1D3D4"}
            value={state.workerName}
            onChangeText={value => handleChange("workerName", value)}
          />
          <Picker
            style={styles.formControl}

            selectedValue={state.category}
            onValueChange={value => handleChange("category", value)}
          >
            <Picker.Item label="Select Category" value="" />
            {
              Categories.map((item, i) => {
                return (
                  <Picker.Item label={item.category} value={item.category} style={styles.formControl} key={i}/>
                )
              })
            }

          </Picker>
          <TextInput
            style={styles.formControl}
            placeholder='Enter Worker Price'
            placeholderTextColor={"#D1D3D4"}
            keyboardType='number-pad'
            value={state.price}
            onChangeText={value => handleChange("price", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Enter Service Type'
            placeholderTextColor={"#D1D3D4"}
            value={state.serviceType}
            onChangeText={value => handleChange("serviceType", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Enter Mibile Number'
            placeholderTextColor={"#D1D3D4"}
            keyboardType='number-pad'
            value={state.mobileNumber}
            onChangeText={value => handleChange("mobileNumber", value)}
          />

          <TextInput
            style={styles.formControl}
            placeholder='Enter whatsapp Number'
            placeholderTextColor={"#D1D3D4"}
            keyboardType='number-pad'
            value={state.whatsappNumber}
            onChangeText={value => handleChange("whatsappNumber", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Enter Location'
            placeholderTextColor={"#D1D3D4"}
            value={state.location}
            onChangeText={value => handleChange("location", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Enter City'
            placeholderTextColor={"#D1D3D4"}
            value={state.city}
            onChangeText={value => handleChange("city", value)}
          />
          <View style={{ width: "100%" }}>
            <View style={{ display: "flex", alignItems: "center" }}>
              <TextInput
                style={styles.formControl}
                multiline={true}
                numberOfLines={6}
                placeholder='Enter Description'
                placeholderTextColor={"#D1D3D4"}
                value={state.description}
                onChangeText={value => handleChange("description", value)}
              />
            </View>
          </View>
          <View>
            {loading ?
              // <ActivityIndicator animating={true} color={MD2Colors.red800} />
              <TouchableOpacity
                style={[styles.btnstylish, styles.shadowProp, { minWidth: "90%", alignItems: "center" }]}
                activeOpacity={0.5}
                disabled={true}
              >
                <Text style={[styleclr.white]}>loading...</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={[styles.btnstylish, styles.shadowProp, { minWidth: "90%", alignItems: "center" }]}
                activeOpacity={0.5}
                onPress={handleSubmite}
              >
                <Text style={[styleclr.white]}>Add Worker</Text>
              </TouchableOpacity>
            }
          </View>
          <ScrollView>
            <Surface style={{ margin: 10 }}>
              {/* <CategoryTable itemsData={Categories} /> */}
            </Surface>
          </ScrollView>
        </View>
      </ScrollView>
      <View >
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType='slide'
          onRequestClose={toggleModal}
        >
          <View style={[styleclr.warninbg, styles.flexCenter, { position: "absolute", width: "100%", bottom: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20 }]}>
            <TouchableOpacity
              style={[styles.formControl, { padding: 15 }]}
              onPress={() => { handleCamra() }}
            >
              <Text style={{ textAlign: "center" }}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.formControl, { padding: 15 }]}
              onPress={() => { handleGallery() }}
            >
              <Text style={{ textAlign: "center" }}>Select from Gallery </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnstylish, { padding: 15, }]}
              onPress={toggleModal} >
              <Text style={[styleclr.white, { textAlign: "center" }]}>Cancel</Text>
            </TouchableOpacity>
          </View>

        </Modal>
      </View>
    </>
  )
}