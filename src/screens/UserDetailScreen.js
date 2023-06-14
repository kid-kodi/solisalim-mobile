import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BASE_API_URL} from '@env';
import {useUser} from '../contexts/UserProvider';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useApi} from '../contexts/ApiProvider';
import ImagePicker from 'react-native-image-crop-picker';
import {AndroidCameraPermission} from '../helpers/AndroidPermissions';
import Navigations from '../constants/Navigations';
import Screen from '../components/Screen';
import Header from '../components/Header';

export default function UserDetail({route, navigation}) {
  const user = route.params;
  console.log('####');
  console.log(user);
  return (
    <Screen>
      <Header title="Profile" isBack={true} />
      <ScrollView style={{flex: 1, paddingHorizontal: 12}}>
        <View style={styles.userInfoSection}>
          <View
            style={{
              flexDirection: 'row',
              padding: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: '#eee',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: `${BASE_API_URL}/image/${
                      user?.profilePicture
                        ? user?.profilePicture
                        : 'profile.png'
                    }`,
                  }}
                />
              </TouchableOpacity>
              <View style={{marginLeft: 20}}>
                <Text
                  style={{
                    marginBottom: 5,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  {user?.firstName + ' ' + user?.lastName}
                </Text>
                <Text style={styles.caption}>{user?.email}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Navigations.MY_ITEMS)}>
            <View style={styles.menuItem}>
              <SimpleLineIcons name="layers" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Mes Articles</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <SimpleLineIcons name="wallet" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Mes Abonnements</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <SimpleLineIcons name="bulb" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <SimpleLineIcons name="settings" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#eee',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
