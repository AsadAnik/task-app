import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const TaskManagerScreen = () => {
    const [taskText, setTaskText] = useState<string>('');
    const { state, dispatch } = useAppContext();

    // Function to add a new task
    // region Add Task
    const addTask = () => {
        if (taskText.trim() === '') return;
        dispatch({ type: 'ADD_TASK', payload: taskText });
        setTaskText('');
    };

    // Function to toggle theme
    // region Toggle Theme
    const toggleTheme = () => {
        dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' });
    };

    // Renders the UI
    // region Render UI
    return (
        <>
            <StatusBar style={state.theme === 'light' ? 'dark' : 'light'} />
            <View style={[styles.container, { backgroundColor: state.theme === 'light' ? '#FFF' : '#333' }]}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    flexDirection: 'row',
                    paddingTop: 50,
                    backgroundColor: state.theme === 'light' ? '#FFF' : '#333',
                }}>
                    <Text style={{
                        color: state.theme === 'light' ? '#000' : '#FFF',
                        fontSize: 25,
                        fontWeight: 'bold',
                    }}>
                        Task Manage
                    </Text>

                    {/* Theme Toggle Icon */}
                    <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
                        <MaterialIcons
                            name={state.theme === 'light' ? 'brightness-4' : 'brightness-7'}
                            size={24}
                            color={state.theme === 'light' ? '#000' : '#fff'}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 16, marginTop: 30 }}>
                    <TextInput
                        style={[styles.input, {
                            backgroundColor: state.theme === 'light' ? '#FFF' : '#555',
                            color: state.theme === 'light' ? '#000' : '#FFF',
                        }]}
                        placeholder="Add a task"
                        value={taskText}
                        onChangeText={setTaskText}
                    />
                    <Button title="Add Task" onPress={addTask} />
                </View>

                {/* Task List */}
                <FlatList
                    data={state.tasks.filter((task) => !task.deleted)}
                    renderItem={({ item }) => (
                        <View style={styles.task}>
                            <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_COMPLETE_TASK', payload: item.id })}>
                                <Text style={[styles.taskText, item.completed && styles.completedTask, { color: state.theme === 'light' ? '#000' : '#FFF' }]}>
                                    {item.text}
                                </Text>
                            </TouchableOpacity>

                            <Button
                                title="Delete"
                                onPress={() => dispatch({ type: 'DELETE_TASK', payload: item.id })}
                                color="red"
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />

                {/* Deleted Tasks Section */}
                <Text style={[styles.deletedHeader, { color: state.theme === 'light' ? '#000' : 'red' }]}>Deleted Tasks</Text>
                <FlatList
                    data={state.tasks.filter((task) => task.deleted)}
                    renderItem={({ item }) => (
                        <View style={styles.task}>
                            <Text style={{ color: state.theme === 'light' ? '#000' : '#f07777' }}>{item.text}</Text>

                            <Button
                                title="Restore"
                                onPress={() => dispatch({ type: 'RESTORE_TASK', payload: item.id })}
                                color="green"
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </>
    );
};

// StyleSheets..
// region Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    task: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    taskText: {
        fontSize: 16
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: 'gray'
    },
    deletedHeader: {
        marginTop: 20,
        fontWeight: 'bold'
    },
    themeToggle: {
        // marginTop: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginLeft: 20,
    }
});

export default TaskManagerScreen;
