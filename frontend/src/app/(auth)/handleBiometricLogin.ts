import * as LocalAuthentication from 'expo-local-authentication';
import {Alert} from 'react-native';
import {useRouter} from "expo-router";

export const useBiometricAuth = () => {

    const router = useRouter();
    const handleBiometric = async () => {
        try{
            // checks if the user has a faceid or touchid
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
                router.push('/(tabs)');
                return false;
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