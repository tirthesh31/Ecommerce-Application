import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import PopularBusinessCard from './PopularBusinessCard';
import { db } from '../../configs/FirebaseConfig';

export default function PopularBusiness() {
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        GetBusinessList();
    }, []);

    const GetBusinessList = async () => {
        try {
            const q = query(collection(db, 'BusinessList'), limit(10));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                setBusinessList(prev => [...prev,{id:doc.id,...doc.data()}]);
            });
        } catch (error) {
            console.error("Error fetching business list: ", error);
        }
    };

    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Popular Business</Text>
                <Text style={styles.viewAll}>View all</Text>
            </View>
            <FlatList
                data={businessList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <PopularBusinessCard
                        business={item}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'numito',
        fontWeight: 'bold',
    },
    viewAll: {
        color: Colors.PRIMARY,
        fontFamily: 'numito',
        fontWeight: 'bold',
    },
});
