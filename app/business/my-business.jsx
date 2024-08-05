import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../../configs/FirebaseConfig'; // Adjust path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import BusinessListCard from '../../components/BusinessList/BusinessListCard'
export default function MyBusiness() {
  const { user } = useUser(); 
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        const businessesRef = collection(db, 'BusinessList');
        const q = query(businessesRef, where('userEmail', '==', user.primaryEmailAddress.emailAddress));
        const querySnapshot = await getDocs(q);

        const businessesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBusinesses(businessesList);
        setLoading(false);  
      } catch (error) {
        console.error('Error fetching businesses: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [user.primaryEmailAddress.emailAddress]);

  const renderBusinessItem = ({ item }) => (
    <BusinessListCard business={item} />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Business List</Text>
      <FlatList
        onRefresh={businesses}
        refreshing={loading}
        data={businesses}
        renderItem={({item,index})=>(
            <BusinessListCard business={item} key={index}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
