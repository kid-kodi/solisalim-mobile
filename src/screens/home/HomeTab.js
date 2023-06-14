import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import ImageSlider from '../../components/ImageSlider';
import RecentsPost from '../../components/RecentsPost';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function HomeTab({setSelectedTab}) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView style={{height: '100%'}}>
          <ImageSlider />
          <RecentsPost
            title={'Récemments Ajoutés'}
            setSelectedTab={setSelectedTab}
            apiUrl={`/api/dash/recents`}
          />
          <RecentsPost
            title={'Populaires'}
            setSelectedTab={setSelectedTab}
            apiUrl={`/api/dash/popular`}
          />
          <RecentsPost
            title={'Exclusifs'}
            setSelectedTab={setSelectedTab}
            apiUrl={`/api/dash/exclusif`}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', marginBottom: 60},
  imageSlider: {
    marginBottom: 20,
  },
  wrap: {width: WIDTH, height: HEIGHT * 0.33},
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  doActive: {
    margin: 3,
    color: 'black',
  },
  dot: {margin: 3, color: 'white'},
  section: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: '800',
    fontSize: 20,
    color: '#777',
    paddingHorizontal: 12,
  },
  headerButton: {
    paddingHorizontal: 12,
  },
  headerButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'black',
    marginTop: 5,
  },
});
