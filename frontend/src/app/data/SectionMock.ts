import { SectionProps } from '@/app/types/section';


export const SETTINGS_SECTIONS: SectionProps[] = [
    {
        title: 'Account & Sync',
        features: [
            // Updated to be a toggle
            {
                name: 'Sync to Cloud',
                type: 'toggle',
                value: false,
                onToggle: (val) => console.log('Sync toggled:', val)
            },
            { name: 'Backup & Restore', route: '/(settings)/backup' },
            { name: 'Storage Management', route: '/(settings)/storage' },
        ],
    },
    {
        title: 'Preferences',
        features: [
            // Updated to be a toggle
            {
                name: 'Dark Mode',
                type: 'toggle',
                value: true,
                onToggle: (val) => console.log('Dark mode toggled:', val)
            },
            { name: 'Notifications', route: '/(settings)/notifications' },
            { name: 'Language', route: '/(settings)/language' },
        ],
    },
    {
        title: 'Privacy & Security',
        features: [
            { name: 'Face ID & Passcode', route: '/(settings)/security' },
            { name: 'Permissions', route: '/(settings)/permissions' },
            { name: 'Clear Cache' },
        ],
    },
    {
        title: 'Support',
        features: [
            { name: 'Help Center', route: '/support/help' },
            { name: 'Terms of Service', route: '/legal/terms' },
            { name: 'Privacy Policy', route: '/legal/privacy' },
            { name: 'App Version: 1.0.0' },
        ],
    },
];