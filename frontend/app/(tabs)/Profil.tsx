import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ProfileScreen() {
  const handleModify = () => Alert.alert('Modify', 'Modify Profile Button Pressed');
  const handleShare = () => Alert.alert('Share', 'Share Profile Button Pressed');
  const handleContact = () => Alert.alert('Contact', 'Contact Button Pressed');

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={{
          uri: 'https://via.placeholder.com/150', // Replace with the actual image URL
        }}
        style={styles.profileImage}
      />

      {/* Profile Name */}
      <Text style={styles.name}>John Doe</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.modifyButton]} onPress={handleModify}>
          <Text style={styles.buttonText}>Modify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.contactButton]} onPress={handleContact}>
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center', // Ensures the image is centered
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  modifyButton: {
    backgroundColor: '#007bff',
  },
  shareButton: {
    backgroundColor: '#28a745',
  },
  contactButton: {
    backgroundColor: '#ffc107',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
