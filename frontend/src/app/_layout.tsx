import {Stack} from 'expo-router';
import ThemeProvider from '@/hooks/useTheme';
import {isLiquidGlassAvailable} from "expo-glass-effect";
import '@/app/i18n';

export default function RootLayout(){

    return(
        <ThemeProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen
                    name='auth-sheet'
                    options={{
                        presentation: "formSheet",
                        sheetGrabberVisible: true,
                        sheetAllowedDetents: [0.55,1],
                        contentStyle: {
                            backgroundColor: isLiquidGlassAvailable() ? "transparent" : '#000000E6'
                        },
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='/(auth)/register'
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='(settings)/language'
                    options={{
                        presentation: "formSheet",
                        sheetGrabberVisible: true,
                        sheetAllowedDetents: [0.75,1],
                        contentStyle: {
                            backgroundColor: isLiquidGlassAvailable() ? "transparent" : '#000000E6'
                        },
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='(modals)/image-details'
                    options={{
                        presentation: "formSheet",
                        sheetGrabberVisible: true,
                        sheetAllowedDetents: [0.75,1],
                        contentStyle: {
                            backgroundColor: isLiquidGlassAvailable() ? "transparent" : '#000000E6'
                        },
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='(support)/help'
                    options={{
                        presentation: "formSheet",
                        sheetGrabberVisible: true,
                        sheetAllowedDetents: [0.75,1],
                        contentStyle: {
                            backgroundColor: isLiquidGlassAvailable() ? "transparent" : '#000000E6'
                        },
                        headerShown: false
                    }}
                />
                <Stack.Screen name='(legal)/privacy-policy'
                              options={{presentation: "modal",headerShown: false}}
                />
                <Stack.Screen
                    name='(legal)/terms-of-service'
                    options={{presentation: 'modal',headerShown: false}}
                />
            </Stack>
        </ThemeProvider>

    )
}
