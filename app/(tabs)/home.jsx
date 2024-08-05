import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'

export default function home() {
  return (
    <View>
      {/* Headr */}
      <Header/>
      {/* Slider */}
      <Slider/>
      {/* Category */}
      <Category/>
      {/* Business List */}
      <PopularBusiness/>
    </View>
  )
}