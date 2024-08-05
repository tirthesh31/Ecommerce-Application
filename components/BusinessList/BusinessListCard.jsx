import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors'; // Assuming you have a Colors file for consistent styling
import { useRouter } from 'expo-router';

export default function BusinessListCard({ business }) {
  const router = useRouter();
    return (
    <TouchableOpacity style={styles.card} onPress={()=>router.push('/businessdetail/'+business.id)}>
      <Image
        source={{ uri: business.imageUrl }} // Replace with actual image URL field
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.address}>{business.address}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(business.website)} style={styles.websiteContainer}>
          <Text style={styles.website}>{business.website}</Text>
        </TouchableOpacity>
        <Text style={styles.contact}>{business.contact}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1, // Optional, remove if not needed
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.BLACK, // Ensure name color is visible
  },
  address: {
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 5,
  },
  websiteContainer: {
    marginBottom: 5,
  },
  website: {
    fontSize: 14,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  contact: {
    fontSize: 14,
    color: Colors.GRAY,
  },
});
