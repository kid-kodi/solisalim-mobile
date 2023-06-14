import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImageSlider from '../components/ImageSlider';
import RecentsPost from '../components/RecentsPost';

export default function HomeScreen() {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{height: '100%'}}>
        <ImageSlider />
        <RecentsPost
          title={'Récemments Ajoutés'}
          apiUrl={`/api/dash/recents`}
        />
        <RecentsPost title={'Populaires'} apiUrl={`/api/dash/popular`} />
        <RecentsPost title={'Exclusifs'} apiUrl={`/api/dash/exclusif`} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
