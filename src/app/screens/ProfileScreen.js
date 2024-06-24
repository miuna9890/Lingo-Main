import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { supabase } from '../../../lib/supabase';
import * as ImagePicker from 'expo-image-picker'

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState(''); // State variable for storing the name input
  const [bio, setBio] = useState(''); // State variable for storing the bio input
  const [pic, setPic] = useState(''); // State variable for storing the profilepic input
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // State variable for storing the user ID

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession(); // Fetch the current session
      if (session) {
        setUserId(session.user.id); // Set the user ID if session is available
        fetchProfile(session.user.id); // Fetch the user's profile if available
      } else {
        console.log('Error fetching user session:', error);
      }
    };
    fetchUser(); // Call the fetchUser function
  }, []);

    // Function to fetch user's profile if available
    const fetchProfile = async (userId) => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('name, bio, profile_pic')
          .eq('user_id', userId)
          .single();
  
        if (error) {
          throw new Error('Error fetching profile');
        }
  
        if (data) {
          setName(data.name || ''); // Update name state variable if profile exists
          setBio(data.bio || ''); // Update bio state variable if profile exists
          setPic(data.profile_pic || ''); // Update pic state variable if profile exists
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false);
      }
    };

  // Function to handle profile picture selection
  const choosePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ // Limit selection to images
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Allow user to edit the image
      aspect: [4, 3], // Set aspect ratio for the image picker
      quality: 1, // Set image quality
    });

    if (!result.canceled) {
      setPic(result.uri); // Update the profilePic state with the selected image URI
    }
  };
    
  // Function to handle profile creation
  async function createProfile() {
    setLoading(true);
    const pic = pic || "https://thumbs.dreamstime.com/b/female-avatar-icon-women-clipart-png-vector-girl-avatar-women-clipart-bor-bisiness-icon-png-vector-233362315.jpg";
    
    const { error } = await supabase
      .from('profiles')
      .insert([{ user_id: userId, name, bio, profile_pic: pic}]); // Insert a new profile with user ID, name, and bio


    if (error) {
      Alert.alert('Error creating profile');
    } else {
      Alert.alert('Profile created successfully');
      navigation.navigate('Home', {name: name, bio: bio, pic: pic}); // Navigate back to Home screen and pass name and bio and pic back to Home Screen
    }
    setLoading(false);
  } //create profile and insert into thr profiles table in supabase

  const updateProfile = async () => {
    setLoading(true);
    const newPic = pic || "https://thumbs.dreamstime.com/b/female-avatar-icon-women-clipart-png-vector-girl-avatar-women-clipart-bor-bisiness-icon-png-vector-233362315.jpg";

    const { error } = await supabase
      .from('profiles')
      .update([{ user_id: userId, name, bio, profile_pic: newPic }])
      .eq('user_id', userId); // Filter to update the profile based on user_id

    if (error) {
      Alert.alert('Error updating profile');
    } else {
      Alert.alert('Profile updated successfully');
      navigation.navigate('Home', { name, bio, pic: newPic });
    }
    setLoading(false);
  };

  //function to delete profile
  const deleteProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId); //delete profile from the userid only

      if (error) {
        throw new Error('Error deleting profile');
      }

      Alert.alert('Profile deleted successfully'); //delete profile 
      navigation.navigate('Home',  { deletedProfile: true }); //navigate back to homescreen
    } catch (error) {
      console.error('Error deleting profile:', error.message);
      Alert.alert('Error deleting profile');
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={choosePic}> 
        <Text style={styles.buttonText}>Pick a Profile Picture</Text>
      </TouchableOpacity>
      
      {pic && <Image source={{ uri: pic }} style={styles.image} />}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name} // Bind the input value to the name state variable
        onChangeText={setName} // Update the name state variable when input changes
        placeholder='Write your Name here'
      />
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        value={bio}  // Bind the input value to the bio state variable
        onChangeText={setBio} // Update the bio state variable when input changes
        placeholder='Write your Bio here'
      /> 
       <Button
        title="Create / Update Profile"
        onPress={() => {
          if (name && bio && pic) {
            updateProfile();
          } else {
            createProfile();
          }
        }}
        disabled={loading}
      />
      <Button title="Delete Profile" onPress={deleteProfile} disabled={loading} />
      
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
  buttonText: {
    marginVertical: 10,
    fontSize: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});