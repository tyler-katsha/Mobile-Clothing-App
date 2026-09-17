import {hasGlassSupport} from "@/app/utils/useSettingsData";
import {appVersion} from "@/app/API/version";

export const fr = {
    auth: {
        googleText: 'Continuer avec Google',
        appleText: 'Continuer avec Apple',
        faceIdText: 'Continuer avec Face ID',
        signupText: "Vous n'avez pas de compte?",
        privacyText: 'En continuant, vous acceptez nos conditions générales.',
        privacyLink: "Conditions d'utilisation",
        signupLink: "S'inscrire",
        loginText: 'Se connecter',
        createAccount: "Créer un compte",
        welcome: "Content de te revoir!",
        subtitle: "Veuillez choisir votre méthode de connexion préférée.",
    },

    home: {
        welcomeTitle: 'Bienvenue dans votre garde-robe',
        greetingMorning: 'Bonjour!',
        greetingAfternoon: 'Bon après-midi!',
        greetingEvening: 'Bonne soirée!',
        subtitle: 'Tenue du jour.',
        ootdPendingTitle: 'Analyse des prévisions...',
        ootdPendingDesc: 'Votre tenue du jour est sélectionnée en fonction de la météo. Revenez consulter la suggestion entre 6 h et 8 h du matin !',
        outfitTitle: 'Vos tenues',
        outfitName: 'Tenue',
        empty: 'Emplacement vide',
    },

    wardrobeBuilder: {
        title: "Cabine d'essayage",
        subTitle: 'Studio de tenues',
        desc: 'Composez vos superpositions, de la coiffe aux chaussures.',
    },
    wardrobeRoom: {
        add: '+ Ajouter',
        text: 'Trouvez votre meilleure tenue',
        searchPlaceholder: 'Rechercher des vêtements...',
        title: 'Ma garde-robe',
        dress: 'Robes',
        tops: 'Hauts',
        pants: 'Pantalon',
        accessories: 'Accessoires',
        addItem: 'Ajouter un nouvel article vestimentaire',
        cancel: 'Annuler',
    },
    settings: {
        account: 'Compte et synchronisation',
        cloud: 'Synchroniser avec le cloud',
        backup: 'Sauvegarde et restauration',
        storageManagement: 'Gestion du stockage',
        perf: 'PRÉFÉRENCES',
        darkMode: 'Mode sombre',
        notification: 'Notification',
        liquidGlass: `Verre liquide: ${hasGlassSupport ? 'Actif / Pris en charge' : 'Pas disponible'}`,
        security: 'Confidentialité et sécurité',
        faceID: 'Face ID et code',
        camera: 'Accès à la caméra',
        photoLib: 'Accès à la photothèque',
        cache: 'Vider le cache',
        support: 'SOUTIEN',
        help: "Centre d'aide",
        termsOfService: "Conditions d'utilisation",
        privacyPolicy: 'politique de confidentialité',
        appVersion: `politique de confidentialité: ${appVersion}`,
    },
    languages: {
        title: 'Langue',
        desc: "Choisissez la langue de l'interface de l'application."
    }

} as const;