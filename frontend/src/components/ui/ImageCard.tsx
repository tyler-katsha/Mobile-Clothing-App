import { Image, StyleSheet,  Pressable} from 'react-native';
import {ExtendedImageCardProps} from "@/app/types/Image";
import React from "react";
import {Ionicons} from "@expo/vector-icons";

const ImageCard: React.FC<ExtendedImageCardProps> = ({imageUrl,onPress,favorite,onFavoriteToggle}) => {
    return(
        <Pressable
            onPress={onPress}
            style={({pressed}) => [styles.cardContainer, pressed && {opacity: 0.85}]}>
            <Pressable
                style={styles.favoriteButton}
                onPress={onFavoriteToggle}>
                <Ionicons
                    name={favorite ? "star" : "star-outline"}
                    size={20}
                    color={favorite ? "#FFD700" : "#FFF"}
                />
            </Pressable>
            <Image
                source={{uri:imageUrl}}
                style={styles.image}
                resizeMode='cover'
            />

        </Pressable>
    )
}
export default ImageCard;

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        maxWidth: '100%',
        aspectRatio: 1,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)', // Subtle highlight border,
        overflow: 'hidden',
        backgroundColor: '#1E293B'
    },
    favoriteButton: {
        position: 'absolute', top: 10, right: 10, zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)', width: 32, height: 32,
        borderRadius: 16, alignItems: 'center', justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    textOverlay: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },
    titleText : {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    }
})