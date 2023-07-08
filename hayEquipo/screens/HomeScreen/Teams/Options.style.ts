import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    view:{
        height: "100%",
        width: '100%',
        paddingHorizontal:32,
        gap:8,
        paddingVertical:8,
    },
    startView:{
        width: '100%',
        gap:8,
        alignSelf: "flex-start",
        justifyContent:"center",
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginHorizontal: 10,
    },
    bottomView:{
        width: '100%',
        gap:8,
        alignSelf: "flex-end",
        justifyContent:"center",
    },
    container: {
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
        fontSize: 14,
        marginTop: 5,
    },
    logo: {
        width: "100%",
        height: 250,
        marginBottom: 24,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    
})
