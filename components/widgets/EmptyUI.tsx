import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';

type EmptyUIProps = {
    title: string;
    type?: string;
};


const EmptyUI = ({ title, type }: EmptyUIProps) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: 15,
            fontWeight: 'bold',
            color: '#b1b1b1',
        },
    });

    return (
        <View style={styles.container}>
            {type === "deleted" ? (
                <MaterialCommunityIcons name="delete-empty-outline" size={60} color="gray" />
            ) : (
                <Fontisto name="battery-empty" size={60} color="gray" />
            )}

            <Text style={styles.text}>{title}</Text>
        </View>
    )
};

export default EmptyUI;