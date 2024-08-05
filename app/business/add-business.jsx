import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Modal, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../constants/Colors';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState(''); // State for additional email
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useUser(); // Use the user object from Clerk

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Business',
      headerShown: true,
    });

    // Request permissions
    const requestPermissions = async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        alert('Sorry, we need camera and gallery permissions to make this work!');
      }
    };

    requestPermissions();
  }, [navigation]);

  const handleImagePicker = async (source) => {
    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setModalVisible(false); // Close the modal after selecting an image      
    }
  };

  const uploadImageToFirebase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = ref(storage, `businessApp/${Date.now()}`);
    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const handleSubmit = async () => {
    try {
      if (selectedImage) {
        const imageUrl = await uploadImageToFirebase(selectedImage);

        await addDoc(collection(db, 'BusinessList'), {
          name,
          website,
          contact,
          category,
          about,
          address,
          imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress, // User's primary email
          email, // Additional email from input field
        });

        // Clear form
        setName('');
        setWebsite('');
        setContact('');
        setCategory('');
        setAbout('');
        setAddress('');
        setSelectedImage(null);
        setEmail(''); // Clear email input

        // Navigate or show success message
        alert('Business added successfully!');
      } else {
        alert('Please upload an image.');
      }
    } catch (error) {
      console.error('Error adding business: ', error);
      alert('Error adding business. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Business</Text>

      <View style={styles.imageSection}>
        <TouchableOpacity style={styles.imageButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.imageButtonText}>Upload Image</Text>
        </TouchableOpacity>

        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <Text style={styles.imageLabel}>Business Image</Text>
          </View>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Website"
        value={website}
        onChangeText={setWebsite}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Retail Heaven" value="Retail Heaven" />
          <Picker.Item label="Auto Care" value="Auto Care" />
          <Picker.Item label="Beauty Bills" value="Beauty Bills" />
          <Picker.Item label="Fun Times" value="Fun Times" />
          <Picker.Item label="Delicious Bites" value="Delicious Bites" />
          <Picker.Item label="Tech World" value="Tech World" />
          <Picker.Item label="Smart Learning" value="Smart Learning" />
          <Picker.Item label="Healthy Life" value="Healthy Life" />
        </Picker>
      </View>
      <TextInput
        style={[styles.input, styles.aboutInput]}
        placeholder="About"
        value={about}
        onChangeText={setAbout}
        multiline
        numberOfLines={6}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Modal for choosing image source */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Image Source</Text>
            <Button title="Take Photo" onPress={() => handleImagePicker('camera')} />
            <Button title="Choose from Gallery" onPress={() => handleImagePicker('library')} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  imageButton: {
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginRight: 20, // Adjusted to space out the button and image
    padding: 10,
    justifyContent: 'center',
  },
  imageButtonText: {
    color: 'white',
    marginTop: 5,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  imageLabel: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    height: '100%',
    width: '100%',
  },
  aboutInput: {
    height: 120,
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
});
