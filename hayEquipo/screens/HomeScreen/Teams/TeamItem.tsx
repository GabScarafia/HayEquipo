import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
// import { styles } from '../HomeScreen.style';

interface Item{
    imageSource:String,
    name:String,
}
const TeamItem : React.FC<Item> = ({ imageSource, name }) => {
    return (
      <View style={styles.card}>
       {imageSource ? (
            <Image source={{ uri:`data:image/png;base64,${imageSource}` }} style={styles.image} />
        ) : (
            <Image source={require('../../../assets/default-logo.png')} style={styles.image} />
        )} 
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    );
  };
  
const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 40,
      marginRight: 16,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default TeamItem;