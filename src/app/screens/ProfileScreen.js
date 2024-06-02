import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../../../lib/supabase';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState(''); // State variable for storing the name input
  const [bio, setBio] = useState(''); // State variable for storing the bio input
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // State variable for storing the user ID

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession(); // Fetch the current session
      if (session) {
        setUserId(session.user.id); // Set the user ID if session is available
      } else {
        console.log('Error fetching user session:', error);
      }
    };
    fetchUser(); // Call the fetchUser function
  }, []);

  // Function to handle profile creation
  async function createProfile() {
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .insert([{ user_id: userId, name, bio }]); // Insert a new profile with user ID, name, and bio


    if (error) {
      Alert.alert('Error creating profile');
    } else {
      Alert.alert('Profile created successfully');
      navigation.navigate('Home'); // Navigate back to Home screen 
    }
    setLoading(false);
  } //create profile and insert into thr profiles table in supabase

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name} // Bind the input value to the name state variable
        onChangeText={setName} // Update the name state variable when input changes
      />
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        value={bio}  // Bind the input value to the bio state variable
        onChangeText={setBio} // Update the bio state variable when input changes
      />
      <Button title="Create Profile" onPress={createProfile} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 5,
  },
});