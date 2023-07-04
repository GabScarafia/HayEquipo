import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
      },
      inputContainer: {
        marginBottom: 16,
      },
      label: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: 'bold',
      },
      input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: "white",
      },  
      errorText: {
        color: 'red',
      },
    
})
