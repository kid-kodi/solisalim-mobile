import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ITEM_NUM = 5;

export default function BottomTab({selectedTab, setSelectedTab}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.bottomTab,
          selectedTab === 0 ? styles.bottomTabSelected : '',
        ]}
        onPress={() => setSelectedTab(0)}>
        <Image
          style={[
            styles.bottomTabIcon,
            selectedTab === 0 ? styles.bottomTabIconSelected : '',
          ]}
          source={require(`../assets/images/home.png`)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.bottomTab,
          selectedTab === 1 ? styles.bottomTabSelected : '',
        ]}
        onPress={() => setSelectedTab(1)}>
        <Image
          style={[
            styles.bottomTabIcon,
            selectedTab === 1 ? styles.bottomTabIconSelected : '',
          ]}
          source={require('../assets/images/archiver.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.bottomTab,
          selectedTab === 2 ? styles.bottomTabSelected : '',
        ]}
        onPress={() => setSelectedTab(2)}>
        <Image
          style={[
            styles.bottomTabIcon,
            selectedTab === 2 ? styles.bottomTabIconSelected : '',
          ]}
          source={require('../assets/images/video.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.bottomTab,
          selectedTab === 3 ? styles.bottomTabSelected : '',
        ]}
        onPress={() => setSelectedTab(3)}>
        <Image
          style={[
            styles.bottomTabIcon,
            selectedTab === 3 ? styles.bottomTabIconSelected : '',
          ]}
          source={require('../assets/images/note-de-musique.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.bottomTab,
          selectedTab === 4 ? styles.bottomTabSelected : '',
        ]}
        onPress={() => setSelectedTab(4)}>
        <Image
          style={[
            styles.bottomTabIcon,
            selectedTab === 4 ? styles.bottomTabIconSelected : '',
          ]}
          source={require('../assets/images/profil.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bottomTab: {
    width: 70 / ITEM_NUM + '%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabSelected: {
    backgroundColor: 'green',
    borderRadius: 50,
  },
  bottomTabIcon: {
    height: 30,
    width: 30,
  },
  bottomTabIconSelected: {
    tintColor: 'white',
  },
});
