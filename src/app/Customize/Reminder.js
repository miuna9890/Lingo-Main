import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, Alert } from 'react-native';
import { supabase } from '../../../lib/supabase';
import ReminderGoalModal from '../screens/ReminderGoalModal';

export default function Reminder({ navigation, route }) {
  const [userId, setUserId] = useState(null); // State variable for storing the user ID
  const [reminders, setReminders] = useState([]); // State variable for storing reminders
  const [goals, setGoals] = useState([]); // State variable for storing goals
  const [modalVisible, setModalVisible] = useState(false); // State variable for modal visibility
  const [isReminder, setIsReminder] = useState(true); // State variable to determine if the modal is for reminder or goal

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession(); // Fetch the current session
      if (session) {
        setUserId(session.user.id); // Set the user ID if session is available
        fetchReminders(session.user.id); // Fetch reminders after fetching the user's session
        fetchGoals(session.user.id);
      } else {
        console.log('Error fetching user session:', error);
      }
    };
    fetchUser(); // Call the fetchUser function
  }, []);

  const fetchReminders = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('id, reminder, completed')
        .eq('user_id', userId);

      if (error) {
        throw new Error('Error fetching reminders');
      }

      if (data) {
        setReminders(data);
      }
    } catch (error) {
      console.error('Error fetching reminders:', error.message);
    }
  };
  const fetchGoals = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('id, goal, completed')
        .eq('user_id', userId);

      if (error) {
        throw new Error('Error fetching goals');
      }

      if (data) {
        setGoals(data);
      }

    } catch (error) {
      console.error('Error fetching goals:', error.message);
    }
  };

    // Function to save a new reminder to Supabase
    const handleSaveReminder = async (reminder) => {
      try {
        const { data, error } = await supabase
          .from('reminders')
          .insert([{ user_id: userId, reminder, completed: false }])
          .select();
        if (error) throw error;
  
        const newReminder = data[0]; // Retrieve the newly created reminder with ID
        setReminders([...reminders, newReminder]);
      } catch (error) {
        console.error('Error saving reminder:', error.message);
      }
    };

    // Function to save a new goal to Supabase
    const handleSaveGoal = async (goal) => {
      try {
        const { data, error } = await supabase
          .from('goals')
          .insert([{ user_id: userId, goal, completed: false }])
          .select();
        if (error) throw error;
  
        const newGoal = data[0]; // Retrieve the newly created goal with ID
        setGoals([...goals, newGoal]);
      } catch (error) {
        console.error('Error saving goal:', error.message);
      }
    };

  const deleteReminder = async (id) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
      if (error) throw error;
      // Update state to remove the deleted reminder
      setReminders(reminders.filter(reminder => reminder.id !== id));
    } catch (error) {
      console.error('Error deleting reminder:', error.message);
    }
  };

  const confirmReminderAction = (id, completed) => {
    Alert.alert(
      "Reminder Action",
      completed ? "Mark this reminder as incomplete?" : "What do you want to do with this reminder?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: completed ? "Mark as Incomplete" : "Mark as Completed", 
          onPress: () => handleMarkAsCompleted(id, !completed) 
        },
        { 
          text: "Delete", 
          onPress: () => deleteReminder(id) 
        }
      ]
    );
  };

  const deleteGoal = async (id) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
      if (error) throw error;
      // Update state to remove the deleted reminder
      setGoals(goals.filter(goals => goals.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error.message);
    }
  };

  const handleMarkAsCompleted = async (id, completed) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .update({ completed })
        .eq('id', id)
        .eq('user_id', userId);
  
      if (error) throw error;
  
      // Update state to reflect the change
      setReminders(reminders.map(reminder =>
        reminder.id === id ? { ...reminder, completed } : reminder
      ));
    } catch (error) {
      console.error('Error updating reminder:', error.message);
    }
  };
  

  const confirmGoalAction = (id, completed) => {
    Alert.alert(
      "Goal Action",
      completed ? "Mark this goal as incomplete?" : "What do you want to do with this goal?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: completed ? "Mark as Incomplete" : "Mark as Completed", 
          onPress: () => handleMarkAsCompletedGoal(id, !completed) 
        },
        { 
          text: "Delete", 
          onPress: () => deleteGoal(id) 
        }
      ]
    );
  };
  const handleMarkAsCompletedGoal = async (id, completed) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({ completed })
        .eq('id', id)
        .eq('user_id', userId);
  
      if (error) throw error;
  
      // Update state to reflect the change
      setGoals(goals.map(goal =>
        goal.id === id ? { ...goal, completed } : goal
      ));
    } catch (error) {
      console.error('Error updating goal:', error.message);
    }
  };
  
  



  return (

  <View style={styles.container}>
  <View style={styles.buttonsContainer}>
    <Button title="Set Reminder" onPress={() => { setIsReminder(true); setModalVisible(true); }} />
    <Button title="Set Goal" onPress={() => { setIsReminder(false); setModalVisible(true); }} />
  </View>

  {/* Display reminders and goals */}
  <View style={styles.listsContainer}>
    
  <View style={styles.container}>
  <Text style={styles.listTitle}>Reminders:</Text>
  {reminders.map((reminder, index) => (
    
    <TouchableOpacity
    key={reminder.id}
    style={[styles.listItemContainer, { backgroundColor: reminder.completed ? 'lightgreen' : '#f9f9f9' }]}
    onPress={() => confirmReminderAction(reminder.id, reminder.completed)}
  >
        <Text style={styles.listItem}>{reminder.reminder}</Text>
      </TouchableOpacity>
   
  ))}
</View>

  <View style={styles.container}>
  <Text style={styles.listTitle}>Goals:</Text>
  {goals.map((goal, index) => (
    
    <TouchableOpacity
    key={goal.id}
    style={[styles.listItemContainer, { backgroundColor: goal.completed ? 'lightgreen' : '#f9f9f9' }]}
    onPress={() => confirmGoalAction(goal.id, goal.completed)}
  >
        <Text style={styles.listItem}>{goal.goal}</Text>
      </TouchableOpacity>
 
  ))}
</View>
  </View>

{/* Reminder and Goal Modal */}
<ReminderGoalModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  onSave={isReminder ? handleSaveReminder : handleSaveGoal}
/>
</View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'pink',  /*darkpink*/
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    listsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    listContainer: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    listTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: "#E91E63", /*darkpink*/
    },
    listItemContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
      },
      listItem: {
        fontSize: 16,
      },
      deleteContainer: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        marginTop: 5,
        marginBottom: 5,
      },
      deleteText: {
        color: 'white',
        fontWeight: 'bold',
      },
  }); 