import { View, Text, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo Vector Icons
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo'; // Import useAuth hook

export default function MenuList() {
  const router = useRouter();
  const { signOut } = useAuth(); // Destructure signOut function from useAuth

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await signOut(); // Perform sign out
              router.push('/login'); // Redirect to login screen after sign out
            } catch (error) {
              console.error("Error signing out: ", error);
            }
          },
        }
      ]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing app! [Insert your app or content URL here]',
        // If you want to include a URL:
        // url: 'https://example.com',
      });
    } catch (error) {
      console.error("Error sharing content: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.item, styles.orangeBackground]}
          onPress={() => router.push('/business/add-business')}
        >
          <Ionicons name="business" size={30} color="white" />
          <Text style={styles.label}>Add Business</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, styles.pinkBackground]}
          onPress={() => router.push('/business/my-business')}
        >
          <Ionicons name="briefcase" size={30} color="white" />
          <Text style={styles.label}>My Business</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.item, styles.greenBackground]}
          onPress={handleShare} // Call handleShare on press
        >
          <Ionicons name="share-social" size={30} color="white" />
          <Text style={styles.label}>Share App</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, styles.redBackground]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={30} color="white" />
          <Text style={styles.label}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 20, // Ensure the background color is circular
    elevation: 5, // Adds shadow for a more attractive look
    justifyContent: 'center', // Centers icon and text vertically
  },
  label: {
    marginTop: 5,
    fontSize: 16,
    color: 'white', // Label text color
    textAlign: 'center',
  },
  orangeBackground: {
    backgroundColor: '#FFA500', // Orange background
  },
  pinkBackground: {
    backgroundColor: '#FFC0CB', // Pink background
  },
  greenBackground: {
    backgroundColor: '#008000', // Green background
  },
  redBackground: {
    backgroundColor: '#FF0000', // Red background
  },
});
