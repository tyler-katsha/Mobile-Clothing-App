import {hasGlassSupport} from "@/app/utils/useSettingsData";
import {appVersion} from "@/app/API/version";

export const ja = {
    auth: {
        googleText: 'Googleで続行',
        appleText: 'Appleで続ける',
        faceIdText: 'Face IDで続行',
        signupText: "アカウントをお持ちではありませんか？",
        privacyText: '続行すると、当社の規約に同意したことになります。',
        privacyLink: '利用規約',
        signupLink: 'サインアップ',
        loginText: 'ログイン',
        createAccount: "アカウントを作成する",
        welcome: "おかえり！",
        subtitle: "ご希望のサインイン方法をお選びください。",
    },

    home: {
        welcomeTitle: 'あなたのワードローブへようこそ',
        greetingMorning: 'おはよう！',
        greetingAfternoon: 'こんにちは！',
        greetingEvening: 'こんばんは！',
        subtitle: '今日のコーディネート.',
        ootdPendingTitle: '予測の分析...',
        ootdPendingDesc: 'その日のコーディネートは、天候に合わせて提案されます。朝6時から8時の間にチェックしてみてください！',
        outfitTitle: 'あなたのコーディネート',
        outfitName: '服装',
        empty: '空きスロット',
    },

    wardrobeBuilder: {
        title: "試着室",
        subTitle: 'アウトフィットスタジオ',
        desc: 'ヘッドウェアからフットウェアまで、レイヤーを厳選しましょう。',
    },
    wardrobeRoom: {
        add: '+ 追加',
        text: 'あなたにぴったりのコーディネートを見つけましょう',
        searchPlaceholder: '服を検索する...',
        title: '私のワードローブ',
        dress: 'ドレス',
        tops: 'トップス',
        pants: 'ズボン',
        accessories: 'アクセサリー',
        addItem: '新しい衣類アイテムを追加',
        cancel: 'キャンセル',
    },
    settings: {
        account: 'クラウドに同期',
        cloud: 'クラウドに同期',
        backup: 'ストレージ管理',
        storageManagement: 'ストレージ管理',
        perf: '設定',
        darkMode: 'ダークモード',
        notification: '通知',
        liquidGlass: `リキッドグラス: ${hasGlassSupport ? 'アクティブ / サポート対象' : '利用不可'}`,
        security: 'プライバシーとセキュリティ',
        faceID: 'Face IDとパスコード',
        camera: 'カメラへのアクセス',
        photoLib: 'フォトライブラリへのアクセス',
        cache: 'キャッシュを消去',
        support: 'サポート',
        help: 'ヘルプセンター',
        termsOfService: '利用規約',
        privacyPolicy: 'プライバシーポリシー',
        appVersion: `アプリのバージョン: ${appVersion}`,
    },
    
    languages: {
        title: '言語',
        desc: 'アプリのインターフェースの言語を選択してください。'
    }

} as const;