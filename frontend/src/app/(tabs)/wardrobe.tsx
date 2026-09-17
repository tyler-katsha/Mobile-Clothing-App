import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from "react-i18next";

// Your Custom Components
import ImageCard from "@/components/ui/ImageCard";
import CameraUploadButton from '@/components/buttons/CameraUploadButton';
import GalleryUploadButton from '@/components/buttons/GalleryUploadButton';
import {mockClothingData} from "@/app/data/ClothingItemMock";
import {ClothingItem} from "@/app/types/Clothing";

export default function WardrobeScreen() {
    const router = useRouter();
    const { colors, isDarkMode } = useTheme();
    const { t } = useTranslation();

    // --- State Management ---
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    // --- Mock Data & Sorting ---
    const categoryOrder = ['Dresses', 'Tops', 'Pants', 'Accessories'];

    // Adapted your mock data to fit the categorized map structure
    const [wardrobeItems,setWardrobeItems] = useState<ClothingItem[]>(mockClothingData);
    const handleItemPress = (itemId: string) => {
        router.push(`/image-details?id=${itemId}`);
    };
    const toggleFavorite = (categoryKey: string, itemId: string) => {
        setWardrobeItems(prev => ({
            ...prev,
            [categoryKey]: prev.map((item:ClothingItem) =>
                item.id === itemId ? { ...item, favorite: !item.favorite } : item
            )
        }));
    };
    const handleImageSelected = (uri: string) => {
        setImageUri(uri);
        // TODO: Send URI to your Spring/MongoDB backend
        setModalVisible(false);
    };

    const goToFirst = () => setCurrentPage(1);
    const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
    const goToNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
    const goToLast = () => setCurrentPage(totalPages);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg as string }]} edges={['top', 'left', 'right']}>

            <View style={styles.headerContainer}>
                <View style={styles.titleRow}>
                    <Text style={[styles.title, { color: colors.text as string }]}>
                        {t('wardrobeRoom.title')}
                    </Text>
                    <View style={styles.headerActions}>
                        <Pressable style={[styles.actionBtn, { backgroundColor: colors.surface as string, borderColor: colors.border as string }]}>
                            <Ionicons name="filter" size={20} color={colors.text as string} />
                        </Pressable>
                        <Pressable
                            style={[styles.actionBtn, { backgroundColor: colors.primary as string, borderColor: colors.border as string }]}
                            onPress={() => setModalVisible(true)}>
                            <Ionicons name="add" size={24} color="#FFF" />
                        </Pressable>
                    </View>
                </View>

                <View style={[styles.searchContainer, { backgroundColor: colors.surface as string, borderColor: colors.border as string }]}>
                    <Ionicons name="search" size={20} color={isDarkMode ? '#aaa' : '#666'} />
                    <TextInput
                        style={[styles.searchInput, { color: colors.text as string }]}
                        placeholder={t('wardrobeRoom.searchPlaceholder')}
                        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {categoryOrder.map((category) => (

                    <View key={category} style={styles.categorySection}>
                        <View style={styles.categoryHeader}>
                            <Text style={[styles.categoryTitle, { color: colors.text as string }]}>{t(`wardrobeRoom.${category.toLowerCase()}`)}</Text>
                            <View style={[styles.underline, { backgroundColor: colors.border as string }]} />
                        </View>

                        <View style={styles.gridContainer}>
                            {wardrobeItems?.map((item) => (
                                <View key={item.id} style={styles.gridItemWrapper}>
                                    <ImageCard
                                        imageUrl={item.imageDetails.originalUrl}
                                        title={item.title}
                                        favorite={item.favorite}
                                        onPress={() => handleItemPress(item.id)}
                                        onFavoriteToggle={() => toggleFavorite(category,item.id)}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                <View style={styles.paginationContainer}>
                    <View style={styles.pageArrowGroup}>
                        <Pressable onPress={goToFirst} disabled={currentPage === 1} style={({pressed}) => [styles.pageBtn, pressed && styles.pressed, currentPage === 1 && styles.disabledBtn]}>
                            <Ionicons name="play-back" size={20} color={colors.text as string} />
                        </Pressable>
                        <Pressable onPress={goToPrev} disabled={currentPage === 1} style={({pressed}) => [styles.pageBtn, pressed && styles.pressed, currentPage === 1 && styles.disabledBtn]}>
                            <Ionicons name="chevron-back" size={24} color={colors.text as string} />
                        </Pressable>
                    </View>

                    <View style={styles.pageNumbers}>
                        <Text style={[styles.pageText, { color: colors.text as string }]}>
                            {currentPage} <Text style={{ color: colors.textMuted as string }}>... {totalPages}</Text>
                        </Text>
                    </View>

                    <View style={styles.pageArrowGroup}>
                        <Pressable onPress={goToNext} disabled={currentPage === totalPages} style={({pressed}) => [styles.pageBtn, pressed && styles.pressed, currentPage === totalPages && styles.disabledBtn]}>
                            <Ionicons name="chevron-forward" size={24} color={colors.text as string} />
                        </Pressable>
                        <Pressable onPress={goToLast} disabled={currentPage === totalPages} style={({pressed}) => [styles.pageBtn, pressed && styles.pressed, currentPage === totalPages && styles.disabledBtn]}>
                            <Ionicons name="play-forward" size={20} color={colors.text as string} />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <Modal visible={modalVisible} animationType='slide' transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.surface as string }]}>
                        <Text style={[styles.modalTitle, { color: colors.text as string }]}>{t("wardrobeRoom.addItem")}</Text>

                        <CameraUploadButton onImageSelected={handleImageSelected} />
                        <GalleryUploadButton onImageSelected={handleImageSelected} />

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ color: colors.danger as string, fontWeight: '600', fontSize: 16 }}>{t("wardrobeRoom.cancel")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 16,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 44,
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    categorySection: {
        marginBottom: 24,
    },
    categoryHeader: {
        marginBottom: 16,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
    underline: {
        height: 1,
        width: '100%',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    gridItemWrapper: {
        width: '47%',
        // We use a wrapper here so your custom ImageCard can fill the 47% width nicely
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginTop: 20,
        marginBottom: 50,
    },
    pageArrowGroup: {
        flexDirection: 'row',
        gap: 8,
    },
    pageBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    pageNumbers: {
        paddingHorizontal: 16,
    },
    pageText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 2,
    },
    pressed: {
        opacity: 0.6,
    },
    disabledBtn: {
        opacity: 0.3,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        padding: 24,
        borderTopLeftRadius: 24, // Slightly rounder for iOS feel
        borderTopRightRadius: 24,
        gap: 12,
        paddingBottom: 40, // Extra padding for safe area at the bottom
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    cancelButton: {
        marginTop: 10,
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 59, 48, 0.1)', // Nice soft red background for the cancel button
    }
});