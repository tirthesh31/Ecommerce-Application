// Example of ExploreBusinessList handling a single item
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ExploreBusinessList({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => {
      router.push(`/businessdetail/${business.id}`)
  }}>
      <Image source={{ uri: business.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{business.name}</Text>
      <Text style={styles.address}>{business.address}</Text>
      <Text style={styles.rating}>Rating: {business.rating}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    color: 'gold',
  },
});
