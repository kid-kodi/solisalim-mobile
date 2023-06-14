import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Screen from '../components/Screen';
import {BASE_API_URL} from '@env';
import {useUser} from '../contexts/UserProvider';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useApi} from '../contexts/ApiProvider';
import ImagePicker from 'react-native-image-crop-picker';
import {AndroidCameraPermission} from '../helpers/AndroidPermissions';
import Navigations from '../constants/Navigations';

export default function ProfileScreen({navigation}) {
  const api = useApi();
  const {user, setUser, logout} = useUser();

  const myCustomShare = async () => {};

  const pickImage = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Image de profile', 'Choisir une options', [
        {text: 'Camera', onPress: onCamera},
        {text: 'Gallerie', onPress: onGallery},
        {text: 'Annuler', onPress: () => {}},
      ]);
    }
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('selected Image', image);
      imageUpload(image.path);
    });
  };

  const imageUpload = async imagePath => {
    const imageData = new FormData();
    imageData.append('imageMsg', {
      uri: imagePath,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    // console.log('form data', imageData);
    const response = await api.post(
      `/api/auth/me/avatar/${user._id}`,
      imageData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    if (!response.error) {
      setUser(response);
    }
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response.error) {
      alert('Erreur');
    }
  };

  // useEffect(() => {
  //   if (!user) {
  //     console.log('User does not exist');
  //     navigation.navigate(Navigations.AUTH_STACK, {screen: Navigations.LOGIN});
  //   }
  // }, [user]);
  return (
    <Screen>
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
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={styles.avatar}
                source={{
                  uri: `${BASE_API_URL}/image/${
                    user?.profilePicture ? user?.profilePicture : 'profile.png'
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
          <View style={styles.rigthSection}>
            <TouchableOpacity
              style={styles.rigthSideButton}
              onPress={() =>
                navigation.navigate(Navigations.PROFILE_FORM, {
                  user,
                })
              }>
              <SimpleLineIcons name="arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate(Navigations.MY_POSTS)}>
          <View style={styles.menuItem}>
            <SimpleLineIcons name="layers" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Mes Articles</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Navigations.MY_MESSAGES)}>
          <View style={styles.menuItem}>
            <SimpleLineIcons name="bubbles" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Mes Messages</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Navigations.SUBSCRIPTIONS)}>
          <View style={styles.menuItem}>
            <SimpleLineIcons name="wallet" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Mes Abonnements</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <SimpleLineIcons name="share" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Inviter des amis</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.menuItem}>
            <SimpleLineIcons name="logout" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Déconnexion</Text>
          </View>
        </TouchableOpacity>
      </View>
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
