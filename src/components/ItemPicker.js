import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useApi} from '../contexts/ApiProvider';
import {BASE_API_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';

const Item = ({image, title, price, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Image
      source={{uri: `${BASE_API_URL}/image/${image ? image : 'profile.png'}`}}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.cardBody}>
      <Text style={styles.title}>{title}</Text>
      <Text>{price}</Text>
    </View>
    <SimpleLineIcons name="arrow-right" color="#777" size={25} />
  </TouchableOpacity>
);

const myListEmpty = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.item}>No data found</Text>
    </View>
  );
};

export default function ItemPicker({handleAddItem}) {
  const api = useApi();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = item => {
    handleAddItem(item);
    setShowModal(false);
  };

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const response = await api.get(`/api/products`);
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
        <SimpleLineIcons name="plus" color="#228b22" size={25} />
        <Text style={styles.label}>Ajouter un article</Text>
      </TouchableOpacity>
      <Modal visible={showModal}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View>
              <Text>Choisir un article</Text>
            </View>
            <View>
              <FlatList
                ListEmptyComponent={myListEmpty}
                data={data}
                renderItem={({item}) => (
                  <Item
                    onPress={() => handleItemClick(item)}
                    image={item?.images[0]}
                    title={item?.title}
                    price={item?.price}
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
    gap: 10,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#228b22',
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
    borderRadius: 5,
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
