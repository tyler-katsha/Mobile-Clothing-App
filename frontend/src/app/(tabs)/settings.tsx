import {FlatList, StyleSheet} from 'react-native';
import Section from '@/components/ui/Section';
import {SafeAreaView} from "react-native-safe-area-context";
import {useSettingsData} from "@/app/utils/useSettingsData";
import {useTheme} from '@/hooks/useTheme';
import {useTranslation} from "react-i18next";

export default function SettingsScreen(){
    const SETTINGS_SECTIONS = useSettingsData();
    const {colors} = useTheme();

    return(
        <SafeAreaView style={[styles.safeArea,{backgroundColor: colors.bg}]}>
            <FlatList
                data={SETTINGS_SECTIONS}
                keyExtractor={(item) => item.title}
                renderItem={({item}) => (
                    <Section title={item.title} features={item.features}/>
                )}
                style={styles.flatList}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    flatList: {
        flex: 1,
    },
    listContent: {
        paddingTop: 16,
        paddingBottom: 40,
    },
});