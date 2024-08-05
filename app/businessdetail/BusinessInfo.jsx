import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function BusinessInfo({ imageUrl, name, contact, address, website, shareContent }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>{name}</Text>
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
    paddingBottom:0,
    borderBottomWidth:0
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.BLACK,
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
