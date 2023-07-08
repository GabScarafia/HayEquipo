import React from 'react';
import { Button, Text, View } from 'react-native';
// import { styles } from '../HomeScreen.style';
import BackButton from '../../../component/BackButton';

const SearchTeam = () => {
    
    const handleBackButton = () => {
    
    };    
    
return (
    <View /*style={styles.view}*/ >
        <BackButton onPress={handleBackButton}/>
        <Text>B</Text>    
    </View>
    //<SearchTeam>

);
}

export default SearchTeam