import {appVersion} from "@/app/API/version";
import {hasGlassSupport} from "@/app/utils/useSettingsData";

export const en = {
        auth: {
            googleText: 'Continue with Google',
            appleText: 'Continue with Apple',
            faceIdText: 'Continue with Face ID',
            signupText: "Don't have an account? ",
            privacyText: 'By continuing you agree to our',
            privacyLink: 'Terms of Service',
            signupLink: 'Sign up',
            loginText: 'Login',
            createAccount: "Create Account",
            welcome: "Welcome Back!",
            subtitle: "Please choose your preferred sign in method.",
        },

        home: {
            welcomeTitle: 'Welcome to your wardrobe',
            greetingMorning: 'Good Morning!',
            greetingAfternoon: 'Good Afternoon!',
            greetingEvening: 'Good Evening!',
            subtitle: 'Outfit of the day.',
            ootdPendingTitle: 'Analyzing the forecast...',
            ootdPendingDesc: 'Your daily look is curated based on the weather. Check back between 6:00 AM and 8:00 AM!',
            outfitTitle: 'Your Outfits',
            outfitName: 'Outfit',
            empty: 'Empty Slot',
        },

        wardrobeBuilder: {
            title: "Fitting Room",
            subTitle: 'Outfit Studio',
            desc: 'Curate your layers from headwear to footwear.',
        },
        wardrobeRoom: {
            add: '+ Add',
            text: 'Find your best outfit',
        },
        settings: {
            account: 'ACCOUNT & SYNC',
            cloud: 'Sync to cloud',
            backup: 'Backup & Restore',
            storageManagement: 'Storage Management',
            perf: 'PREFERENCES',
            darkMode: 'Dark Mode',
            notification: 'Notification',
            liquidGlass: `Liquid Glass: ${hasGlassSupport ? 'Active / Supported' : 'Not Available'}`,
            security: 'PRIVACY & SECURITY',
            faceID: 'Face ID & Passcode',
            camera: 'Camera Access',
            photoLib: 'Photo Library Access',
            cache: 'Clear Cache',
            support: 'SUPPORT',
            help: 'Help Center',
            termsOfService: 'Terms of Service',
            privacyPolicy: 'Privacy Policy',
            appVersion: `App Version: ${appVersion}`,
        },
        languages: {
            title: 'Language',
            desc: 'Choose the language for the app interface.'
        }

} as const;