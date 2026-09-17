import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from "react-i18next";
import {getLocales} from "expo-localization";

const LANGUAGE_OPTIONS = [
    { id: 'device', label: 'Device Language', subLabel: 'Automatically match system settings' },
    { id: 'en', label: 'English', subLabel: 'English' },
    { id: 'es', label: 'Español', subLabel: 'Spanish' },
    { id: 'ko', label: '한국어', subLabel: 'Korean' },
    { id: 'ja', label: '日本語', subLabel: 'Japanese'},
    { id: 'zh', label: '中文', subLabel: 'Chinese'},
    { id: 'fr', label: 'Français', subLabel: 'French'},
];

export default function LanguageScreen() {
    const router = useRouter();
    const { colors, isDarkMode } = useTheme();
    const { t, i18n } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState<string>('device');

    useEffect(() => {

        const loadLanguage = async () => {
            try {
                const storedLang = await AsyncStorage.getItem('appLanguage');
                if (storedLang !== null) {
                    setSelectedLanguage(storedLang);

                    const activeLang = storedLang === 'device' ? (getLocales()[0]?.languageCode ?? 'en') : storedLang;
                    await i18n.changeLanguage(activeLang);
                }
            } catch (error) {
                console.error("Failed to load language preference", error);
            }
        };

        loadLanguage();
    },[])
    const handleSelectLanguage = async (id: string | undefined) => {

        if(!id){
            return;
        }
        setSelectedLanguage(id);
        try {
            await AsyncStorage.setItem('appLanguage', id);

            const activeLang = id === 'device' ? (getLocales()[0]?.languageCode ?? 'en') : id;
            await i18n.changeLanguage(activeLang);
        } catch (error) {
            console.error("Failed to save language preference:", error);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg as string }]}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    style={[styles.backButton, { backgroundColor: colors.surface as string, borderColor: colors.border as string }]}>
                    <Ionicons name="arrow-back" size={20} color={colors.text as string} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.text as string }]}>{t("languages.title", "Language")}</Text>
                <View style={styles.spacer} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.sectionFooter, { color: isDarkMode ? '#aaa' : '#666' }]}>
                    {t("languages.desc")}
                </Text>

                <View style={[styles.listGroup, { backgroundColor: colors.surface as string, borderColor: colors.border as string }]}>
                    {LANGUAGE_OPTIONS.map((option, index) => {
                        const isSelected = selectedLanguage === option.id;
                        const isLastItem = index === LANGUAGE_OPTIONS.length - 1;

                        return (
                            <View key={option.id}>
                                <Pressable
                                    style={styles.row}
                                    onPress={() => handleSelectLanguage(option.id)}>
                                    <View style={styles.textContainer}>
                                        <Text style={[styles.rowLabel, { color: colors.text as string }]}>
                                            {option.label}
                                        </Text>
                                        <Text style={[styles.rowSubLabel, { color: isDarkMode ? '#aaa' : '#666' }]}>
                                            {option.subLabel}
                                        </Text>
                                    </View>

                                    {isSelected && (
                                        <Ionicons name="checkmark" size={24} color={colors.primary as string} />
                                    )}
                                </Pressable>

                                {!isLastItem && (
                                    <View style={[styles.divider, { backgroundColor: colors.border as string }]} />
                                )}
                            </View>
                        );
                    })}
                </View>
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
    spacer: {
        width: 40,
    },
    scrollContent: {
        padding: 20,
    },
    sectionFooter: {
        fontSize: 13,
        marginBottom: 12,
        marginLeft: 8,
    },
    listGroup: {
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    textContainer: {
        flex: 1,
        paddingRight: 16,
    },
    rowLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    rowSubLabel: {
        fontSize: 13,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        marginLeft: 16, // Indent the divider slightly for an iOS native feel
    }
});