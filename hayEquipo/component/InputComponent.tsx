import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface TextInputWithErrorProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error: string | null;
}

const InputComponent: React.FC<TextInputWithErrorProps> = ({
  label,
  value,
  onChangeText,
  error,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default InputComponent;
