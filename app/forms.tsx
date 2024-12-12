import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAppContext } from '@/context/AppContext';

const FormScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [submittedData, setSubmittedData] = useState<{ name: string; email: string; image: string | null } | null>(null);
    const router = useRouter();
    const { state } = useAppContext();

    // Request permissions for accessing media
    // region Permissions
    const requestImagePermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return status === 'granted';
    };

    // Function to handle image picking
    // region Image Picker
    const handleImagePick = async () => {
        // Ensure the app has permission to access media library
        const hasPermission = await requestImagePermission();
        if (!hasPermission) {
            alert('Permission to access media library is required!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: (ImagePicker as any)?.MediaType?.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);  // Set the image URI from the assets array
        } else {
            console.log('Image picking was canceled or no image was selected');
        }
    };

    // Function to handle form submission
    //  region Form Submission
    const handleSubmit = () => {
        if (name && email) {
            const data = { name, email, image };
            setSubmittedData(data); // Store the submitted data
            setModalVisible(true);  // Show the success modal

            setTimeout(() => {
                setModalVisible(false);  // Hide the modal after 2 seconds
                router.push('/');  // Redirect to home screen
            }, 2000);
        } else {
            alert('Please fill in all fields!');
        }
    };

    // console.log('SET IMAGE HERE - ', image);
    // console.log('IMAGE DATA - ', submittedData?.image);

    // Styles for the components
    // region Styles
    const styles = StyleSheet.create({
        container: {
            padding: 20,
            flex: 1,
            justifyContent: 'center',
            backgroundColor: state.theme === 'light' ? '#F4F4F4' : '#353636' 
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#333',
        },
        input: {
            borderWidth: 1,
            padding: 12,
            marginBottom: 20,
            borderRadius: 8,
            borderColor: '#ccc',
            backgroundColor: state.theme === 'light' ? '#F4F4F4' : '#979a9a',
            fontSize: 16,
            color: state.theme === 'light' ? '#333' : '#F4F4F4',
        },
        imagePreview: {
            width: "100%",
            height: "100%",
            alignSelf: 'center',
            resizeMode: 'cover',
        },
        imagePreviewModal: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            resizeMode: 'cover',
        },
        submitButton: {
            marginTop: 20,
        },
        modal: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background for modal
        },
        modalContent: {
            backgroundColor: state.theme === 'light' ? '#F4F4F4' : '#353636',
            padding: 30,
            borderRadius: 12,
            alignItems: 'center',
            width: '80%',
        },
        modalTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 15,
            color: state.theme === 'light' ? '#333' : '#F4F4F4',
        },
        modalText: {
            fontSize: 18,
            color: state.theme === 'light' ? '#333' : '#F4F4F4',
            marginBottom: 10,
        },
    });

    // Render the components
    // region Renders
    return (
        <ParallaxScrollView
            headerImage={
                <Image
                    source={{ uri: image ? image : 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-sulimansallehi-1704488.jpg&fm=jpg' }}
                    style={styles.imagePreview}
                />
            }
        >
            <View style={[styles.container]}>
                {/* Name Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />

                {/* Email Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Image Picker Button */}
                <Button title="Pick a Picture" onPress={handleImagePick} color={'#ff7300'} />

                {/* Submit Button */}
                <View style={styles.submitButton}>
                    <Button title="Submit" onPress={handleSubmit} />
                </View>

                {/* Modal to display the submitted information */}
                <Modal visible={modalVisible} transparent>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Form Submitted Successfully!</Text>
                            <Text style={styles.modalText}>Name: {submittedData?.name}</Text>
                            <Text style={styles.modalText}>Email: {submittedData?.email}</Text>

                            {/* Show the image in the modal if available */}
                            {submittedData?.image && <Image source={{ uri: submittedData.image }} style={styles.imagePreviewModal} />}
                        </View>
                    </View>
                </Modal>
            </View>
        </ParallaxScrollView>
    );
};

export default FormScreen;
