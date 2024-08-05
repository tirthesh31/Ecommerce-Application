import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import PopularBusiness from '../../components/Home/PopularBusiness';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Category */}
      <Category />
      {/* Business List */}
      <PopularBusiness />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
