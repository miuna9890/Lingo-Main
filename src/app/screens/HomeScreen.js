import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { supabase } from '../../../lib/supabase';

export default function HomeScreen({ navigation, route }) {
  const [name, setName] = useState('John Doe');
  const [pic, setPic] = useState('https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png'); // Default profile picture
  const [bio, setBio] = useState('Bio');
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [userId, setUserId] = useState(null); // State variable for storing the user ID

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession(); // Fetch the current session
        if (session) {
          setUserId(session.user.id); // Set the user ID if session is available
          await fetchProfile(session.user.id); // Fetch the user's profile if available
        } else {
          console.log('Error fetching user session:', error);
        }
      } catch (error) {
        console.log('Error fetching user session:', error);
      }
    };
    fetchUser(); // Call the fetchUser function
  }, []);

  useEffect(() => {
    if (route.params?.name) { // Check if name is passed as a parameter
      setName(route.params.name); // Update the name state variable if new name is passed
    }
    if (route.params?.bio) {
      setBio(route.params.bio);
    }
    if (route.params?.pic) {
      setPic(route.params.pic);
    }
    if (route.params?.lessonsCompleted) {
      setLessonsCompleted(route.params.lessonsCompleted);
    }
  }, [route.params]); //effect will only re-run if route.params?.name or pic or bio changes

  useEffect(() => {
    // Fetch profile data if route params are not provided
    if (!route.params) {
      fetchProfile();
    }
  }, []);
//display existing profile when sign in
  const fetchProfile = async (userId) => {
    
      const { data, error } = await supabase
        .from('profiles')
        .select('name, bio, profile_pic')
        .eq('user_id', userId)
        .single(); // Fetching the single profile for the current user

      if (data) { //if no data set back to default if not display data 
        setName(data.name || 'John Doe');
        setBio(data.bio || 'Bio');
        setPic(data.profile_pic || 'https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png');
      }
    
  };

  useEffect(() => {
    if (route.params?.deletedProfile) { //if deleted set back to default
      setName('John Doe');
      setBio('Bio');
      setPic('https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png');
    }
  }, [route.params?.deletedProfile]); //if deleted

  return (
    
    <View style={styles.container}>

      {/* Profile and Progress Section */}
  <View style={styles.profileAndProgressContainer}>

      {/*profile*/}
      <View style={styles.profileContainer}>
      <Image source={{uri: pic}} style={styles.profileImage} />
      <TouchableOpacity style={styles.userName}>
            <Text style={styles.profileText}> Hi {name}!</Text>
            <Text style={styles.profileText}> {bio}</Text>    
              <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Profile")}>
                <Text style={styles.profileButtonText}>View Profile</Text>
              </TouchableOpacity>
          </TouchableOpacity>
      </View>

      {/*progress*/}
      <View style={styles.progressContainer}>
       <TouchableOpacity>
                <Text style={styles.progressButtonText}>Your Progress</Text>
        </TouchableOpacity>
        <Text style={styles.progressText}>Lessons Completed :Lessons</Text>  
        <Text style={styles.progressText}>Quizzes Completed :Quizzes</Text>
      </View>

      </View>

      <View style={styles.buttonContainer}> 

      {/*Continue learning and quizzes ina a row*/}

        <View style={styles.buttonItem}> 
          {/*Continue learning button*/}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Reminders")}> 
            <Text style={styles.buttonText}>Customize Learning!</Text>
            <Image source={{uri: "https://www.graduateprogram.org/wp-content/uploads/2023/01/Jan-6-Goal-Setting-for-Students-for-the-New-Year_web.jpg"}} style={styles.image} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonItem}> 
          {/*Quizzes button*/}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QuizLang")}>
            <Text style={styles.buttonText}>Quizzes</Text>
            <Image source={{uri: "https://media.licdn.com/dms/image/D5612AQElp0Le7qEypw/article-cover_image-shrink_720_1280/0/1701747426020?e=2147483647&v=beta&t=Pfe6dJSie-wG5yZQfTRoPEbGgpzDJv7mOhB1jybLEVY"}} style={styles.image} />
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.NewLanguageButtonContainer}>

      <View style={styles.buttonItem}> 
          {/*New Language*/}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("New Language")}>
            <Text style={styles.buttonText}>New Language</Text>
            <Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVv_cUUC7tpBp-03iqgyUuojItE9iX3jMlSseGCJsIRg&s"}} style={styles.image} />
          </TouchableOpacity>
      </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10, // Add margin at the top for spacing
  },
  profileAndProgressContainer: {
    flexDirection: 'row', // Align items in a row
    justifyContent: "space-evenly", // Put space between profile and progress
    width: '100%', 
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#E91E63", /*darkpink*/
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "#E91E63", /*darkpink*/
  },
  NewLanguageButtonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: "#E91E63", /*darkpink*/
    },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
  },
   buttonsAndListsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  listsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  listsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  profileButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E91E63',
    borderRadius: 5,
  },
  buttonText: {
    color: '#E91E63',  /*darkpink*/
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 16,
    marginTop: 10, // Add margin at the top for spacing
  },
  progressButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10, // Add some spacing between button and image
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonItem: {
    flexDirection: "column",
    alignItems: 'center',
    marginBottom: 20,
  },
});