import { View, Text, StyleSheet, ScrollView, Share } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessInfo from './BusinessInfo';
import BusinessAbout from './BusinessAbout';
import BusinessReviewsAndComments from './BusinessReviewsAndComments';

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const docRef = doc(collection(db, 'BusinessList'), businessid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBusiness(data);
          setReviews(data.reviews || []);
          const initialRating = data.reviews && data.reviews.length
            ? data.reviews.reduce((acc, review) => acc + review.stars, 0) / data.reviews.length
            : 0;
          setRating(initialRating);

          // Check if the user has already reviewed
          const currentUserId = 'currentUserId'; // Replace with actual user ID
          const existingReview = data.reviews.find(review => review.userId === currentUserId);
          if (existingReview) {
            setHasReviewed(true);
          }
        }
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    };
    fetchBusiness();
  }, [businessid]);

  const shareContent = async () => {
    try {
      await Share.share({
        message: `Check out ${business.name}! Here's their website: ${business.website}`,
      });
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const handleAddReview = async () => {
    try {
      const docRef = doc(collection(db, 'BusinessList'), businessid);
      const currentUserId = 'currentUserId'; // Replace with actual user ID
      const newReview = { comment: newComment, stars: rating, userId: currentUserId };

      const updatedReviews = reviews.some(review => review.userId === currentUserId)
        ? reviews.map(review => review.userId === currentUserId ? newReview : review)
        : [...reviews, newReview];

      const averageRating = updatedReviews.reduce((acc, review) => acc + review.stars, 0) / updatedReviews.length;

      await updateDoc(docRef, {
        reviews: updatedReviews,
        averageRating: averageRating,
      });

      setReviews(updatedReviews);
      setNewComment('');
      setRating(0);
      setHasReviewed(true);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const renderStars = (stars) => {
    return (
      <View style={styles.ratingContainer}>
        {[0, 1, 2, 3, 4].map((star, index) => (
          <Text
            key={index}
            style={[
              styles.star,
              { color: stars > index ? 'gold' : 'gray' },
            ]}
          >
            ★
          </Text>
        ))}
      </View>
    );
  };

  if (!business) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <BusinessInfo
          imageUrl={business.imageUrl}
          name={business.name}
          contact={business.contact}
          address={business.address}
          website={business.website}
          shareContent={shareContent}
        />
        <BusinessAbout description={business.about} />
        <BusinessReviewsAndComments
          reviews={reviews}
          newComment={newComment}
          setNewComment={setNewComment}
          rating={rating}
          setRating={setRating}
          handleAddReview={handleAddReview}
          hasReviewed={hasReviewed}
          renderStars={renderStars}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  star: {
    fontSize: 30,
    marginRight: 5,
  },
});
