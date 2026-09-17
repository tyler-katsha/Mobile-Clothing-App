import * as ImagePicker from 'expo-image-picker';
import {Alert, Linking} from "react-native";
import {Props} from "@/components/buttons/types/buttons";
import CustomUploadButton from "@/components/buttons/CustomUploadButton";
import {getSecureItem, saveSecureItem} from "@/app/utils/secureStorage";



export default function CameraUploadButton({onImageSelected}:Props){

    const handleCameraPress = async () => {
        const existingPermission = await ImagePicker.getCameraPermissionsAsync();

        const key = 'isCameraAccess';

        let finalGranted = existingPermission.granted;
        console.log(`Inside of Camera press: ${finalGranted}`)

        const cameraAccess = await getSecureItem(key);

        console.log(`Key: ${cameraAccess}`)
        await saveSecureItem(key,existingPermission.granted ? 'true' : 'false');
        if (!finalGranted) {
            const requestResult = await ImagePicker.requestCameraPermissionsAsync();
            finalGranted = requestResult.granted;
        }

        if (!finalGranted) {
            Alert.alert(
                "Camera Permission Required",
                "You have disabled camera access. Please enable it in your device settings to use this feature.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Open Settings", onPress: () => Linking.openSettings() }
                ]
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            onImageSelected(result.assets[0].uri);
        }
    };
    return (
        <CustomUploadButton onImageSelected={onImageSelected} onPress={handleCameraPress} text='Take a Photo' imageName='camera'/>
    );
}

