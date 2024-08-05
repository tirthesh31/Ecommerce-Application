import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function BusinessAbout({ description }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom:20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
});
