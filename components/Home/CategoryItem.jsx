import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function CategoryItem({ category,onCategoryPress }) {
  return (
    <TouchableOpacity onPress={(category) => onCategoryPress()}>
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10, // Add padding for better spacing
    }}>
      <View style={{ 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: Colors.BG_ICON,
        borderRadius: 99,
        padding: 15,
        marginBottom: 5, // Adjust margin for spacing
      }}>
        <Image 
          source={{ uri: category.imageUrl }} 
          style={{ width: 40, height: 40 }} 
        />
      </View>
      <Text style={{ 
        textAlign: 'center', 
        fontFamily: "Nunito-VariableFont_wght",
        fontSize: 12, // Adjust font size as needed
      }}>
        {category.name}
      </Text>
    </View>
    </TouchableOpacity>
  );
}
