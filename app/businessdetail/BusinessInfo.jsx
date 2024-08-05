import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native'; // Make sure to install @react-navigation/native if not already installed
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig'; // Adjust path as needed

export default function BusinessInfo({ imageUrl, name, contact, address, website, shareContent, userEmail, businessId }) {
  const { user } = useUser();
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'BusinessList', businessId));
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error('Error deleting business: ', error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Business',
      'Are you sure you want to delete this business?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: handleDelete,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{name}</Text>
          {user.primaryEmailAddress.emailAddress === userEmail && (
            <TouchableOpacity onPress={confirmDelete}>
              <Ionicons name="trash" size={24} color="red" style={styles.deleteIcon} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.iconRow}>
          <View style={styles.iconColumn}>
            <TouchableOpacity
              style={[styles.iconContainer, { backgroundColor: 'green' }]}
              onPress={() => Linking.openURL(`tel:${contact}`)}
            >
              <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Call</Text>
          </View>
          <View style={styles.iconColumn}>
            <TouchableOpacity
              style={[styles.iconContainer, { backgroundColor: 'blue' }]}
              onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`)}
            >
              <Ionicons name="location-sharp" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Location</Text>
          </View>
          <View style={styles.iconColumn}>
            <TouchableOpacity
              style={[styles.iconContainer, { backgroundColor: 'red' }]}
              onPress={() => Linking.openURL(website)}
            >
              <FontAwesome name="globe" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Web</Text>
          </View>
          <View style={styles.iconColumn}>
            <TouchableOpacity
              style={[styles.iconContainer, { backgroundColor: 'yellow' }]}
              onPress={() => shareContent()}
            >
              <MaterialCommunityIcons name="share-variant" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Share</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  overlay: {
    top: -25,
    width: '100%',
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.BLACK,
  },
  deleteIcon: {
    marginLeft: 10,
  },
  address: {
    fontSize: 16,
    color: Colors.GRAY,
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconColumn: {
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  iconLabel: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
});
