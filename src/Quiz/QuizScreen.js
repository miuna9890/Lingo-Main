import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import QuizQnsData from './QuizQnsData';



  const QuizScreen = ({route, navigation}) => {
    const { category } = route.params;
    const questions = QuizQnsData[category];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selected, setSelected] = useState(null);

    {/*handling answering of question*/}
    const handleAnswerPress = (chosenAnswer) => {
        const correctAnswer = questions[currentQuestion].correctAnswer;
        if (chosenAnswer == correctAnswer) {
        setScore(score + 1);
    }

    {/*Updating question num / show final score at end of quiz*/}

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelected(null); // Reset selected option for the next question
    } else {
        setShowScore(true);
    }
};

{/*showing score*/}

if (showScore) {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Quiz Completed!</Text>
        <Text style={styles.title}>Your Score {score}/{questions.length}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QuizLang")}>
            <Text style={styles.buttonText}>Back to Categories!</Text>
        </TouchableOpacity>
    </View>
    );
}
  
const current = questions[currentQuestion]
    return (
        <View style={styles.container}>
            <Image source={{ uri: current.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{current.question}</Text>
            {current.options.map((option, index) => (
                <TouchableOpacity
                key={index}
                style={[
                    styles.optionButton,
                    selected === option && option === current.correctAnswer ? styles.correctOption : null,
                    selected === option && option !== current.correctAnswer ? styles.wrongOption : null,
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
  