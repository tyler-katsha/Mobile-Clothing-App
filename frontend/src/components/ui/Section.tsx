import { View, StyleSheet, Text} from 'react-native';
import { SectionProps } from '@/app/types/section';
import React from "react";
import SectionRow from "@/components/ui/SectionRow";
import {useTheme} from "@/hooks/useTheme";

export default function Section({ title, features }: SectionProps) {
    const {colors} = useTheme();
    return (
        <View style={styles.container}>
            <Text style={[styles.headerText,{color: colors.textMuted}]}>{title}</Text>

            <View style={[styles.card, { backgroundColor: colors.surface,borderColor: colors.border}]}>
                {features.map((feature, index) => (
                    <SectionRow
                        key={feature.name}
                        feature={feature}
                        isLastItem={index === features.length - 1}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    headerText: {
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 16,
        marginBottom: 8,
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
    },
});