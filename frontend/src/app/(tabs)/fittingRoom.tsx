import { Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import ClothingCategoryRows from "@/components/ui/ClothingCategoryRows";

const FittingRoom = () => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[styles.scrollContent]}>
                <Text style={[styles.title, { color: colors.text as string}]}>
                    {t('wardrobeBuilder.title')}
                </Text>
                <ClothingCategoryRows/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        alignItems: 'center',
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },


});

export default FittingRoom;