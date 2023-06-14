import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Header({
  headerTextStyle,
  leftIcon,
  rightIcon,
  title,
  isBack,
  onBack,
  leftText = 'Retour',
  rightText,
  onRight,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {isBack && (
          <TouchableOpacity
            onPress={!!onBack ? onBack : () => navigation.goBack()}>
            {!!leftIcon ? (
              <Image source={leftIcon} style={styles.icon} resizeMode="cover" />
            ) : (
              <Text style={styles.headerText}>{leftText}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.title}>
        <Text style={{...styles.title, ...headerTextStyle}}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={onRight}>
          {!!rightIcon ? (
            <Image source={rightIcon} style={styles.icon} resizeMode="cover" />
          ) : !!rightText ? (
            <Text style={styles.headerText}>{rightText}</Text>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  title: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  headerText: {fontSize: 14, color: 'black', fontWeight: 'bold'},
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
});
