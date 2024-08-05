import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category.name)}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}>
        <View style={{ 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: Colors.BG_ICON,
          borderRadius: 99,
          padding: 15,
          marginBottom: 5,
        }}>
          <Image 
            source={{ uri: category.imageUrl }} 
            style={{ width: 40, height: 40 }} 
          />
        </View>
        <Text style={{ 
          textAlign: 'center', 
          fontFamily: "numito",
          fontSize: 12,
        }}>
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
