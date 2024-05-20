import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { useAuthContaxt } from '../../contaxts/AuthContaxt'
import styles from '../Styles/Style'
import styleclr from '../Styles/Styleclr'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import notify from '../../config/global'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
const initialState = { username: "", phone: "", address: "", gender: "", email: "", password: "", confirmpassword: "" }


export default function Signup({ navigation }) {
  const [loading, setisloading] = useState(false)

  const [state, setState] = useState(initialState)
  const { dispatch } = useAuthContaxt()
  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const handleSubmite = () => {
    const { username, phone, address,gender, email, password, confirmpassword } = state
    
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!username ) {
      return notify("plz Enter Username", "username length minimum 3 character ", "error");
    }
    if (username.length < 3) {
      return notify("plz Enter Username", "username length minimum 3 character ", "error");
    }

    if (!phone  ) {
      return notify("plz Enter phone", "formate like: 920000000000", "error");
    }
    if (phone.length != 12 ) {
      return notify("plz Enter phone", "Phone number not complete", "error");
    }
    if (!address ) {
      return notify("plz Enter Address", "Address length minimum 6 character ", "error");
    }
    if (address.length < 6) {
      return notify("plz Enter Address", "Address length minimum 6 character ", "error");
    }
    if (!gender ) {
      return notify("plz Select Gender", "", "error");
    }
    2
    if (!email) {
      return notify("plz Enter Email", " formate like: abc@gmail.com", "error");
    }
    if (!validRegex.test(email)) {
      return notify("Invalid Email Format", " formate like: abc@gmail.com", "error");
    }

    if (password.length < 6) {
      return notify("Enter Password", "Password length minimum 6 character ", "error");
    }
    if (confirmpassword != password) {
      return notify("Enter Confirm Password", "Password Not match", "error");
    }
    let userData = { username, phone, address,gender, email, password, confirmpassword }
    userData.role = "user"
    userData.status = "active"
    setisloading(true)
    createUser(userData)

    setState(initialState)

  }

  const createUser = (userData) => {

    auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((userCredential) => {
        // User account created & signed in!
        const user = userCredential.user;

        // Generate a UID for the user
        userData.uid = user.uid;

        // Set user data in Firestore using the generated UID
        firestore()
          .collection('users')
          .doc(userData.uid)
          .set(userData)
          .then(() => {
            dispatch({ type: "Login", payload: { userData } })
            notify("User SignUp Successfully!", "wellcome to bookservice app", "success");
            setisloading(false)
          })
          .catch((error) => {
            console.error('Error adding user data to Firestore: ', error);
          });
      })

      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setisloading(false)
          return notify("Email Error", "That email address is already register!", "error");
        }

        if (error.code === 'auth/invalid-email') {
          setisloading(false)
          return notify("Email|Password Error", "plz try again", "error");
        }
        setisloading(false)
        return notify("Email|Password Error", "plz try again", "error");
      });
  };


  const pickerRef = useRef();


  return (

    <View style={[styles.flexCenter, styles.flexContainer, { backgroundColor: "#fff" }]}>
      <Text style={styles.h1}>SignUp</Text>
      <ScrollView >

        <View style={[styles.flexCenter, styles.flexContainer]}>


          <TextInput
            style={styles.formControl}
            placeholder='Enter Username'
            placeholderTextColor={"#D1D3D4"}
            value={state.username}
            onChangeText={value => handleChange("username", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Phone Number | 920000000000'
            placeholderTextColor={"#D1D3D4"}
            keyboardType="number-pad"
            value={state.phone}
            onChangeText={value => handleChange("phone", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Enter Postal Address'
            placeholderTextColor={"#D1D3D4"}
            value={state.address}
            onChangeText={value => handleChange("address", value)}
          />
          <Picker
           style={styles.formControl}
            
            selectedValue={state.gender}
            onValueChange={value => handleChange("gender", value)}
          >
            <Picker.Item label="Male" value="male"  style={styles.formControl} />
            <Picker.Item label="Female" value="female"  />
            <Picker.Item label="Other" value="other"   style={styles.formControl}/>
          </Picker>
          <TextInput
            style={styles.formControl}
            placeholder='Enter your email'
            placeholderTextColor={"#D1D3D4"}
            keyboardType='email-address'
            value={state.email}
            onChangeText={value => handleChange("email", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Enter password'
            placeholderTextColor={"#D1D3D4"}
            secureTextEntry
            value={state.password}
            onChangeText={value => handleChange("password", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Enter confirm password'
            placeholderTextColor={"#D1D3D4"}
            secureTextEntry
            value={state.confirmpassword}
            onChangeText={value => handleChange("confirmpassword", value)}
          />

          <View>
            {
              loading ?
                <TouchableOpacity
                  style={[styles.btn, styles.shadowProp, { minWidth: "90%", alignItems: "center" }]}
                  activeOpacity={0.5}
                  onPress={handleSubmite}
                  disabled={true}
                >
                  <ActivityIndicator animating={true} color={MD2Colors.red800} />
                </TouchableOpacity>
                :
                <>
                  <TouchableOpacity
                    style={[styles.btn, styles.shadowProp, { minWidth: "90%", alignItems: "center" }]}
                    activeOpacity={0.5}
                    onPress={handleSubmite}
                  >
                    <Text >Signup</Text>
                  </TouchableOpacity>
                </>
            }
          </View>
          <View>
            <Text>If already have an account.<Text onPress={() => { navigation.navigate("Signin") }} style={styleclr.primary} >SignIn</Text> here</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}