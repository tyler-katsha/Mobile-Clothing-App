

export default function PromptForPermissionSettings(permissionType:string){
    Alert.alert(
        `${permissionType} Access Disabled`, `To use this feature, please enable ${permissionType.toLowerCase()} access in your device settings.`,
        [{ text: 'Cancel', style: 'cancel' },
            {text: 'Open Settings',  onPress: () => Linking.openSettings()}
        ]);
}