import { View, Text, FlatList,Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../../configs/FirebaseConfig';
import { collection, query, getDocs } from 'firebase/firestore'; // Ensure you're using the full Firestore library

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    try {
      const q = query(collection(db, 'Slider'));
      const querySnapshot = await getDocs(q);

      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setSliderList(list);
    } catch (error) {
      console.error("Error fetching slider list: ", error);
    }
  };

  return (
    <View>
      <Text style={{
        fontFamily:"numito",
        fontSize:20,
        paddingLeft:20,
        paddingTop:20,
        marginBottom:5,
        fontWeight:"bold"
      }}>
        #Special for you
      </Text>

      <FlatList 
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft:20}}
        renderItem={({item,index}) => (
          <Image source={{uri:item.imageUrl}}
            style={{
              width:300,
              height:160,
              borderRadius:15,
              marginRight:15
            }}
          /> 
        )}/>
    </View>
  );
}
