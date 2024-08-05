import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { collection, query, getDocs } from 'firebase/firestore';
import CategoryItem from '../../components/Home/CategoryItem'; // Import the default export correctly
import { db } from '../../configs/FirebaseConfig'; // Import db from your Firebase config
import { useRouter } from 'expo-router';

export default function Category({explore=false,onCategorySelect}) {
    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        GetCategoryList();
    }, []);

    const GetCategoryList = async () => {
        try {
            const q = query(collection(db, 'Category'));
            const querySnapshot = await getDocs(q);

            const categories = [];
            querySnapshot.forEach(doc => {
                categories.push({ id: doc.id, ...doc.data() }); // Include the document ID
            });
            setCategoryList(categories);
        } catch (error) {
            console.error("Error fetching category list: ", error);
        }
    };

    const handleCategoryPress = (categoryName) => {
        const encodedCategoryName = encodeURIComponent(categoryName);
        const route = `/businesslist/${categoryName}`;
        try {
            if(!explore){
                router.push(route)
            }else{
                onCategorySelect(categoryName)   
            }
            
        } catch (error) {
            console.error('Navigation error:', error);
        }
    };

    return (
        <View>
            {!explore&&<View style={{
                padding: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "Nunito-VariableFont_wght",
                    fontWeight: "bold"
                }}>Category</Text>
                <Text style={{
                    color: Colors.PRIMARY,
                    fontFamily: "Nunito-VariableFont_wght",
                    fontWeight: "bold"
                }}>View all</Text>
            </View>}
            <FlatList 
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                    marginLeft:20
                }}
                keyExtractor={(item) => item.id} // Use document ID for unique key
                renderItem={({ item }) => (
                    <CategoryItem 
                        category={item}
                        onCategoryPress={() => {
                            handleCategoryPress(item.name); // Call the handler
                        }} 
                    />
                )}
            />
        </View>
    );
}
