import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import FlashcardScreen from './src/flash/FlashcardScreen'
import Quizzes from './src/Quiz/Quizzes'
import QuizScreen from './src/Quiz/QuizScreen'
import Language from './src/Language/Language'
import FlashcardCategory from './src/Language/FlashcardCategory'
import QuizLanglist from './src/Quiz/QuizLanglist';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>

     <Stack.Navigator initialRouteName="Login">

     <Stack.Screen name="Login" component={LoginScreen} />
     <Stack.Screen name ="Home" component={HomeScreen} />
     <Stack.Screen name ="QuizLang" component={QuizLanglist} />
     <Stack.Screen name ="Quizzes" component={Quizzes} />
     <Stack.Screen name ="Quiz" component={QuizScreen} />
     <Stack.Screen name ="New Language" component={Language} />
     <Stack.Screen name ="Category" component={FlashcardCategory} />
     <Stack.Screen name ="Flashcards" component={FlashcardScreen} />

      </Stack.Navigator>

      </NavigationContainer>
  );
};

export default App;