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
    modalContent: {
        height:"100%",
        width:"100%",
        backgroundColor: 'white',
        padding: 20,
      },
    modalTeam:{
        width:"100%",
        alignItems:'center', justifyContent:"center",
        paddingBottom:12,
        gap:4,
    },
    modalMid:{
        width:"100%",
        paddingVertical:12,
        gap:4,
    },
    closeButton: {
        backgroundColor: 'rgba(245, 39, 39, 1)',
        alignItems:'center', justifyContent:"center",
        height:36,
        borderRadius: 1,
        marginTop: 'auto',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalTextName:{
        fontSize:18,

    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 64,
    },
    boldText: {
        fontWeight:"bold"
    },
    modalDateContent: {
        height:"100%",
        width:"100%",
        backgroundColor: 'white',
        padding: 20, gap:5,
      },
})
