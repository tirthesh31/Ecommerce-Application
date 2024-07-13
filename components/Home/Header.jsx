import React from 'react';
import { View, Text, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

const Header = () => {
  const { user } = useUser();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>{user?.fullName.toUpperCase()}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="black" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Nunito-VariableFont_wght',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom:5,
    width: '95%',  // Adjusted width to a percentage for responsiveness
    alignSelf: 'center',  // Center the container horizontally within its parent
    fontSize:20,
    borderColor:'rgba(127, 87, 220, 0.2)',
    borderWidth:2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Header;
