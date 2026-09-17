import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

export default function LoginButton() {
    const router = useRouter();
    const { colors, isDarkMode } = useTheme();
    const { t } = useTranslation();

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' },
                pressed && styles.pressed // Slightly fades out when tapped
            ]}
            onPress={() => router.push('/auth-sheet')}>
            <Ionicons name="person-circle" size={20} color={colors.text as string} />
            <Text style={[styles.text, { color: colors.text as string }]}>
                {t("auth.loginText")}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20, // Classic Apple pill shape
        gap: 6,
    },
    pressed: {
        opacity: 0.6,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: -0.3,
    }
});