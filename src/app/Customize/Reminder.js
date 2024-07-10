import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
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
    const newReminder = { reminder, completed: false};
    setReminders([...reminders, newReminder]);
    await saveReminderToSupabase(newReminder);
  };

  // Function to save a new goal to Supabase
  const handleSaveGoal = async (goal) => {
    const newGoal = { goal, completed: false };
    setGoals([...goals, newGoal]);
    await saveGoalToSupabase(newGoal);
  };

  const saveReminderToSupabase = async (reminder) => {
    try {
      const { data, error } = await supabase
        .from('reminders')
        .insert([{ user_id: userId, reminder: reminder.reminder, completed: reminder.completed  }]); // Insert reminder with user ID
      if (error) throw error;
    } catch (error) {
      console.error('Error saving reminder:', error.message);
    }
  };
   // Function to delete a reminder from Supabase
   const handleDeleteReminder = async (id) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error('Error deleting reminder');
      }

      setReminders(reminders.filter(reminder => reminder.id !== id));
    } catch (error) {
      console.error('Error deleting reminder:', error.message);
    }
  };

  const saveGoalToSupabase = async (goal) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([{ user_id: userId, goal: goal.goal, completed: goal.completed }]); // Insert goal with user ID
      if (error) throw error;
    } catch (error) {
      console.error('Error saving goal:', error.message);
    }
  };

  // Function to delete a goal from Supabase
  const handleDeleteGoal = async (id) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error('Error deleting goal');
      }

      setGoals(goals.filter(goal => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error.message);
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
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Reminders:</Text>
      {reminders.map((reminder, index) => (
         <TouchableOpacity
         key={index}
         style={[
            styles.listItemContainer,
            reminder.completed && { backgroundColor: 'lightgreen' } // Apply green background if completed
          ]}
          onPress={() => handleDeleteReminder(reminder.id)} // Use onLongPress to detect double press
        >
        <Text key={index} style={styles.listItem}>{reminder.reminder}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Goals:</Text>
      {goals.map((goal, index) => (
          <TouchableOpacity
          key={index}
          style={[
            styles.listItemContainer,
            goal.completed && { backgroundColor: 'lightgreen' } // Apply green background if completed
          ]}
          onPress={() => handleDeleteGoal(goal.id)} // Use onLongPress to detect double press
        >
        <Text key={index} style={styles.listItem}>{goal.goal}</Text>
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
      backgroundColor: '#E91E63',  /*darkpink*/
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
  });