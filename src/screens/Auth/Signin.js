import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

import styles from '../Styles/Style'
import styleclr from '../Styles/Styleclr'
import auth from '@react-native-firebase/auth';

import notify from '../../config/global';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const initialState = { email: "", password: "" }


export default function Signin({ navigation }) {
  const [loading, setisloading] = useState(false)

  const [state, setState] = useState(initialState)

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }
  const handleSubmite = () => {
   

    const { email, password } = state
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if ( !email) {
      return notify("plz Enter Email"," formate like: abc@gmail.com", "error");
    }
    if (!validRegex.test(email)) {
      return notify("Invalid Email Format"," formate like: abc@gmail.com", "error");
    }

    if (password.length < 6) {
      return notify("Invalid Password","Password length minimum 6 character", "error");
    }
    let userData = { email, password }
    setisloading(true)
    createUser(userData)
    setState(initialState)
  }
  const createUser = (userData) => {
   
    auth().signInWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
       notify("User Signin Successfully!","wellcome to bookservice app", "success");
       setisloading(false)
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setisloading(false)
          return notify("Email Error","That email address is already register!", "error");
        }

        if (error.code === 'auth/invalid-email') {
          setisloading(false)
          return notify("Email|Password Error","plz try again", "error");
        }
        setisloading(false)
        return notify("Email|Password Error","plz try again", "error");
      });
     
  }

  return (
    <View style={[styles.flexCenter, styles.flexContainer, { backgroundColor: "#fff" }]}>
      <Text style={styles.h1}>SignIn</Text>
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
        placeholder='Enter your password'
        placeholderTextColor={"#D1D3D4"}
        value={state.password}
        secureTextEntry
        onChangeText={value => handleChange("password", value)}
      />

      <View>
        {loading?
        <TouchableOpacity
          style={[styles.btn, styles.shadowProp, { minWidth: "90%", alignItems: "center" }]}
          activeOpacity={0.5}
          onPress={handleSubmite}
          disabled={true}
          >
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          </TouchableOpacity>
        :
        <TouchableOpacity
          style={[styles.btn, styles.shadowProp, { minWidth: "90%", alignItems: "center" }]}
          activeOpacity={0.5}
          onPress={handleSubmite}
        >
          <Text >Singin</Text>
        </TouchableOpacity>

        }
      </View>
      <View>
        <Text>If Don't have an account.<Text onPress={() => { navigation.navigate("Signup") }} style={styleclr.primary} >SignUp</Text> here</Text>
      </View>
    </View>
  )
}