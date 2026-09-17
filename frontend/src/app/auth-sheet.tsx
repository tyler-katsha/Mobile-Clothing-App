import {SafeAreaView} from "react-native-safe-area-context";
import {Pressable, Text, View,StyleSheet,Image} from "react-native";
import {useRouter} from "expo-router";
import {AntDesign,Ionicons} from "@expo/vector-icons";
import { GlassView } from "expo-glass-effect";
import {useBiometricAuth} from "@/app/(auth)/handleBiometricLogin";
import {useTranslation} from "react-i18next";

export default function AuthSheet(){
    const { handleBiometric } = useBiometricAuth();
    const router = useRouter();
    const { t } = useTranslation();

    const oauthLogin = (provider:string) => {
        console.log(`Starting ${provider} login`);
    }

    const navigateAndClose = (route:string) => {
        router.back();

        setTimeout(() => {
            router.push(route as any);
        },150);
    }

    return(
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>

            <GlassView style={[StyleSheet.absoluteFill, {opacity: 0.8}]} glassEffectStyle='regular' />
            <Pressable
                style={styles.closeButton}
                onPress={() => router.back()}
                hitSlop={10}>
                <AntDesign name="close" size={20} color='#FFFFFF'/>
                </Pressable>
            <View style={styles.header}>
                <Text style={styles.title}>{t("auth.welcome")}</Text>
                <Text style={styles.subtitle}>{t("auth.subtitle")}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.googleButton}
                    onPress={() => oauthLogin("google")}>
                    <Image
                        source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                        style={[{ width: 20, height: 20 }, styles.icon]}
                    />
                    <Text style={styles.googleText}>{t("auth.googleText")}</Text>
                </Pressable>

                <Pressable
                    style={styles.appleButton}
                    onPress={() => oauthLogin("apple")}>
                    <AntDesign name='apple' size={20} color='black' style={styles.icon}/>
                    <Text style={styles.appleText}>{t("auth.appleText")}</Text>
                </Pressable>

                <Pressable
                    style={styles.faceIdButton}
                    onPress={handleBiometric}>
                    <Ionicons name='scan-outline' size={24} color="#FFFFFF" style={styles.icon}/>
                    <Text style={styles.faceIdText}>{t("auth.faceIdText")}</Text>
                </Pressable>
            </View>
            <View style={styles.footer}>

                <Text style={styles.footerText}>
                    {t("auth.signupText")} {' '}
                    <Text onPress={() => navigateAndClose('/(auth)/register')} style={styles.linkText}>
                        {t("auth.signupLink")}
                    </Text>
                </Text>

                <Text style={styles.footerText}>
                    {t("auth.privacyText")} {' '}
                    <Text onPress={() => navigateAndClose('/terms-of-service')} style={styles.linkText}>
                        {t("auth.privacyLink")}
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
        backgroundColor: 'transparent',
    },
    closeButton: {
        position: 'absolute',
        top: 24,
        right: 24,
        zIndex: 10,
        backgroundColor: '#333333',
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        marginBottom: 32,
        marginTop: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#A0A0A0',
    },
    buttonContainer: {
        gap: 16,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        paddingVertical: 16,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#333333',
    },
    googleText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    appleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        borderRadius: 30,
    },
    appleText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
    },
    faceIdButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        paddingVertical: 16,
        borderRadius: 30,
    },
    faceIdText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    icon: {
        position: 'absolute',
        left: 24,
    },
    footer: {
        marginTop: 'auto',
        paddingBottom: 24,
        alignItems: 'center',
    },
    footerText: {
        color: '#808080',
        fontSize: 12,
        marginTop: 12,
        marginBottom: 6,
    },
    linkText: {
        color: '#A0A0A0',
        textDecorationLine: 'underline',
    },
});