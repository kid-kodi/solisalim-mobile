//import liraries
import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// create a component
export default Button = ({
  isLoading,
  text,
  onPress,
  customBtnStyle,
  customTextStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.btnStyle, ...customBtnStyle }}
    >
      {!!isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={{ ...styles.textStyle, ...customTextStyle }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 16,
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
  },
});
