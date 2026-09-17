import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // or use navigation.goBack() with React Navigation

export default function NotFound() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name="alert-circle-outline" size={72} color="#4F46E5" />
            </View>

            <Text style={styles.errorCode}>404</Text>
            <Text style={styles.title}>Page Not Found</Text>
            <Text style={styles.subtitle}>
                Sorry, the screen you are looking for doesn't exist or has been moved.
            </Text>

            <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                onPress={() => router.replace("/(tabs)")}>
                <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
                <Text style={styles.buttonText}>Go Back Home</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    iconContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#EEF2FF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    errorCode: {
        fontSize: 56,
        fontWeight: "800",
        color: "#1E293B",
        letterSpacing: -1,
        lineHeight: 60,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#334155",
        marginTop: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 32,
        maxWidth: 280,
        lineHeight: 22,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#4F46E5",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});