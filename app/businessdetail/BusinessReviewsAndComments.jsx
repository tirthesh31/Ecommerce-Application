import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function BusinessReviewsAndComments({ reviews, rating, renderStars, handleAddReview, hasReviewed }) {
  const [newComment, setNewComment] = useState('');
  const [ratingValue, setRatingValue] = useState(0);
  const navigation = useNavigation();

  const handleStarPress = (index) => {
    setRatingValue(index + 1);
  };

  const submitReview = () => {
    if (newComment.trim() && ratingValue) {
      handleAddReview(newComment, ratingValue);
      setNewComment('');
      setRatingValue(0);
    }
  };

  const navigateToAllReviews = () => {
    navigation.navigate('AllReviews', { reviews });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.reviewsSection}>
        <Text style={styles.header}>Reviews</Text>
        <View style={styles.ratingContainer}>
          {renderStars(rating)}
          <Text style={styles.ratingText}>Average Rating: {rating.toFixed(1)}</Text>
        </View>
        <Button title="View All Reviews" onPress={navigateToAllReviews} />
      </View>

      {!hasReviewed && (
        <View style={styles.commentSection}>
          <Text style={styles.header}>Leave a Review</Text>
          <View style={styles.ratingContainer}>
            {[0, 1, 2, 3, 4].map((star, index) => (
              <Text
                key={index}
                style={[styles.star, { color: ratingValue > index ? 'gold' : 'gray' }]}
                onPress={() => handleStarPress(index)}
              >
                ★
              </Text>
            ))}
          </View>
          <TextInput
            style={styles.textInput}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Write a comment..."
            multiline
          />
          <Button title="Submit Review" onPress={submitReview} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  reviewsSection: {
    marginBottom: 20,
  },
  commentSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 10,
  },
  star: {
    fontSize: 30,
    marginRight: 5,
  },
  reviewContainer: {
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 16,
  },
  reviewStars: {
    fontSize: 16,
    marginBottom: 5,
  },
  noReviews: {
    fontSize: 16,
    color: 'gray',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
