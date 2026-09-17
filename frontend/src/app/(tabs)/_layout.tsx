import {Tabs} from "expo-router";
import {Ionicons} from '@expo/vector-icons'
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import {GlassView, isLiquidGlassAvailable} from "expo-glass-effect";

export default function TabsLayout(){
    const {colors, isDarkMode} = useTheme();
    const hasGlassSupport = isLiquidGlassAvailable();

    const renderTabBarIcon = (iconName: keyof typeof Ionicons.glyphMap, focused: boolean, color: string, size: number) => {
        if (!focused) {
            return <Ionicons name={iconName} size={size} color={color} />;
        }

        return (
            <View style={styles.activeIconWrapper}>
                {hasGlassSupport ? (
                    // Native iOS Liquid Glass circle view
                    <GlassView
                        glassEffectStyle="regular"
                        style={styles.liquidGlassCircle}
                    >
                        <Ionicons name={iconName} size={size} color={colors.primary as string} />
                    </GlassView>
                ) : (
                    // Cross-platform Fallback: Clean translucent glass pill/circle
                    <View style={[
                        styles.fallbackGlassCircle,
                        {
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
                            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
                        }
                    ]}>
                        <Ionicons name={iconName} size={size} color={colors.primary as string} />
                    </View>
                )}
            </View>
        );
    };

    return(
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.primary as string,
            tabBarInactiveTintColor: colors.textMuted as string,
            tabBarStyle: [
                styles.tabBar,
                {
                    backgroundColor: colors.surface as string,
                    shadowColor: (colors.shadow || '#000') as string,
                }
            ],
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({focused, color, size}) => renderTabBarIcon('home-outline', focused, color as string, size),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name='fittingRoom'
                options={{
                    title: 'Fitting Room',
                    tabBarIcon: ({focused, color, size}) => renderTabBarIcon('add-circle-outline', focused, color as string, size),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name='wardrobe'
                options={{
                    title: 'Wardrobe',
                    tabBarIcon: ({focused, color, size}) => renderTabBarIcon('shirt-outline', focused, color as string, size),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({focused, color, size}) => renderTabBarIcon('settings-outline', focused, color as string, size),
                    headerShown: false
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 24,
        left: 20,
        right: 20,
        height: 64,
        borderRadius: 32,
        borderTopWidth: 0,
        paddingTop: 8,
        paddingBottom: 8,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },
    activeIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    liquidGlassCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fallbackGlassCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
    },
});