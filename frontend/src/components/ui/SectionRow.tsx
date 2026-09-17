import {useTheme} from "@/hooks/useTheme";
import {SectionRowProps} from "@/app/types/section";
import {StyleSheet,Pressable,Text,Switch,View} from 'react-native';
import React from 'react';
import {isLiquidGlassAvailable} from "expo-glass-effect";
import {ChevronRight} from "lucide-react-native";
import {Href, useRouter} from "expo-router";
export default function SectionRow({feature, isLastItem}:SectionRowProps){
    const { colors } = useTheme();
    const isToggle = feature.type === 'toggle';
    const router = useRouter();
    const handlePress = () => {
        if (isToggle && feature.onToggle) {
            feature.onToggle(!feature.value);
        } else if (feature.route) {
            console.log(feature.route)
            router.push(feature.route as any);
        }
    }
    return (
        <React.Fragment>
            <Pressable
                style={({ pressed }) => [
                    styles.row,
                    pressed && !isToggle && feature.route && { backgroundColor: colors.bg }
                ]}
                disabled={!isToggle && !feature.route}
                onPress={handlePress}>

                <Text style={[styles.rowText, { color: colors.text}]}>
                    {feature.name}
                </Text>

                {isToggle ? (
                    <Switch
                        value={feature.value}
                        onValueChange={feature.onToggle}
                        ios_backgroundColor={isLiquidGlassAvailable() ? 'transparent' : colors.border}
                        trackColor={{ false: colors.border, true: colors.primary}}
                        thumbColor="#FFFFFF"
                    />
                ) : (
                    feature.route && <ChevronRight size={20} color={colors.textMuted} />
                )}
            </Pressable>

            {!isLastItem && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
            )}
        </React.Fragment>
    );
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20, // Taller rows feel more luxurious
        paddingHorizontal: 16,
    },
    rowText: {
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.3,
    },
    divider: {
        height: StyleSheet.hairlineWidth, // Matches the card border
        marginHorizontal: 0, // Slices edge-to-edge
    },
});