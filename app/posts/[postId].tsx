import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

const PostDetailScreen = () => {
    const { state } = useAppContext();
    const { postId } = useLocalSearchParams();
    const [post, setPost] = useState<{ title: string; body: string } | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch post details when the component mounts
    // region Fetch post details
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    // StyleSheets here..
    // region Styles
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            padding: 20,
            backgroundColor: state.theme === 'dark' ? '#121212' : '#f9f9f9',
        },
        card: {
            backgroundColor: state.theme === 'dark' ? '#222' : '#fff',
            borderRadius: 8,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            color: state.theme === 'dark' ? '#eae9e9' : '#333',
        },
        body: {
            fontSize: 16,
            lineHeight: 24,
            color: state.theme === 'dark' ? '#eae9e9' : '#666',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: state.theme === 'dark' ? '#121212' : '#f9f9f9',
        },
        loadingText: {
            marginTop: 10,
            fontSize: 16,
            color: state.theme === 'dark' ? '#eae9e9' : '#666',
        },
        errorText: {
            fontSize: 16,
            color: '#e53935',
        },
    });

    // region Rendering Contidion
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
                <Text style={styles.loadingText}>Loading post...</Text>
            </View>
        );
    }

    if (!post) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Failed to load post. Please try again.</Text>
            </View>
        );
    }

    // Render post details
    // region Render Post
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.body}>{post.body}</Text>
            </View>
        </ScrollView>
    );
};

export default PostDetailScreen;
