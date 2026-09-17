import { View, Text, ScrollView, StyleSheet } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useTheme} from "@/hooks/useTheme";

export default function PrivacyPolicy(){

    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>

                <Text style={[styles.title, { color: colors.text }]}>
                    Privacy Policy
                </Text>

                <Text style={[styles.lastUpdated, { color: colors.textMuted }]}>
                    Last updated: September 16, 2026
                </Text>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.sectionHeading, { color: colors.primary }]}>
                        1. Information We Collect
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.text }]}>
                        We collect information you provide directly to us when creating an account, updating your digital wardrobe profile, or communicating with us. This may include your name, email address, and wardrobe preferences.
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.sectionHeading, { color: colors.primary }]}>
                        2. How We Use Your Information
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.text }]}>
                        We use the information we collect to provide, maintain, and improve our services—such as synchronizing your clothing items across devices, processing background removals for your digital closet, and personalizing your styling experience.
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.sectionHeading, { color: colors.primary }]}>
                        3. Data Security
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.text }]}>
                        We implement appropriate technical and organizational measures to protect your personal data and account settings against unauthorized access, alteration, disclosure, or destruction.
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.sectionHeading, { color: colors.primary }]}>
                        4. Contact Us
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.text }]}>
                        If you have any questions about this Privacy Policy, please feel free to reach out to our support team through the app's Help Center.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    lastUpdated: {
        fontSize: 13,
        marginBottom: 24,
    },
    card: {
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 20,
        marginBottom: 16,
    },
    sectionHeading: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 15,
        lineHeight: 22,
    },
});