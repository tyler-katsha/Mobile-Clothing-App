import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CameraUploadButton from '@/components/buttons/CameraUploadButton';
import GalleryUploadButton from '@/components/buttons/GalleryUploadButton';

export default function ImagePreview(){
    const [imageUri, setImageUri] = useState<string | null>(null);
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Add New Clothing Item</Text>

            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.preview} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>No image selected</Text>
                </View>
            )}

            <CameraUploadButton onImageSelected={(uri) => setImageUri(uri)} />
            <GalleryUploadButton onImageSelected={(uri) => setImageUri(uri)} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    preview: { width: '100%', height: 250, borderRadius: 10, marginBottom: 15 },
    placeholder: { width: '100%', height: 250, backgroundColor: '#eee', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    placeholderText: { color: '#666' }
});