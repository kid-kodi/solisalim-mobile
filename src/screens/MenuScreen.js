import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Screen from '../components/Screen';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Navigations from '../constants/Navigations';
import Header from '../components/Header';

const numColumns = 2;
const WIDTH = Dimensions.get('window').width;

export default function MenuScreen({navigation}) {
  const [menuItems, setMenuItems] = useState([
    // {title: 'Dashboard', icon: 'pie-chart'},
    {title: 'Administrateurs', icon: 'people', link: Navigations.USER_STACK},
    {title: 'Vendeurs', icon: 'people', link: Navigations.SELLER_STACK},
    {title: 'Clients', icon: 'people', link: Navigations.CUSTOMER_STACK},
    {title: 'Commandes', icon: 'handbag', link: Navigations.ORDER_STACK},
    {title: 'Dépenses', icon: 'cursor', link: Navigations.EXPENSE_STACK},
    {title: 'Factures', icon: 'credit-card', link: Navigations.INVOICE_STACK},
    {title: 'Categories', icon: 'grid', link: Navigations.CATEGORY_STACK},
    {title: 'Articles', icon: 'present', link: Navigations.ITEM_STACK},
  ]);
  return (
    <Screen>
      <Header title="Menu" />
      <View style={{flex: 1, margin: 12}}>
        <FlatList
          numColumns={numColumns}
          data={menuItems}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.link)}
              style={styles.menuItems}>
              <SimpleLineIcons name={item.icon} size={40} color="black" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  menuItems: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    height: (WIDTH - 100) / numColumns,
  },
  menuItemText: {
    fontSize: 16,
    paddingVertical: 10,
  },
});
