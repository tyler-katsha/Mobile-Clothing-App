import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

interface EditButtonProps {
    isEditing: boolean;
    onPress: () => void;
}

export default function EditButton({ isEditing, onPress }: EditButtonProps) {
    const { colors } = useTheme();

    return (
        <Pressable
            style={[styles.button, { backgroundColor: colors.surface as string, borderColor: colors.border as string }]}
            onPress={onPress}>
            <Ionicons name={isEditing ? "save" : "pencil"} size={16} color={colors.text as string} />
            <Text style={[styles.text, { color: colors.text as string }]}>
                {isEditing ? "Save Changes" : "Edit"}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: StyleSheet.hairlineWidth,
        alignSelf: 'flex-start',
        gap: 6,
        marginBottom: 16,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
    }
});