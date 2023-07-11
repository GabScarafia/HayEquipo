import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    view:{
        height: "100%",
        width: '100%',
        paddingHorizontal:32,
        gap:8,
        paddingVertical:8,
        alignSelf:"center",
        justifyContent:'center'
    },
    pageTitle: {
        fontSize:18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginHorizontal: 10,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtext: {
        textAlign: 'center',
        // fontWeight: 'bold',
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
    escudos:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:16,
        gap:24,
    },
    modalMid:{
        width:"100%",
        paddingVertical:12,
        gap:4,
    },
    modalPlayer:{
        width:"100%", justifyContent: 'space-between',
        flexDirection: 'row', 
        alignItems: 'stretch', 
        gap:16,
    },
    modalPlayerChild:{
        flex:1,
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
        width: 75,
        height: 75,
        borderRadius: 64,
    },
    boldText: {
        fontWeight:"bold"
    },   
})
