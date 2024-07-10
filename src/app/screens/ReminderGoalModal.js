import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const ReminderGoalModal = ({ visible, onClose, onSave }) => {
  const [input, setInput] = useState('');

  const handleSave = () => {
    onSave(input);
    setInput('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Set Reminder/Goal</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your reminder/goal"
          value={input}
          onChangeText={setInput}
        />
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
});

export default ReminderGoalModal;
