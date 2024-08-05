import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import Category from '../../components/Home/Category';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig'; 
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function Explore() {

  const [businessList, setBusinessList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Function to fetch businesses based on the search term
  const searchBusinesses = async (term) => {
    try {
      const q = query(collection(db, 'BusinessList'), where('name', '>=', term), where('name', '<=', term + '\uf8ff'));
      const querySnapshot = await getDocs(q);
      const businesses = [];
      querySnapshot.forEach((doc) => {
        businesses.push({ id: doc.id, ...doc.data() });
      });
      setBusinessList(businesses);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }

  // Handle search input change
  const handleSearch = (text) => {
    setSearchTerm(text);
    searchBusinesses(text);
  };

  const GetBusinessByCategory = async (category) => {
    try {
      const q = query(collection(db, 'BusinessList'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const businesses = [];
      querySnapshot.forEach((doc) => {
        businesses.push({ id: doc.id, ...doc.data() });
      });
      setBusinessList(businesses);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }

  const renderItem = ({ item }) => (
    <ExploreBusinessList business={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore More</Text>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="black" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={handleSearch} // Update search term on change
        />
      </View>
      <Category 
        explore={true}
        onCategorySelect={(category) => { GetBusinessByCategory(category); }}
      />
      <FlatList
        data={businessList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontFamily: 'numito',
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
    fontSize: 20,
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  flatListContainer: {
    flexGrow: 1,  // Allows FlatList to grow and take full available space
  },
});
