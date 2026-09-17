import {hasGlassSupport} from "@/app/utils/useSettingsData";
import {appVersion} from "@/app/API/version";

export const zh = {
    auth: {
        googleText: '继续使用 Google 账号',
        appleText: '继续使用 Apple',
        faceIdText: '继续使用面容 ID',
        signupText: "还没有账户？",
        privacyText: '继续操作即表示您同意我们的条款',
        privacyLink: '服务条款',
        signupLink: '报名',
        loginText: '登录',
        createAccount: "创建账户",
        welcome: "欢迎回来！",
        subtitle: "请选择您偏好的登录方式。",
    },

    home: {
        welcomeTitle: '欢迎来到您的衣橱',
        greetingMorning: '早上好！',
        greetingAfternoon: '晚上好！',
        greetingEvening: '晚上好！',
        subtitle: '今日穿搭。',
        ootdPendingTitle: '正在分析预测……',
        ootdPendingDesc: '我们会根据天气为您精心搭配每日造型。请在早上 6:00 至 8:00 之间回来查看！',
        outfitTitle: '你的穿搭',
        outfitName: '全套服装',
        empty: '空槽位',
    },

    wardrobeBuilder: {
        title: "试衣间",
        subTitle: '服装工作室',
        desc: '精心搭配从头饰到鞋履的各层穿搭。',
    },
    wardrobeRoom: {
        add: '+ 添加',
        text: '找到最适合你的穿搭',
        searchPlaceholder: '搜索服装...',
        title: '我的衣橱',
        dress: '连衣裙',
        tops: '最高额',
        pants: '裤子',
        accessories: '配件',
        addItem: '添加新衣物',
        cancel: '取消',
    },
    settings: {
        account: '账户与同步',
        cloud: '同步到云端',
        backup: '备份与还原',
        storageManagement: '存储管理',
        perf: '偏好设置',
        darkMode: '深色模式',
        notification: '通知',
        liquidGlass: `液态玻璃: ${hasGlassSupport ? '活跃 / 受支持' : '无法使用'}`,
        security: '隐私与安全',
        faceID: '面容 ID 与密码',
        camera: '摄像头访问权限',
        photoLib: '照片图库访问权限',
        cache: '清除缓存',
        support: '支持',
        help: '帮助中心',
        termsOfService: '服务条款',
        privacyPolicy: '隐私政策',
        appVersion: `应用版本: ${appVersion}`,
    },
    languages: {
        title: '语言',
        desc: '选择应用程序界面的语言。'
    }
} as const;