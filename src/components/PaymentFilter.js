import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

const PaymentFilter = ({data, selectedItem, onSelectItem}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              item.id === selectedItem && styles.selectedItem,
            ]}
            onPress={() => onSelectItem(item?.id)}>
            <Text
              style={[
                styles.categoryTitle,
                item.id === selectedItem && styles.selectedItem,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingVertical: 10,
  },
  categoryItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: 'black',
    color: '#fff',
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PaymentFilter;
