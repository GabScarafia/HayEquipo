import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

interface FixedButtonProps {
  onPress: () => void;
}

const FixedButton: React.FC<FixedButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" onPress={onPress} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    // padding: 10,
  },
  button: {
    // padding: 10,
    borderRadius: 5,
  },
});

export default FixedButton;