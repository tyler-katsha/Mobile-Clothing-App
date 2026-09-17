import {ClothingRowProps} from "@/app/types/Clothing";
import {Pressable, View,Image, StyleSheet} from "react-native";
import {ChevronLeft, ChevronRight} from "lucide-react-native";
import {useTheme} from "@/hooks/useTheme";

export default function ClothingRow({items,currentIndex,onPrev,onNext,backgroundColor='transparent',borderColor='#333'}:ClothingRowProps){
    const currentItem = items[currentIndex];
    const { colors } = useTheme();
    return (
        <View style={[styles.rowContainer, { backgroundColor, borderColor }]}>
            <Pressable style={[styles.arrowButton,{backgroundColor: colors.bg,borderColor: colors.border}]} hitSlop={{ top: 20, bottom: 20, left: 30, right: 30 }} onPress={onPrev}>
                <ChevronLeft size={28} color={colors.text} />
            </Pressable>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: currentItem?.imageDetails?.originalUrl }}
                    style={styles.itemImage}
                    resizeMode='cover'
                />
            </View>

            <Pressable style={[styles.arrowButton,{backgroundColor: colors.bg,borderColor: colors.border}]} hitSlop={{ top: 20, bottom: 20, left: 30, right: 30 }} onPress={onNext}>
                <ChevronRight size={28} color={colors.text} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 160,
        width: '100%',
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    arrowButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#444',
    },
    imageContainer: {
        width: 120, // Set a clean fixed width for your center image box
        height: '85%', // Scales nicely within the row height
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: '#111',
    },
});