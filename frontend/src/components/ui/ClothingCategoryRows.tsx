import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { mockClothingRows } from "@/app/data/ClothesMock";
import ClothingRow from "@/components/ui/ClothingRow";
import SaveOutfitButton from "@/components/buttons/SaveOutfitButton";
import {errorStyling} from "@/components/ErrorStyling";
import {useTranslation} from "react-i18next";

export default function ClothingCategoryRows() {
    const { colors } = useTheme();
    const { t } = useTranslation();

    // Independent state trackers for each of the 4 rows
    const [currentIndexes, setCurrentIndexes] = useState<{ [key: string]: number }>({
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0
    });
    const [isLoading,setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleOutfitSave = async () => {
        setErrorMessage(null);
        setIsLoading(true);
        console.log(`Index 1: ${currentIndexes['1']}`);
        console.log(`Index 2: ${currentIndexes['2']}`);
        console.log(`Index 3: ${currentIndexes['3']}`);
        console.log(`Index 4: ${currentIndexes['4']}`);

        try{
            throw new Error("Unable to connect to database.");
        } catch(err){
            setErrorMessage("We couldn't save your outfit right now. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    }
    const handleNext = (rowId: string, itemsLength: number) => {
        setCurrentIndexes((prev) => ({
            ...prev,
            [rowId]: ((prev[rowId] ?? 0) + 1 + itemsLength) % itemsLength
        }));
    };

    const handlePrev = (rowId: string, itemsLength: number) => {
        setCurrentIndexes((prev) => ({
            ...prev,
            [rowId]: ((prev[rowId] ?? 0) - 1 + itemsLength) % itemsLength
        }));
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                <View style={styles.headerContainer}>
                    <Text style={[styles.title, { color: colors.text }]}>{t("wardrobeBuilder.subTitle")}</Text>
                    <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                        {t("wardrobeBuilder.desc")}
                    </Text>
                </View>

                {mockClothingRows.map((row) => {
                    const activeIndex = currentIndexes[row.id] ?? 0;

                    return (
                        <ClothingRow key={row.id}
                                     items={row.items}
                                     currentIndex={activeIndex}
                                     onPrev={() => handlePrev(row.id,row.items.length)}
                                     onNext={() => handleNext(row.id,row.items.length)}/>
                    );
                })}

                {errorMessage && (
                    <View style={errorStyling.errorBanner}>
                        <Text style={[errorStyling.errorText,{color:colors.danger,borderColor:colors.border}]}>{errorMessage}</Text>
                    </View>
                )}
                <SaveOutfitButton onSave={handleOutfitSave} title={isLoading ? 'Saving...' : 'Save Outfit'}/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },
    headerContainer: {
        marginBottom: 28,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: 0.3,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 20,
    },
});