import * as LocalAuthentication from 'expo-local-authentication';
import {Alert, Linking} from 'react-native';
import {useRouter} from "expo-router";
import {getSecureItem} from "@/app/utils/secureStorage";

export const useBiometricAuth = () => {

    const router = useRouter();
    const key = 'isFaceId';
    const handleBiometric = async () => {

        const storedFaceId = await getSecureItem(key);

        if(storedFaceId === 'false'){
            Alert.alert("Authentication Required",
                "Please enable Face ID or Biometrics in your device settings to continue.",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "App Settings",
                        onPress: () => router.replace('/(tabs)/settings')
                    }
                ]);
            return;
        }
        try{
            // checks if the user has a faceid or touchId
            const hasHardware = await LocalAuthentication.hasHardwareAsync();

            if(!hasHardware){
                Alert.alert("Error","Your device does not support biometric login");
                return;
            }

            // check if the user has actually set up face id or a passcode
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if(!isEnrolled){
                Alert.alert("Error","No Face ID or Passcode is set up on this device.")
                return;
            }

            // trigger the face id scan
            const authResult = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Unlock your Digital Wardrobe',
                fallbackLabel: 'Use Passcode',
                disableDeviceFallback: false,
            });

            if(authResult.success){
                console.log('Success! The user is who they say they are.');
                router.replace('/(tabs)');
                return true;
            } else{
                console.log('Authentication failed or canceled');
                return false;
            }
        } catch (error) {
            console.error("Biometric authentication error:", error);
            Alert.alert("Error","Something went wrong during authentication.");
            return false;
        }
    };


    return { handleBiometric };
}