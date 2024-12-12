import React from 'react';
import { Stack } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

const PostsLayout = () => {
  const { state } = useAppContext();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: state.theme === 'dark' ? '#333' : '#fff' },
        headerTintColor: state.theme === 'dark' ? '#fff' : '#000',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Posts' }} />
      <Stack.Screen name="[postId]" options={{ title: 'Post Detail' }} />
    </Stack>
  );
};

export default PostsLayout;
