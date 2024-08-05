import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import UserInfo from '../../components/Profile/UserInfo'; // Ensure the import path is correct
import MenuList from '../../components/Profile/MenuList';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <UserInfo/>
      <View style={styles.menuContainer}>
        <MenuList/>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed By Tirthesh Motiwala @2024</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'space-between', // Ensures content is spaced out with footer at the bottom
  },
  header: {
    fontSize: 24, // Adjust size as needed for header4
    fontWeight: 'bold',
    marginBottom: 20, // Space between header and UserInfo component
  },
  menuContainer: {
    marginTop: 20, // Space between UserInfo and MenuList
  },
  footer: {
    paddingVertical: 10,
    alignItems: 'center', // Centers the text horizontally
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
  },
});
