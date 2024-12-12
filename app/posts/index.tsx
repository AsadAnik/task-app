import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

const PostsScreen = () => {
    const { state } = useAppContext();
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Fetch posts when the component mounts
    // region Fetch posts
    const fetchPosts = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
            );
            const data = await response.json();

            // Avoid duplicates by merging posts and filtering out existing ones
            setPosts((prevPosts) => {
                const newPosts = data.filter(
                    (newPost: any) => !prevPosts.some((post) => post.id === newPost.id)
                );
                return [...prevPosts, ...newPosts];
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch posts on component mount
    // region useEffect
    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    // StyleSheets here..
    // region Styles
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 5,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: state.theme === 'dark' ? '#121212' : '#fff',
        },
        postContainer: {
            backgroundColor: state.theme === 'dark' ? '#222' : '#fff',
            padding: 15,
            borderRadius: 10,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 3,
        },
        postTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: state.theme === 'dark' ? '#eae9e9' : '#000',
            textTransform: 'capitalize',
        },
    });

    // Renders the JSX
    // region Render
    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.postContainer}
                        onPress={() => router.push(`/posts/${item.id}`)}
                    >
                        <Text style={styles.postTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={() => fetchPosts(1)} />
                }
                onEndReached={() => setPage((prev) => prev + 1)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading ? <ActivityIndicator size="large" color="#007bff" /> : null
                }
            />
        </View>
    );
};

export default PostsScreen;
