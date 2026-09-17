import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    LayoutAnimation,
    Platform,
    UIManager,
    Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Help() {
    const router = useRouter();
    const { colors, isDarkMode } = useTheme();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "How do I upload clothes to my digital wardrobe?",
            answer: "Go to your Wardrobe tab and tap the '+ Add' button. You can either snap a live photo using your camera or pick an existing image from your photo gallery."
        },
        {
            question: "Are my wardrobe items and photos stored securely?",
            answer: "Yes! All local app preferences and credentials are encrypted using your device's secure hardware store. Cloud-synced items are securely transmitted to your backend database."
        },
        {
            question: "How does the weather-based 'Outfit of the Day' work?",
            answer: "Once notifications are enabled, our system checks local weather conditions and suggests cozy or lightweight outfits directly from your saved digital closet."
        },
        {
            question: "How do I reset my Face ID or passcode settings?",
            answer: "You can easily enable or disable biometric unlocking at any time under the 'Privacy & Security' section in your app settings."
        }
    ];

    const toggleFaq = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg  }]}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    style={[styles.backButton, { backgroundColor: colors.surface as string, borderColor: colors.border as string }]}
                >
                    <Ionicons name="arrow-back" size={20} color={colors.text as string} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.text as string }]}>Help Center</Text>
                <View style={{ width: 40 }} /> {/* Spacer to balance header */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Quick Support Banner */}
                <View style={[styles.bannerCard, { backgroundColor: colors.surface as string, borderColor: colors.border as string }]}>
                    <Ionicons name="headset-outline" size={32} color={colors.primary as string} />
                    <View style={styles.bannerTextContainer}>
                        <Text style={[styles.bannerTitle, { color: colors.text as string }]}>Need direct assistance?</Text>
                        <Text style={[styles.bannerSubtitle, { color: isDarkMode ? '#aaa' : '#666' }]}>Our support team is available 24/7 to help you manage your style.</Text>
                    </View>
                </View>

                {/* FAQ Section Header */}
                <Text style={[styles.sectionTitle, { color: colors.text as string }]}>Frequently Asked Questions</Text>

                {/* FAQ Accordion List */}
                {faqs.map((faq, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <View
                            key={index}
                            style={[
                                styles.faqCard,
                                { backgroundColor: colors.surface as string, borderColor: colors.border as string }
                            ]}>
                            <Pressable style={styles.faqQuestionRow} onPress={() => toggleFaq(index)}>
                                <Text style={[styles.faqQuestionText, { color: colors.text as string }]}>{faq.question}</Text>
                                <Ionicons
                                    name={isExpanded ? "chevron-up" : "chevron-down"}
                                    size={18}
                                    color={colors.text as string}
                                />
                            </Pressable>

                            {isExpanded && (
                                <View style={styles.faqAnswerContainer}>
                                    <Text style={[styles.faqAnswerText, { color: isDarkMode ? '#ccc' : '#555' }]}>
                                        {faq.answer}
                                    </Text>
                                </View>
                            )}
                        </View>
                    );
                })}

                <Pressable
                    style={[styles.contactButton, { backgroundColor: colors.primary }]}
                    onPress={() => alert("Redirecting to support email...")}
                >
                    <Ionicons name="mail-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.contactButtonText}>Contact Support Team</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: -0.3,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    bannerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 24,
        gap: 16,
    },
    bannerTextContainer: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    bannerSubtitle: {
        fontSize: 13,
        lineHeight: 18,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 14,
        letterSpacing: -0.4,
    },
    faqCard: {
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
        overflow: 'hidden',
    },
    faqQuestionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    faqQuestionText: {
        fontSize: 15,
        fontWeight: '600',
        flex: 1,
        paddingRight: 10,
    },
    faqAnswerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    faqAnswerText: {
        fontSize: 14,
        lineHeight: 20,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 20,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});