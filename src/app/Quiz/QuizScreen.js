import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking} from 'react-native';

import { supabase } from '../../../lib/supabase';

  const QuizScreen = ({route, navigation}) => {
    const { category, language } = route.params;
    const [quizQns, setQuizQns] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selected, setSelected] = useState(null);
  
    useEffect(() => {
      async function fetchQns() {
        try {
          const { data, error } = await supabase
            .from('quiz_questions')
            .select('*')
            .eq('category_name', category) //filter by category
            .eq('language', language); //filter by language
  
          if (error) {
            console.error('Error fetching questions:', error.message);
          } else {
            setQuizQns(data);
          }
        } catch (error) {
          console.error('Error fetching questions:', error.message);
        }
      }
  
      fetchQns();
    }, [category, language]);
  
    //fetch data from supabase table
   

    {/*handling answering of question*/}
    const handleAnswerPress = (chosenAnswer) => {
        const correctAnswer = quizQns[currentQuestion].correct_answer;
        if (chosenAnswer == correctAnswer) {
        setScore(score + 1);
    }

    {/*Updating question num / show final score at end of quiz*/}

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQns.length) {
        setCurrentQuestion(nextQuestion);
        setSelected(null); // Reset selected option for the next question
    } else {
        setShowScore(true);
    }
};
const shareScoreOnWhatsApp = (score, total) => {
  const message = `I scored ${score} out of ${total} on LingoCard! Can you beat my score?`;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  Linking.openURL(url).catch(err => console.error('Error opening WhatsApp', err));
};


{/*showing score*/}

if (showScore) {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Quiz Completed!</Text>
        <Text style={styles.title}>Your Score {score}/{quizQns.length}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QuizLang")}>
            <Text style={styles.buttonText}>Back to Categories!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => shareScoreOnWhatsApp(score, quizQns.length)}>
                <Text style={styles.buttonText}>Share on WhatsApp</Text>
        </TouchableOpacity>
    </View>
    );
}
  
const current = quizQns[currentQuestion]
    return (
        <View style={styles.container}>
            <Image source={{ uri: current?.image_url }} style={styles.image} />
            <Text style={styles.title}>{current?.question}</Text>
            {current?.options.map((option, index) => (
                <TouchableOpacity
                key={index}
                style={[
                    styles.optionButton,
                    selected === option && option === current.correct_answer ? styles.correctOption : null,
                    selected === option && option !== current.correct_answer ? styles.wrongOption : null,
                ]}
                onPress={() => setSelected(option)} // colour changes upon pressing option
                >
                     <Text style={styles.optionText}>{option}</Text>
                     </TouchableOpacity>
            ))}

            <TouchableOpacity
             style={styles.nextButton}
            onPress={() => handleAnswerPress(selected)}
            disabled={!selected} //disabled until an option is selected
            >
                    <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    optionButton: {
      backgroundColor: '#E91E63',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
      width: '80%',
      alignItems: 'center',
    },
    optionText: {
      color: 'white',
      fontSize: 18,
    },
    button: {
      backgroundColor: '#E91E63',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    nextButton: {
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 200,
        backgroundColor: "lightblue"
      },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    nextButtonText: {
        color: 'black',
        fontSize: 18,
      },
    correctOption: {
        backgroundColor: 'green', // Change background color to green for correct answer
      },
    wrongOption: {
        backgroundColor: 'red', // Change background color to red for incorrect answer
      },
      image: {
        width: 200,
        height: 200,
        marginBottom: 20,
      },
  });
  
  export default QuizScreen;
  