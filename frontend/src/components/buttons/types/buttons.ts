import {StyleSheet} from "react-native";

export type Props = {
    onImageSelected: (uri:string) => void;

}
export type ExtendedProps = Props & {
    onPress: () => void;
    text:string;
    imageName:'camera' | 'file-image';
    size?:number;
};

export const getStyles = () => StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginVertical: 6,
        borderWidth: StyleSheet.hairlineWidth,
    },
    buttonPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: -0.4,
    },
    iconContainer: {
        marginRight: 8,
    },
});