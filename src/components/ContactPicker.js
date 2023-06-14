import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
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
import Contacts from 'react-native-contacts';
import Header from './Header';
import {AndroidContactsPermission} from '../helpers/AndroidPermissions';
import ListItem from './ListItem';

// const Item = ({item, onPress}) => (
//   <TouchableOpacity onPress={onPress} style={styles.item}>
//     <View style={styles.cardBody}>
//       <Text style={styles.title}>{item.displayName}</Text>
//     </View>
//     <SimpleLineIcons name="arrow-right" color="#777" size={25} />
//   </TouchableOpacity>
// );

// const myListEmpty = () => {
//   return (
//     <View style={{alignItems: 'center'}}>
//       <Text style={styles.item}>Aucune(s) donnée(s)</Text>
//     </View>
//   );
// };

export default function ContactPicker({handleAddItem}) {
  const isFocused = useIsFocused();
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = ({item}) => {
    handleAddItem(item);
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const permissionStatus = await AndroidContactsPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      const response = await Contacts.getAll();
      response.sort(
        (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
      );
      console.log(response);
      setContacts(response);
    }
  };

  const search = text => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setContacts(contacts);
        console.log('contacts', contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setContacts(contacts);
        console.log('contacts', contacts);
      });
    }
  };

  // const openContact = contact => {
  //   // console.log(JSON.stringify(contact));
  //   Contacts.openExistingContact(contact);
  // };

  return (
    <Fragment>
      <TouchableOpacity onPress={handleShowModal} style={styles.container}>
        <SimpleLineIcons name="user" color="#228b22" size={25} />
      </TouchableOpacity>
      <Modal visible={showModal}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.header}>
              Access Contact List in React Native
            </Text>
            <TextInput
              onChangeText={search}
              placeholder="Search"
              style={styles.searchBar}
            />
            <FlatList
              data={contacts}
              renderItem={contact => {
                return (
                  <ListItem
                    key={contact.item.recordID}
                    item={contact.item}
                    onPress={() => handleItemClick(contact)}
                  />
                );
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4591ed',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 20,
  },
  searchBar: {
    backgroundColor: '#f0eded',
    paddingHorizontal: 30,
    paddingVertical: Platform.OS === 'android' ? undefined : 15,
  },
});
