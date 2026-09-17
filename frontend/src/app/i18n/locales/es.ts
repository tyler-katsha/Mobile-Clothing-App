import {hasGlassSupport} from "@/app/utils/useSettingsData";
import {appVersion} from "@/app/API/version";

export const es = {
    auth: {
        googleText: 'Continuar con Google',
        appleText: 'Continuar con Apple',
        faceIdText: 'Continuar con Face ID',
        signupText: "¿No tienes una cuenta?",
        privacyText: 'Al continuar, aceptas nuestros términos y condiciones.',
        privacyLink: 'Términos del servicio',
        signupLink: 'Inscribirse',
        loginText: 'Acceso',
        createAccount: "Crear una cuenta",
        welcome: "¡Bienvenido de nuevo!",
        subtitle: "Por favor, elija su método de inicio de sesión preferido.",
    },

    home: {
        welcomeTitle: 'Bienvenido a tu armario',
        greetingMorning: '¡Buen día!',
        greetingAfternoon: '¡Buenas tardes!',
        greetingEvening: '¡Buenas noches!',
        subtitle: 'El conjunto del día.',
        ootdPendingTitle: 'Analizando el pronóstico...',
        ootdPendingDesc: 'Tu atuendo diario se selecciona según el tiempo. ¡Vuelve a consultar entre las 6:00 a. m. y las 8:00 a. m.!',
        outfitTitle: 'Tus conjuntos',
        outfitName: 'Atuendo',
        empty: 'Espacio vacío',
    },

    wardrobeBuilder: {
        title: "Probador",
        subTitle: 'Estudio de vestimenta',
        desc: 'Selecciona cuidadosamente tus capas, desde el gorro hasta el calzado.',
    },
    wardrobeRoom: {
        add: '+ Agregar',
        text: 'Encuentra tu mejor atuendo',
        searchPlaceholder: 'Buscar ropa...',
        title: 'Mi guardarropa',
        dress: 'Vestidos',
        tops: 'Partes superiores',
        pants: 'Pantalones',
        accessories: 'Accesorios',
        addItem: 'Añadir nueva prenda de vestir',
        cancel: 'Cancelar',
    },
    settings: {
        account: 'CUENTA Y SINCRONIZACIÓN',
        cloud: 'Sincronizar con la nube',
        backup: 'Copia de seguridad y restauración',
        storageManagement: 'Gestión del almacenamiento',
        perf: 'PREFERENCIAS',
        darkMode: 'Modo oscuro',
        notification: 'Notificación',
        liquidGlass: `Vidrio líquido: ${hasGlassSupport ? 'Activo / Compatible' : 'No disponible'}`,
        security: 'Privacidad y seguridad',
        faceID: 'Face ID y código',
        camera: 'Acceso a la cámara',
        photoLib: 'Acceso a la fototeca',
        cache: 'Borrar caché',
        support: 'APOYO',
        help: 'Centro de ayuda',
        termsOfService: 'Términos del servicio',
        privacyPolicy: 'política de privacidad',
        appVersion: `Versión de la aplicación: ${appVersion}`,
    },
    languages: {
        title: 'Idioma',
        desc: 'Selecciona el idioma de la interfaz de la aplicación.'
    }
} as const;