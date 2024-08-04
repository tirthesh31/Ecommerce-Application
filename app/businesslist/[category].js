import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';

export default function BusinessListByCategory() {

  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category
    })
    getBusinessList()
  }, [])

  // Get the business list with respect to the category we got from the home screen
  const getBusinessList = async () => {
    const q = query(collection(db, 'BusinessList'), where("category", '==', category))
    const querySnapshot = await getDocs(q)
    
    const businesses = [];
    querySnapshot.forEach((doc) => {
      businesses.push(doc.data());
    });
    setBusinessList(businesses);
  }

  return (
    <View style={styles.container}>
      {businessList.length > 0 ? (
        <FlatList
          data={businessList}
          renderItem={({ item }) => (
            <BusinessListCard
              business={item}
              key={item.id} // Use a unique key like item.id if available
            />
          )}
          keyExtractor={(item) => item.id} // Use a unique key like item.id if available
        />
      ) : (
        <Text style={styles.message}>No business found for this category.</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
