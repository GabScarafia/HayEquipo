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
      height: "90%",
      width: '80%',
      gap:2,
      alignSelf: 'center',
    },

    input: {
        height:64,
        width: 128,
    },

    registerButtonContainer: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      paddingHorizontal: 20,
    },
    registerButton: {
      backgroundColor: 'transparent',
      alignItems:'center',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      // Estilos adicionales para el botón "Registrarse"
    },
    
});