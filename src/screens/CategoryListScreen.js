import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_API_URL} from '@env';
import {useApi} from '../contexts/ApiProvider';
import {useIsFocused} from '@react-navigation/native';
import Navigations from '../constants/Navigations';
import Screen from '../components/Screen';
import Header from '../components/Header';

const Item = ({image, title, description, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Image
      source={{uri: `${BASE_API_URL}/image/${image}`}}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.cardBody}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
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

export default function CategoryListScreen({navigation}) {
  const api = useApi();
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const response = await api.get(`/api/categories/all`);
        if (!response.error) {
          setCategories(response);
        }
      })();
    }
  }, [isFocused]);

  return (
    <Screen>
      <Header
        title={'Categories'}
        isBack={true}
        rightText={'Créer'}
        onRight={() => navigation.navigate(Navigations.CATEGORY_FORM)}
      />

      <View style={styles.container}>
        <View>
          <FlatList
            ListEmptyComponent={myListEmpty}
            data={categories}
            renderItem={({item}) => (
              <Item
                onPress={() =>
                  navigation.navigate(Navigations.CATEGORY_STACK, {
                    screen: Navigations.CATEGORY_DETAILS,
                    params: item,
                  })
                }
                image={item.image}
                title={item.title}
                description={item.description}
              />
            )}
            keyExtractor={item => item?._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Screen>
  );
}

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    width: deviceWidth - 25,
    height: 300,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
  },
  image: {
    width: deviceWidth - 25,
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 0.9,
  },
  cardBody: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: 'red',
    fontSize: 14,
  },
});
