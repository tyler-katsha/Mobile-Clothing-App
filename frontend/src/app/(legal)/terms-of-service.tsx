import { Text, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

export default function TermsOfService() {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>

                <Text style={[styles.title, { color: colors.text }]}>
                    Terms of Service
                </Text>

                <Text style={[styles.lastUpdated, { color: colors.textMuted }]}>
                    Last updated: September 16, 2026
                </Text>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.sectionHeading, { color: colors.primary }]}>
                        1. Acceptance of Terms
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.text }]}>
                        By accessing or using our digital wardrobe and styling application, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use the application.
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.sectionHeading, { color: colors.primary }]}>
                        2. User Accounts & Cloud Sync
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.text }]}>
                        When you create an account or use cloud synchronization features, you are responsible for maintaining the security of your credentials. We reserve the right to suspend or terminate accounts that violate our security guidelines.
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.sectionHeading, { color: colors.primary }]}>
                        3. User Content & Wardrobe Data
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.text }]}>
                        You retain full ownership of any clothing photos or styling data you upload to the app. By uploading content, you grant us a temporary license to process images (such as automated background removal) strictly to provide you with your digital closet services.
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.sectionHeading, { color: colors.primary }]}>
                        4. Changes to Terms
                    </Text>
                    <Text style={[styles.paragraph, { color: colors.text }]}>
                        We may modify these terms at any time. Continued use of the application following any changes indicates your acceptance of the updated terms.
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