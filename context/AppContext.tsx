import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define types for state
// region Types
type Task = {
    id: number;
    text: string;
    completed: boolean;
    deleted: boolean;
};

type AppState = {
    tasks: Task[];
    theme: 'light' | 'dark';
};

type Action =
    | { type: 'ADD_TASK'; payload: string }
    | { type: 'DELETE_TASK'; payload: number }
    | { type: 'RESTORE_TASK'; payload: number }
    | { type: 'TOGGLE_COMPLETE_TASK'; payload: number }
    | { type: 'SET_THEME'; payload: 'light' | 'dark' };


// Reducer function
// region Reducer
const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    { id: Date.now(), text: action.payload, completed: false, deleted: false },
                ],
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload ? { ...task, deleted: true } : task
                ),
            };
        case 'RESTORE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload ? { ...task, deleted: false } : task
                ),
            };
        case 'TOGGLE_COMPLETE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                ),
            };
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        default:
            return state;
    }
};


// Initial state
// region Initial state
const initialState: AppState = {
    tasks: [],
    theme: 'light',
};

// Create context
// region Context
const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});


// Context provider
// region Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
    );
};

//  Hook to use context
// region Hook
export const useAppContext = () => useContext(AppContext);
