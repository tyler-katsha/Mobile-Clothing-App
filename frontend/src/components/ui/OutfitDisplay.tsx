import {View,Image,StyleSheet} from 'react-native';
import {FemaleMannequin, MaleMannequin} from "@/components/ui/Mannequin";
import {ClothingLayer,OutfitDisplayProps} from "@/app/types/Clothing";

export const OutfitDisplay = ({ bodyType, clothingLayers }: OutfitDisplayProps) => {
    return (
        <View style={styles.canvasContainer}>
            <View style={styles.absoluteFill}>
                {bodyType === 'FEMALE' ? <FemaleMannequin /> : <MaleMannequin />}
            </View>

            {clothingLayers
                .sort((a:ClothingLayer, b:ClothingLayer) => a.zIndex - b.zIndex) // Ensure correct rendering order
                .map((layer:ClothingLayer) => (
                    <Image
                        key={layer.id}
                        source={{ uri: layer.canvasImageUrl }}
                        style={[styles.absoluteFill, { zIndex: layer.zIndex }]}
                        resizeMode="contain"
                    />
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    canvasContainer: {
        width: 250, // Display width on mobile
        height: 500, // Maintain the 1:2 aspect ratio of the 500x1000 viewBox
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f3f4f6', // Light gray background to make the black mannequin pop
        borderRadius: 16,
    },
    absoluteFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
});