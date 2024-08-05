import { View, Text, FlatList, StyleSheet,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';

export default function BusinessListByCategory() {

  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category
    })
    getBusinessList()
  }, [])

  // Get the business list with respect to the category we got from the home screen
  const getBusinessList = async () => {
    setLoading(true);
    const q = query(collection(db, 'BusinessList'), where("category", '==', category))
    const querySnapshot = await getDocs(q)
    
    
    querySnapshot.forEach((doc) => {
      setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}]);
    });
    
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : businessList.length > 0 ? (
        <FlatList
          onRefresh={getBusinessList}
          refreshing={loading}
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
