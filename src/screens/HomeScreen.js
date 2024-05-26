import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen() {
  return (
    /*Continue learning and quizzes ina a row*/
    <View style={styles.container}>

      {/*Welcome text*/}
      <Text style={styles.title}>Welcome to LingoCard!</Text>

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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Quizzes</Text>
            <Image source={{uri: "https://media.licdn.com/dms/image/D5612AQElp0Le7qEypw/article-cover_image-shrink_720_1280/0/1701747426020?e=2147483647&v=beta&t=Pfe6dJSie-wG5yZQfTRoPEbGgpzDJv7mOhB1jybLEVY"}} style={styles.image} />
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.buttonItem}> 
          {/*New Language*/}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>New Language</Text>
            <Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVv_cUUC7tpBp-03iqgyUuojItE9iX3jMlSseGCJsIRg&s"}} style={styles.image} />
          </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#E91E63", /*darkpink*/
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#E91E63',  /*darkpink*/
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10, // Add some spacing between button and image
  },
  buttonItem: {
    flexDirection: "column",
    alignItems: 'center',
    marginBottom: 20,
  },
});