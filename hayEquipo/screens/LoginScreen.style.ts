import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    title:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },

    textTitle:{
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24,
    },

    view:{
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    inputContainer: {
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: 16,
    },

    registerButtonContainer: {
      height:40,
      paddingHorizontal: 16,
    },
    registerButton: {
      backgroundColor: 'rgba(245, 39, 39, 1)',
      alignItems:'center', justifyContent:"center",
      height:36,
       borderRadius: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    registerButtonText: {
      color: "white",
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
});