import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../components/Screen';
import Header from '../components/Header';
import {BASE_API_URL} from '@env';
import {useApi} from '../contexts/ApiProvider';
import {useIsFocused} from '@react-navigation/native';
import Navigations from '../constants/Navigations';

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

export default function UserList({navigation}) {
  const api = useApi();
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const response = await api.get(`/api/users/byrole/admin`);
        if (!response.error) {
          setUsers(response);
        }
      })();
    }
  }, [isFocused]);

  return (
    <Screen>
      <Header
        title="Administrateurs"
        isBack={true}
        rightText={'Créer'}
        onRight={() => navigation.navigate(Navigations.USER_FORM, {})}
      />
      <View style={styles.container}>
        <View>
          <FlatList
            ListEmptyComponent={myListEmpty}
            data={users}
            renderItem={({item}) => (
              <Item
                onPress={() =>
                  navigation.navigate(Navigations.USER_DETAILS, item)
                }
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
