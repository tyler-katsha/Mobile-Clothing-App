type ContentType = 'light-content' | 'dark-content';

export interface ColorScheme{
    bg:string;
    surface:string;
    text:string;
    textMuted:string;
    border:string;
    primary:string;
    success:string;
    warning:string;
    danger:string;
    shadow:string;
    gradients: {
        background: [string,string];
        surface: [string,string];
        primary: [string,string];
        success: [string,string];
        warning: [string,string];
        danger: [string,string];
        muted: [string,string];
        empty: [string,string];
    };
    backgrounds: {
        input: string;
        editInput: string;
    };
    statusBarStyle: ContentType;
}

export const lightTheme: ColorScheme = {
    bg: '#F8FAFC',          // Slate 50
    surface: '#FFFFFF',     // Pure White
    text: '#0F172A',        // Slate 900
    textMuted: '#64748B',   // Slate 500
    border: '#E2E8F0',      // Slate 200
    primary: '#6366F1',     // Indigo 500
    success: '#10B981',     // Emerald 500
    warning: '#F59E0B',     // Amber 500
    danger: '#EF4444',      // Red 500
    shadow: 'rgba(15, 23, 42, 0.08)',
    gradients: {
        background: ['#F8FAFC', '#F1F5F9'],
        surface: ['#FFFFFF', '#F8FAFC'],
        primary: ['#6366F1', '#4F46E5'],
        success: ['#10B981', '#059669'],
        warning: ['#F59E0B', '#D97706'],
        danger: ['#EF4444', '#DC2626'],
        muted: ['#F1F5F9', '#E2E8F0'],
        empty: ['#F8FAFC', '#E2E8F0'],
    },
    backgrounds: {
        input: '#FFFFFF',
        editInput: '#F1F5F9',
    },
    statusBarStyle: 'dark-content',
};

export const darkTheme: ColorScheme = {
    bg: '#0F172A',          // Slate 900
    surface: '#1E293B',     // Slate 800
    text: '#F8FAFC',        // Slate 50
    textMuted: '#94A3B8',   // Slate 400
    border: '#334155',      // Slate 700
    primary: '#818CF8',     // Indigo 400 (Lighter for dark mode contrast)
    success: '#34D399',     // Emerald 400
    warning: '#FBBF24',     // Amber 400
    danger: '#F87171',      // Red 400
    shadow: 'rgba(0, 0, 0, 0.4)',
    gradients: {
        background: ['#0F172A', '#020617'],
        surface: ['#1E293B', '#0F172A'],
        primary: ['#818CF8', '#6366F1'],
        success: ['#34D399', '#10B981'],
        warning: ['#FBBF24', '#F59E0B'],
        danger: ['#F87171', '#EF4444'],
        muted: ['#1E293B', '#334155'],
        empty: ['#1E293B', '#1E293B'],
    },
    backgrounds: {
        input: '#1E293B',
        editInput: '#0F172A',
    },
    statusBarStyle: 'light-content',
};

export interface ThemeContextType{
    isDarkMode:boolean;
    toggleDarkMode: () => void;
    colors: ColorScheme;
}