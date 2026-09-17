import {Dimensions, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import LoginButton from "@/components/buttons/LoginButton";

const { width } = Dimensions.get('window');

export default function HomeScreen() {

    const { colors, isDarkMode } = useTheme();
    const { t } = useTranslation();

    const [hasItems, setHasItems] = useState(false);

    const ootdItems = ['Top', 'Bottom', 'Shoes', 'Accessory'];
    const savedOutfits = [1, 2, 3, 4];

    const currentHour = new Date().getHours();
    let greetingKey = 'home.greetingMorning';
    let fallbackGreeting = 'Good Morning!';

    if (currentHour >= 12 && currentHour < 17) {
        greetingKey = 'home.greetingAfternoon';
        fallbackGreeting = 'Good Afternoon!';
    } else if (currentHour >= 17) {
        greetingKey = 'home.greetingEvening';
        fallbackGreeting = 'Good Evening!';
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg as string }]} edges={['top', 'left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <Text style={[styles.greeting, { color: colors.text as string }]}>
                            {t(greetingKey)}
                        </Text>
                        <Text style={[styles.subGreeting, { color: isDarkMode ? '#aaa' : '#666' }]}>
                            {t('home.subtitle')}
                        </Text>
                    </View>

                    <LoginButton />
                </View>

                <View style={[styles.ootdContainer, { backgroundColor: colors.surface as string, borderColor: colors.border as string }]}>
                    <View style={styles.ootdHeader}>
                        <Text style={[styles.sectionTitle, { color: colors.text as string }]}>{t("home.subtitle")}</Text>
                        <Ionicons name="sparkles" size={20} color={colors.primary as string} />
                    </View>

                    {hasItems ? (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.marqueeContent}
                            decelerationRate="fast"
                            snapToInterval={width * 0.35 + 12}>
                            {ootdItems.map((item, index) => (
                                <View key={index} style={[styles.clothingCard, { backgroundColor: colors.bg as string, borderColor: colors.border as string }]}>
                                    <Ionicons name="shirt-outline" size={32} color={colors.text as string} style={styles.itemIcon} />
                                    <Text style={[styles.itemText, { color: colors.text as string }]}>{item}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.pendingStateContainer}>
                            <View style={[styles.pendingCard, { backgroundColor: colors.bg as string, borderColor: colors.border as string }]}>
                                <Ionicons name="partly-sunny-outline" size={42} color={colors.primary as string} style={{ marginBottom: 12 }} />
                                <Text style={[styles.pendingTitle, { color: colors.text as string }]}>
                                    {t("home.ootdPendingTitle")}
                                </Text>
                                <Text style={[styles.pendingDesc, { color: isDarkMode ? '#aaa' : '#666' }]}>
                                    {t("home.ootdPendingDesc")}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.gridSection}>
                    <Text style={[styles.sectionTitle, { color: colors.text as string, marginBottom: 16 }]}>
                        {t("home.outfitTitle")}
                    </Text>

                    <View style={styles.gridContainer}>
                        {hasItems ? (
                            // POPULATED STATE
                            savedOutfits.map((outfit) => (
                                <Pressable key={outfit} style={[styles.gridItem, { backgroundColor: colors.surface as string, borderColor: colors.border as string }]}>
                                    <View style={[styles.imagePlaceholder, { backgroundColor: colors.bg as string }]} />
                                    <Text style={[styles.gridItemTitle, { color: colors.text as string }]}>{t("home.outfitName")} {outfit}</Text>
                                </Pressable>
                            ))
                        ) : (
                            [1, 2, 3, 4].map((slot) => (
                                <Pressable key={slot} style={[styles.emptyGridItem, { borderColor: colors.border as string, backgroundColor: colors.surface as string }]}>
                                    <Ionicons name="images-outline" size={32} color={isDarkMode ? '#444' : '#DDD'} style={{ marginBottom: 8 }} />
                                    <Text style={[styles.emptyItemText, { color: isDarkMode ? '#666' : '#999' }]}>{t("home.empty")}</Text>
                                </Pressable>
                            ))
                        )}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Pushes the text and button to opposite sides
        alignItems: 'center', // Keeps them vertically aligned
        marginTop: 10,
        marginBottom: 30,
    },
    headerTextContainer: {
        flex: 1, // Ensures long translations don't push the button off-screen
        paddingRight: 10,
    },
    greeting: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    subGreeting: {
        fontSize: 16,
    },
    ootdContainer: {
        borderRadius: 20,
        paddingVertical: 20,
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 32,
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        // Android Shadow
        elevation: 2,
    },
    ootdHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
    marqueeContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    clothingCard: {
        width: width * 0.35,
        height: 140,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyClothingCard: {
        width: width * 0.35,
        height: 140,
        borderRadius: 16,
        borderWidth: 2,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemIcon: {
        marginBottom: 12,
    },
    itemText: {
        fontSize: 14,
        fontWeight: '600',
    },
    emptyItemText: {
        fontSize: 13,
        fontWeight: '500',
        marginTop: 4,
    },
    gridSection: {
        flex: 1,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    gridItem: {
        width: '47%',
        height: 180,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 12,
    },
    emptyGridItem: {
        width: '47%',
        height: 180,
        borderRadius: 16,
        borderWidth: 2,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholder: {
        flex: 1,
        borderRadius: 8,
        marginBottom: 12,
    },
    gridItemTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
    pendingStateContainer: {
        paddingHorizontal: 20,
    },
    pendingCard: {
        width: '100%',
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    pendingTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    pendingDesc: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
});