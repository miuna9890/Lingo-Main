import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.signInContainer}> 
        {/* Sign In */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome to</Text>

      {/* Welcome Image */}
      <Image source={require('../../../assets/logo.png')} style={styles.image} />

      {/* Welcome text */}
      <Text style={styles.title}>LINGOCARD</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8BBD0', // Light pink background color
    paddingHorizontal: 20,
  },
  signInContainer: {
    position: 'absolute',
    top: 50, 
    right: 20, 
  },
  signInText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#E91E63', // Dark pink color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#880E4F', // Darker pink color
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 30,
    color: '#880E4F', // Darker pink color
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
});
