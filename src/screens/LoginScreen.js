import React from 'react';
import { View, Text, Button} from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Login Screen!</Text>
      <Button
        title="Go to HomeScreen"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default LoginScreen;
 