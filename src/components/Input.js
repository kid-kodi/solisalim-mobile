import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export default Input = ({
  label,
  value,
  placheHolder,
  isSecure,
  error,
  isTouched,
  errorText,
  onChangeText,
  containerStyle,
  customTextStyle,
  customInputStyle,
  ...props
}) => {
  return (
    <View style={{...containerStyle, marginBottom: 5}}>
      {label && (
        <Text
          style={{
            fontSize: 15,
            marginBottom: 5,
            fontWeight: 'bold',
            ...customTextStyle,
          }}>
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        placeholder={placheHolder}
        onChangeText={onChangeText}
        style={{...styles.inputStyle, ...customInputStyle}}
        placeholderTextColor="gray"
        {...props}
      />
      {error ? (
        <Text
          style={{
            color: '#FF5A5F',
            marginTop: 5,
            fontSize: 12,
            marginBottom: 5,
          }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#888',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
