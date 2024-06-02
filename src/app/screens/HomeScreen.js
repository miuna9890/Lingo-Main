import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (

    
    <View style={styles.container}>

      {/* Profile and Progress Section */}
  <View style={styles.profileAndProgressContainer}>

      {/*profile*/}
      <View style={styles.profileContainer}>
      <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png"}} style={styles.profileImage} />
      <TouchableOpacity style={styles.userName}>
            <Text style={styles.profileText}> Hi John Doe!</Text>    
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
        <Text style={styles.progressText}>Lessons Completed :10</Text>  
        <Text style={styles.progressText}>Quizzes Completed :10</Text>
      </View>

      </View>

      {/*Welcome text*/}
      <Text style={styles.title}>LET'S LEARN!</Text>

      <View style={styles.buttonContainer}> 

      {/*Continue learning and quizzes ina a row*/}

        <View style={styles.buttonItem}> 
          {/*Continue learning button*/}
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText}>Continue Learning!</Text>
            <Image source={{uri: "https://www.wikihow.com/images/thumb/1/12/Teach-Yourself-a-Language-Using-Flashcards-Step-7.jpg/v4-460px-Teach-Yourself-a-Language-Using-Flashcards-Step-7.jpg"}} style={styles.image} />
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