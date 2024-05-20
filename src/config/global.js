import Toast from "react-native-toast-message";

const notify = (msg1, msg2, type) => {

   
    switch (type) {
        case "success":
            Toast.show({
                type: 'success',
                text1: msg1,
                text2: msg2,
              });
            break
        case "error":
            Toast.show({
                type: 'error',
                text1: msg1,
                text2: msg2,
              });
            break
        case "info":
            Toast.show({
                type: 'info',
                text1: msg1,
                text2: msg2,
              });
            break
        
        default :
        Toast.show({
            text1: msg1,
            text2: msg2,
          });
           
    }
}

export default notify;