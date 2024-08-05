import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import BusinessListCard from './BusinessListCard';

export default function ExploreBusinessList({ businessList }) {
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={businessList}
        scrollEnabled
        keyExtractor={(item) => item.id} // Ensure each item has a unique key
        renderItem={({ item }) => (
          <BusinessListCard 
            businessInfo={item}
          />
        )}
      />
      <View style={{height:200}}>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20, // Add margin top here
  },
});
