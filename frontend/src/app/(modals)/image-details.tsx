import { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { mockClothingData } from "@/app/data/ClothingItemMock";
import { StyleSheet, Text, Image, View, Pressable, ScrollView, TextInput, Switch } from 'react-native';
import { GlassView } from "expo-glass-effect";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/hooks/useTheme';
import EditButton from '@/components/buttons/EditOutfitButton';

const AVAILABLE_COLORS = ['Black', 'White', 'Grey', 'Navy', 'Red', 'Blue', 'Green', 'Brown', 'Beige', 'Pink'];
const AVAILABLE_SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
const AVAILABLE_OCCASIONS = ['Casual', 'Formal', 'Date', 'University', 'Party', 'Football Match', 'Gaming', 'Workout'];

const normalizeAndDeduplicate = (tags?: string[]) => {
    if (!tags) return [];

    // 1. Convert every tag to Title Case (e.g., "SPRING" -> "Spring")
    const formattedTags = tags.map(tag =>
        tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
    );

    // 2. Wrap in a Set to automatically remove duplicates, then convert back to array
    return Array.from(new Set(formattedTags));
};

export default function ImageDetails() {
    const { id } = useLocalSearchParams<{id:string}>();
    const router = useRouter();
    const { colors } = useTheme();

    const clothingItem = mockClothingData.find(item => item.id === id);

    const [isEditing, setIsEditing] = useState(false);
    const [formState, setFormState] = useState({
        ...clothingItem,
        favorite: clothingItem?.favorite || false,
        colors: normalizeAndDeduplicate(clothingItem?.colors) || [],
        seasons: normalizeAndDeduplicate(clothingItem?.seasons) || [],
        occasions: normalizeAndDeduplicate(clothingItem?.occasions) || []
    });

    if (!clothingItem) return null;


    const toggleArrayItem = (field: 'colors' | 'seasons' | 'occasions', item: string) => {
        setFormState(prev => {
            const currentList = prev[field] as string[];
            if (currentList.includes(item)) {
                return { ...prev, [field]: currentList.filter(i => i !== item) };
            } else {
                return { ...prev, [field]: [...currentList, item] };
            }
        });
    };

    const handleSave = () => {
        setIsEditing(false);
        // TODO: Send `formState` to your backend to save changes
        console.log("Saving new details:", formState);
    };

    // --- Reusable Component for the Pill Picker ---
    const MultiSelectPillPicker = ({options, selectedItems, field}: {
        options: string[],
        selectedItems: string[],
        field: 'colors' | 'seasons' | 'occasions'
    }) => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pickerScroll}>
            {options.map((option) => {
                const isSelected = selectedItems.includes(option);
                return (
                    <Pressable
                        key={option}
                        onPress={() => toggleArrayItem(field, option)}
                        style={[
                            styles.pickerPill,
                            {
                                backgroundColor: isSelected ? colors.primary as string : '#333333',
                                borderColor: isSelected ? colors.primary as string : '#555',
                            }
                        ]}>
                        <Text style={[styles.pickerPillText, { color: isSelected ? '#FFF' : '#AAA' }]}>
                            {option}
                        </Text>
                        {isSelected && <Ionicons name="checkmark" size={14} color="#FFF" style={{ marginLeft: 4 }} />}
                    </Pressable>
                );
            })}
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <GlassView style={StyleSheet.absoluteFill} glassEffectStyle="regular" />

            <Pressable style={styles.closeButton} onPress={() => router.back()}>
                <Ionicons name="close" size={20} color="#FFF" />
            </Pressable>

            <Pressable
                style={styles.favoriteButton}
                onPress={() => setFormState(prev => ({ ...prev, favorite: !prev.favorite }))}>
                <Ionicons
                    name={formState.favorite ? "star" : "star-outline"}
                    size={20}
                    color={formState.favorite ? "#FFD700" : "#FFF"}
                />
            </Pressable>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{uri: formState.imageDetails?.originalUrl}} style={styles.image} resizeMode='contain' />

                <View style={styles.infoContainer}>
                    <EditButton
                        isEditing={isEditing}
                        onPress={isEditing ? handleSave : () => setIsEditing(true)}
                    />

                    {isEditing ? (
                        <TextInput
                            style={[styles.titleInput, { color: '#FFF', borderColor: colors.border as string }]}
                            value={formState.title}
                            onChangeText={(t) => setFormState(prev => ({ ...prev, title: t }))}
                        />
                    ) : (
                        <Text style={styles.title}>{formState.title}</Text>
                    )}

                    {isEditing ? (
                        <View style={styles.editRow}>
                            <TextInput style={styles.inlineInput} placeholder="Brand" placeholderTextColor="#888" value={formState.brand} onChangeText={(t) => setFormState(prev => ({ ...prev, brand: t }))} />
                            <TextInput style={styles.inlineInput} placeholder="Category" placeholderTextColor="#888" value={formState.category} onChangeText={(t) => setFormState(prev => ({ ...prev, category: t as any }))} />
                        </View>
                    ) : (
                        <Text style={styles.subText}>{formState.brand} • {formState.category}</Text>
                    )}

                    {isEditing && (
                        <View style={styles.toggleContainer}>
                            <View style={styles.toggleRow}>
                                <Text style={styles.toggleLabel}>Favorite</Text>
                                <Switch value={formState.favorite} onValueChange={(val) => setFormState(prev => ({ ...prev, favorite: val }))} trackColor={{ true: colors.primary as string }} />
                            </View>
                            <View style={styles.toggleRow}>
                                <Text style={styles.toggleLabel}>Archived</Text>
                                <Switch value={formState.archived} onValueChange={(val) => setFormState(prev => ({ ...prev, archived: val }))} trackColor={{ true: colors.primary as string }} />
                            </View>
                        </View>
                    )}

                    <Text style={styles.sectionTitle}>Colors</Text>
                    {isEditing ? (
                        <MultiSelectPillPicker options={AVAILABLE_COLORS} selectedItems={formState.colors} field="colors" />
                    ) : (
                        <View style={styles.pillContainer}>
                            {formState.colors.length > 0 ? formState.colors.map((color, index) => (
                                <View key={index} style={styles.readOnlyPill}><Text style={styles.readOnlyPillText}>{color}</Text></View>
                            )) : <Text style={styles.emptyText}>No colors added</Text>}
                        </View>
                    )}

                    <Text style={styles.sectionTitle}>Seasons</Text>
                    {isEditing ? (
                        <MultiSelectPillPicker options={AVAILABLE_SEASONS} selectedItems={formState.seasons} field="seasons" />
                    ) : (
                        <View style={styles.pillContainer}>
                            {formState.seasons.length > 0 ? formState.seasons.map((season, index) => (
                                <View key={index} style={styles.readOnlyPill}><Text style={styles.readOnlyPillText}>{season}</Text></View>
                            )) : <Text style={styles.emptyText}>No seasons added</Text>}
                        </View>
                    )}

                    <Text style={styles.sectionTitle}>Occasions</Text>
                    {isEditing ? (
                        <MultiSelectPillPicker options={AVAILABLE_OCCASIONS} selectedItems={formState.occasions} field="occasions" />
                    ) : (
                        <View style={styles.pillContainer}>
                            {formState.occasions.length > 0 ? formState.occasions.map((occasion, index) => (
                                <View key={index} style={styles.readOnlyPill}><Text style={styles.readOnlyPillText}>{occasion}</Text></View>
                            )) : <Text style={styles.emptyText}>No occasions added</Text>}
                        </View>
                    )}

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent', top: 50 },
    closeButton: { position: 'absolute', top: 2, right: 12, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    favoriteButton: {
        position: 'absolute', top: 10, left: 80, zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)', width: 32, height: 32,
        borderRadius: 16, alignItems: 'center', justifyContent: 'center'
    },
    image: { width: '100%', height: 350 },
    infoContainer: { padding: 24 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
    titleInput: { fontSize: 24, fontWeight: 'bold', borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 8 },
    subText: { fontSize: 16, color: '#A0A0A0', marginBottom: 16 },
    editRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
    inlineInput: { flex: 1, color: '#FFF', borderWidth: 1, borderColor: '#555', borderRadius: 8, padding: 12 },
    sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 10 },

    // Read-only Pill Styles
    pillContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    readOnlyPill: { backgroundColor: '#333333', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
    readOnlyPillText: { fontSize: 14, color: '#FFFFFF', fontWeight: '500' },
    emptyText: { color: '#666', fontStyle: 'italic' },

    // Interactive Picker Pill Styles
    pickerScroll: { gap: 8, paddingRight: 20 }, // Adds space at the end of the scroll
    pickerPill: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
    pickerPillText: { fontSize: 14, fontWeight: '600' },

    // Toggles
    toggleContainer: { marginVertical: 12, padding: 16, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16 },
    toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    toggleLabel: { color: '#FFF', fontSize: 16, fontWeight: '500' }
});