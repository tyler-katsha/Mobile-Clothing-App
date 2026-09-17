import {getStyles, ExtendedProps} from "@/components/buttons/types/buttons";
import {Pressable, Text,View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useTheme} from "@/hooks/useTheme";

export default function CustomUploadButton({onPress,text,imageName,size = 22}:ExtendedProps){
    const { colors } = useTheme();

    return (
        <Pressable style={({pressed}) => [getStyles().button,{backgroundColor: colors.surface,borderColor: colors.border},pressed && getStyles().buttonPressed]} onPress={onPress}>
            <View style={getStyles().contentContainer}>
                {imageName && (
                    <AntDesign
                        name={imageName}
                        size={size}
                        color={colors.text}
                        style={getStyles().iconContainer}
                    />
                )}
                <Text style={[getStyles().buttonText, { color: colors.text }]}>
                    {text}
                </Text>
            </View>
        </Pressable>
    );
}