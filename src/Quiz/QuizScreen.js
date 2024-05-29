import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const quizData = {
    Fruits: [
      { question: 'Apple?', options: ['ringo', 'momo', 'nashi'], correctAnswer: 'ringo' ,  imageUrl: 'https://t4.ftcdn.net/jpg/02/52/93/81/360_F_252938192_JQQL8VoqyQVwVB98oRnZl83epseTVaHe.jpg'},
      { question: 'Banana?', options: ['nashi', 'banana', 'ringo'], correctAnswer: 'banana', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrYhu9yuMOM-HWBIeYqA89H6Bqf9ccB1Eumw&s' },
    ],
    Alphabets: [
      { question: 'A?', options: ['あ', 'い', 'え'], correctAnswer: 'あ', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Unicode_0x0041.svg/1200px-Unicode_0x0041.svg.png' },
      { question: 'B?', options: ['び', 'え', 'い '], correctAnswer: 'び', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Unicode_0x0042.svg/800px-Unicode_0x0042.svg.png' },
    ],
    Animals: [
      { question: 'Dog?', options: ['犬(inu)', '鼠(nezumi)', '鶏(niwatori)'], correctAnswer: '犬(inu)', imageUrl: 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg' },
      { question: 'Cat?', options: ['猫(neko)', '鶏(niwatori)', '鼠(nezumi)'], correctAnswer: '猫(neko)', imageUrl: 'https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg' },
    ],
  };

  const QuizScreen = ({route, navigation}) => {
    const { category } = route.params;
    const questions = quizData[category];
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
  