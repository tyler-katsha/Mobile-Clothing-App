import {SafeAreaView} from "react-native-safe-area-context";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useState } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ArrowRight, Lock, Mail, User } from "lucide-react-native";
import { useTranslation } from "react-i18next";
export default function Register() {
    const { colors } = useTheme();
    const router = useRouter();
    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = () => {
        setErrorMessage('');

        // Basic validation check to prevent empty submissions
        if (!name || !email || !password) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        setLoading(true);

        try {
            setTimeout(() => {
                setLoading(false);
                console.log("Registering user:", { name, email, password });
                router.push('/(tabs)');
            }, 1500);
        } catch (err) {
            setLoading(false);
            setErrorMessage('Network error. Please try again.');
        }
    };

    return(
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]} edges={['bottom', 'left', 'right']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.headerContainer}>
                        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
                        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                            Build your digital wardrobe and sync your style seamlessly.
                        </Text>
                    </View>

                    {errorMessage ? (
                        <View style={[styles.errorBox, { backgroundColor: colors.danger + '15', borderColor: colors.danger }]}>
                            <Text style={[styles.errorText, { color: colors.danger }]}>{errorMessage}</Text>
                        </View>
                    ) : null}

                    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.textMuted }]}>Full Name</Text>
                            <View style={[styles.inputWrapper, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                                <User size={20} color={colors.textMuted} style={styles.inputIcon}/>
                                <TextInput
                                    style={[styles.textInput, { color: colors.text }]}
                                    placeholder='John Doe'
                                    placeholderTextColor={colors.textMuted}
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize='words'
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.textMuted }]}>Email Address</Text>
                            <View style={[styles.inputWrapper, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                                <Mail size={20} color={colors.textMuted} style={styles.inputIcon}/>
                                <TextInput
                                    style={[styles.textInput, { color: colors.text }]}
                                    placeholder='name@example.com'
                                    placeholderTextColor={colors.textMuted}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    textContentType='username'
                                    autoComplete='email'
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.textMuted }]}>Password</Text>
                            <View style={[styles.inputWrapper, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                                <Lock size={20} color={colors.textMuted} style={styles.inputIcon}/>
                                <TextInput
                                    style={[styles.textInput, { color: colors.text }]}
                                    placeholder='At least 8 characters'
                                    placeholderTextColor={colors.textMuted}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    textContentType="newPassword"
                                    autoComplete="new-password"
                                />
                            </View>
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                { backgroundColor: colors.primary },
                                pressed && { opacity: 0.85 }
                            ]}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color='#FFFFFF'/>
                            ) : (
                                <View style={styles.buttonContent}>
                                    <Text style={styles.buttonText}>Get Started</Text>
                                    <ArrowRight size={18} color="#FFFFFF" style={styles.buttonIcon} />
                                </View>
                            )}
                        </Pressable>
                    </View>

                    <View style={styles.legalContainer}>
                        <Text style={[styles.legalText, { color: colors.textMuted }]}>
                            By signing up, you agree to our{' '}
                        </Text>
                        <View style={styles.linkRow}>
                            <Pressable onPress={() => router.push('/(legal)/terms-of-service' as any)}>
                                <Text style={[styles.linkText, { color: colors.primary }]}>Terms of Service</Text>
                            </Pressable>
                            <Text style={[styles.legalText, { color: colors.textMuted }]}> and </Text>
                            <Pressable onPress={() => router.push('/(legal)/privacy-policy' as any)}>
                                <Text style={[styles.linkText, { color: colors.primary }]}>Privacy Policy</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={[styles.footerText, { color: colors.textMuted }]}>
                            Already have an account?{' '}
                        </Text>
                        <Pressable onPress={() => router.push('/auth-sheet' as any)}>
                            <Text style={[styles.linkText, { color: colors.primary }]}>Sign In</Text>
                        </Pressable>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: 0.3,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
    },
    errorBox: {
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 16,
    },
    errorText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    card: {
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 20,
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 48,
    },
    inputIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 15,
    },
    button: {
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    buttonIcon: {
        marginLeft: 8,
    },
    legalContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    legalText: {
        fontSize: 13,
        textAlign: 'center',
    },
    linkText: {
        fontSize: 13,
        fontWeight: '600',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
    },
});