import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import FlashcardScreen from './flash/FlashcardScreen'
import Quizzes from './Quiz/Quizzes'
import QuizScreen from './Quiz/QuizScreen'
import Languagee from './Language/Language'
import FlashcardCategory from './Language/FlashcardCategory'
import QuizLanglist from './Quiz/QuizLanglist';
import ProfileScreen from '../screens/ProfileScreen';
import Language from './Language/Language'


const Stack = createStackNavigator();

const App = () => {
  return (
    <>

     <Stack.Navigator initialRouteName="Home">
     <Stack.Screen name="Lang" component={Languagee} />
     <Stack.Screen name="Profile" component={ProfileScreen} />
     <Stack.Screen name="Login" component={LoginScreen} />
     <Stack.Screen name ="Home" component={HomeScreen} />
     <Stack.Screen name ="QuizLang" component={QuizLanglist} />
     <Stack.Screen name ="Quizzes" component={Quizzes} />
     <Stack.Screen name ="Quiz" component={QuizScreen} />
     <Stack.Screen name ="New Language" component={Language} />
     <Stack.Screen name ="Category" component={FlashcardCategory} />
     <Stack.Screen name ="Flashcards" component={FlashcardScreen} />

      </Stack.Navigator>

      </>
  );
};

export default App;