import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors'; // Assuming you have defined Colors in your project
import { useRouter } from 'expo-router';

export default function PopularBusinessCard({ business }) {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => {
            router.push(`/businessdetail/${business.id}`);
        }}>
            <Image source={{ uri: business.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{business.name}</Text>
                <Text style={styles.address}>{business.address}</Text>
            </View>
            <View style={styles.ratingContainer}>
                <Text style={styles.rating}>4.5</Text>
                <Text style={styles.star}>⭐</Text>
                <Text style={styles.category}>{business.category}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        margin: 10,
        padding: 10,
        width: 180, // Adjust width as needed
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom:5
    },
    infoContainer: {
        height: 90, // Fixed height for name and address
        justifyContent: 'center',
        paddingVertical: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        justifyContent:'center'
    },
    address: {
        fontSize: 14,
        color: '#666',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    rating: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 5,
    },
    star: {
        fontSize: 14,
    },
    category: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.PRIMARY, // Highlighted design
        backgroundColor: '#f0f8ff', // Light background for category
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        position: 'absolute',
        right: 10,
    },
});
