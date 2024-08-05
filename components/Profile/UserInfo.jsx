import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function UserInfo() {
  const { user } = useUser(); // Correctly invoke the useUser hook

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.imageUrl }} // Use the user's profile image URL
        style={styles.image}
        resizeMode="cover" // Ensures the image covers the view while maintaining its aspect ratio
      />
      <Text style={styles.name}>{user?.fullName}</Text>
      <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes the image round
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});
