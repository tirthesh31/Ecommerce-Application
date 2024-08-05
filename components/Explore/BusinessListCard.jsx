import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function BusinessListCard({ businessInfo }) {
  const router=useRouter()
  return (
    <TouchableOpacity 
    style={styles.cardContainer}
    onPress={()=> {router.push(`/businessdetail/${businessInfo?.id}`)}}
    >
      <Image
        source={{ uri: businessInfo.imageUrl }}
        style={styles.image}
        resizeMode="cover" // Ensures the image covers the view while maintaining its aspect ratio
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{businessInfo.name}</Text>
        <Text style={styles.address}>{businessInfo.address}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Adds shadow on Android
  },
  image: {
    width: '100%',
    height: 150, // Adjust based on your design requirements
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: 'gray',
  },
});
