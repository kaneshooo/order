import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      width:('100%'),
      backgroundColor: '#FFF',
    },
    countArea: {
      marginTop: 150,
      justifyContent: "center",
      alignItems: "center", 
      marginBottom:30
    },
    buttonArea: {
      marginTop: 5,
      justifyContent: 'center',
      alignItems: 'center'  
    },
    value: {
      fontSize: 30
    },
    topbutton: {
      marginTop: 50
    },
    button: {
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: ('60%'),
      height: 80,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#fff'
    },
    buttonText: {
      fontSize: 25,
      color: '#fff',
      alignItems: 'center' 
    },
    buttonUp: {
      backgroundColor: '#A53434',
      fontWeight: "bold"
    },
    buttonUpText: {
      backgroundColor: 'red'
    },
    buttonMinus: {
      backgroundColor: '#343EA5'
    },
    buttonTimes: {
      backgroundColor: 'purple'
    },
    buttonDivide: {
      backgroundColor: "green"
    },
    buttonReset: {
      borderColor: '#AFADAD',
      marginBottom: 200
    },
    buttonResetText: {
      color: '#000',
      fontSize:25
    },
    buttonNum: {
      backgroundColor: 'grey',
      fontWeight: "bold",
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: ('35%'),
      height: 100,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#fff'
    },
    buttonEqual: {
      backgroundColor: "black"
    }
  });

  export default (styles);