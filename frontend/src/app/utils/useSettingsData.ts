import { SectionProps } from '@/app/types/section';
import { useTheme } from '@/hooks/useTheme';
import {useEffect, useState} from 'react';
import {isLiquidGlassAvailable} from "expo-glass-effect";
import {getSecureItem, saveSecureItem} from "@/app/utils/secureStorage";
import {useTranslation} from "react-i18next";

export const hasGlassSupport = isLiquidGlassAvailable();

export const useSettingsData = (): SectionProps[] => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { t } = useTranslation();


    // Local state for other toggles
    const [isSyncEnabled, setIsSyncEnabled] = useState(false);
    const [enableNotifications,setEnableNotification] = useState(false);
    const [isFaceId,setIsFaceId] = useState(false);
    const [isCameraAccess,setIsCameraAccess] = useState(false);
    const [isGalleryAccess,setIsGalleryAccess] = useState(false);


    const handleToggle = async (key: string, newValue: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(newValue);
        await saveSecureItem(key, String(newValue));
    };
    useEffect(() => {
        async function loadStoredPreferences() {
            const storedSync = await getSecureItem('isSyncEnabled');
            const storedNotifications = await getSecureItem('enableNotifications');
            const storedFaceId = await getSecureItem('isFaceId');
            const storedCamera = await getSecureItem('isCameraAccess');
            const storedGallery = await getSecureItem('isGalleryAccess');

            if (storedSync !== null) setIsSyncEnabled(storedSync === 'true');
            if (storedNotifications !== null) setEnableNotification(storedNotifications === 'true');
            if (storedFaceId !== null) setIsFaceId(storedFaceId === 'true');
            if (storedCamera !== null) setIsCameraAccess(storedCamera === 'true');
            if (storedGallery !== null) setIsGalleryAccess(storedGallery === 'true');
        }


        loadStoredPreferences();
    }, []);
    return [
        {
            title: t("settings.account"),
            features: [
                {
                    name: t("settings.cloud"),
                    type: 'toggle',
                    value: isSyncEnabled,
                    onToggle: (val) => handleToggle('isSyncEnabled', val, setIsSyncEnabled)
                },
                { name: t("settings.backup"), route: '/(settings)/backup' },
                { name: t("settings.storageManagement"), route: '/(settings)/storage' },
            ],
        },
        {
            title: t("settings.perf"),
            features: [
                {
                    name: t("settings.darkMode"),
                    type: 'toggle',
                    value: isDarkMode,
                    onToggle: () => toggleDarkMode()
},
                {
                    name: t("settings.notification"),
                    type: 'toggle',
                    value: enableNotifications,
                    onToggle: (val) => handleToggle('enableNotifications', val, setEnableNotification)
                },
                { name: t("languages.title"), route: '/(settings)/language' },
                { name: t("settings.liquidGlass") }
            ],
        },
        {
            title: t("settings.security"),
            features: [
                {
                    name: t("settings.faceID"),
                    type: 'toggle',
                    value: isFaceId,
                    onToggle: (val) => handleToggle('isFaceId', val, setIsFaceId),
                },
                {
                    name: t("settings.camera"),
                    type: 'toggle',
                    value: isCameraAccess,
                    onToggle: (val) => handleToggle('isCameraAccess', val, setIsCameraAccess),
                },
                {
                    name: t("settings.photoLib"),
                    type: 'toggle',
                    value: isGalleryAccess,
                    onToggle: (val) => handleToggle('isGalleryAccess', val, setIsGalleryAccess),
                },
                { name: t("settings.cache") },
            ],
        },
        {
            title: t("settings.support"),
            features: [
                { name: t("settings.help"), route: '/(support)/help' },
                { name: t("settings.termsOfService"), route: '/(legal)/terms-of-service' },
                { name: t("settings.privacyPolicy"), route: '/(legal)/privacy-policy' },
                { name: t("settings.appVersion") },
            ],
        },
    ];
};