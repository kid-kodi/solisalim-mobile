import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useApi} from '../contexts/ApiProvider';
import {BASE_API_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';
import Header from './Header';

const Item = ({image, title, email, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Image
      source={{uri: `${BASE_API_URL}/image/${image ? image : 'profile.png'}`}}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.cardBody}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  </TouchableOpacity>
);

const myListEmpty = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.item}>No data found</Text>
    </View>
  );
};

export default function CustomerPicker({customer, setCustomer}) {
  const api = useApi();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = item => {
    setCustomer(item);
    setShowModal(false);
  };

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const response = await api.get(`/api/users/byrole/customer`);
        if (!response.error) {
          setData(response);
        }
      })();
    }
  }, [isFocused]);

  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={styles.container}>
        <Text style={styles.label}>
          {customer
            ? customer.firstName + ' ' + customer.lastName
            : 'Choisir un client'}
        </Text>
        <SimpleLineIcons name="arrow-right" color="#777" size={20} />
      </TouchableOpacity>
      <Modal visible={showModal} animationType="slide">
        <SafeAreaView style={{flex: 1}}>
          <Header title="Choisir un client" isBack={true} />
          <View style={{flex: 1}}>
            <View>
              <FlatList
                ListEmptyComponent={myListEmpty}
                data={data}
                renderItem={({item}) => (
                  <Item
                    onPress={() => handleItemClick(item)}
                    image={item?.profilePicture}
                    title={item?.firstName + ' ' + item.lastName}
                    email={item?.email}
                  />
                )}
                keyExtractor={item => item?._id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </Fragment>
  );
}

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    width: deviceWidth,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    opacity: 0.9,
  },
  cardBody: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: 'red',
    fontSize: 14,
  },
});
