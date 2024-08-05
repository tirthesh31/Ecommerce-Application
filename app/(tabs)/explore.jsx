import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import Category from '../../components/Home/Category';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import missing functions
import { db } from '../../configs/FirebaseConfig'; 
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function Explore() { // Capitalize the component name

  const [businesslist,setBusinessList] = useState([]);
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
      console.error("Error fetching documents: ", error); // Add error handling
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore More</Text>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="black" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
        />
      </View>
      <Category 
        explore={true}
        onCategorySelect={(category) => { GetBusinessByCategory(category); }}
      />
      <ExploreBusinessList businessList={businesslist}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontFamily: 'nunito',
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
    width: '95%',  // Adjusted width to a percentage for responsiveness
    alignSelf: 'center',  // Center the container horizontally within its parent
    fontSize: 20,
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});
