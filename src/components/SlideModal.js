import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SlideModal = ({modalVisible, setModalVisible, children}) => {
  const slideAnimation = new Animated.Value(0);

  const handleToggleModal = () => {
    Animated.timing(slideAnimation, {
      toValue: modalVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(!modalVisible));
  };

  const modalTranslateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0], // Adjust the output range as needed for your modal height
  });

  return (
    <View style={styles.container}>
      {modalVisible && (
        <Animated.View
          style={[styles.modal, {transform: [{translateY: modalTranslateY}]}]}>
          {children}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'blue',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SlideModal;
