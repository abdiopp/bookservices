import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const AuthContaxt = createContext()
const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "Login":
            return ({ isAuth: true, user: payload.userData })
        case "Logout":
            return ({ isAuth: false, user: {} })
        default:
            return state
    }
}
export default function AuthContaxtProvider(props) {
    const [isAppLoading, setIsAppLoading] = useState(true)
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                readUserProfile(user)
            } else {
                dispatch({ isAuth: false, user: {} })
                setIsAppLoading(false)
            }
        });
    }, [auth])
    const readUserProfile = (user) => {

        firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {
                let userData = documentSnapshot.data()
                dispatch({ type: "Login", payload: { userData } })
            });
       
        setIsAppLoading(false)
    }

    return (
        <AuthContaxt.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AuthContaxt.Provider>
    )
}

export const useAuthContaxt = () => useContext(AuthContaxt)