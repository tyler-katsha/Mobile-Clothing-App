import {useTheme} from "@/hooks/useTheme";
import {Pressable, View,StyleSheet,Text} from "react-native";
import {Bookmark} from "lucide-react-native";

interface SaveButtonProps{
    onSave: () => void;
    title?:string;
}
export default function SaveOutfitButton({onSave,title='Save Outfit'}: SaveButtonProps){
    const {colors} = useTheme();

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: colors.text }, // High-contrast pill button
                    pressed && styles.buttonPressed,
                ]}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={onSave}
            >
                <Bookmark size={20} color={colors.bg} strokeWidth={2.2} />
                <Text style={[styles.buttonText, { color: colors.bg }]}>
                    {title}
                </Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 16,
        marginBottom: 32,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        borderRadius: 27,
        gap: 8,
        // Subtle drop shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.4,
    },
});