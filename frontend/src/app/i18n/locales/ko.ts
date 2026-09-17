import {hasGlassSupport} from "@/app/utils/useSettingsData";
import {appVersion} from "@/app/API/version";

export const ko = {
    auth: {
        googleText: 'Google로 계속하기',
        appleText: 'Apple로 계속하기',
        faceIdText: 'Face ID로 계속하기',
        signupText: "계정이 없으신가요?",
        privacyText: '계속 진행하시면 당사의 이용약관에 동의하시는 것입니다.',
        privacyLink: '서비스 이용 약관',
        signupLink: '가입하기',
        loginText: '로그인',
        createAccount: "계정 만들기",
        welcome: "다시 오신 것을 환영합니다!",
        subtitle: "선호하는 로그인 방식을 선택해 주세요.",
    },

    home: {
        welcomeTitle: '당신의 옷장에 오신 것을 환영합니다.',
        greetingMorning: '좋은 아침이에요!',
        greetingAfternoon: '좋은 오후에요!',
        greetingEvening: '좋은 저녁이에요!',
        subtitle: '오늘의 코디.',
        ootdPendingTitle: '예보 분석하기...',
        ootdPendingDesc: '날씨에 맞춰 오늘의 스타일을 추천해 드립니다. 오전 6시에서 8시 사이에 다시 확인해 보세요!',
        outfitTitle: '당신의 의상',
        outfitName: '차림새',
        empty: '빈 슬롯',
    },

    wardrobeBuilder: {
        title: "탈의실",
        subTitle: '아웃핏 스튜디오',
        desc: '모자부터 신발까지, 당신만의 레이어드 룩을 완성해 보세요.',
    },
    wardrobeRoom: {
        add: '+ 추가하다',
        text: '가장 좋은 옷을 찾아보세요',
        searchPlaceholder: '의류 검색...',
        title: '나의 옷장',
        dress: '드레스',
        tops: '상의',
        pants: '바지',
        accessories: '부속품',
        addItem: '새 의류 항목 추가',
        cancel: '취소',
    },
    settings: {
        account: '계정 및 동기화',
        cloud: '클라우드에 동기화',
        backup: '백업 및 복원',
        storageManagement: '스토리지 관리',
        perf: '환경설정',
        darkMode: '다크 모드',
        notification: '공고',
        liquidGlass: `액체 유리: ${hasGlassSupport ? '활성 / 지원됨' : '이용 불가'}`,
        security: '개인정보 및 보안',
        faceID: 'Face ID 및 암호',
        camera: '카메라 접근',
        photoLib: '사진 보관함 접근',
        cache: '캐시 지우기',
        support: '지원하다',
        help: '고객 센터',
        termsOfService: '서비스 이용 약관',
        privacyPolicy: '앱 버전',
        appVersion: `앱 버전: ${appVersion}`,
    },
    languages: {
        title: '언어',
        desc: '앱 인터페이스 언어를 선택하세요.'
    }

} as const;