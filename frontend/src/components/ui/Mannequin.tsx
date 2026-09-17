import {MannequinProps} from "@/app/types/Mannequin";
import React from "react";
import Svg, {Path,G} from "react-native-svg";

export const FemaleMannequin: React.FC<MannequinProps> = ({fill = '#000000',style}) => {

    return (
        <Svg width='100%' height='100%' viewBox='0 0 500 1000' style={style}>
            <G fill={fill}>
                <Path d="M 250 80 A 70 70 0 1 0 250 220 A 70 70 0 1 0 250 80 Z" />
                <Path
                    d="M 125 260 A 25 25 0 0 0 100 285 L 100 625 A 25 25 0 0 0 150 625 L 150 285 A 25 25 0 0 0 125 260 Z"
                    transform="rotate(-8 125 285)"
                />
                <Path
                    d="M 375 260 A 25 25 0 0 0 350 285 L 350 625 A 25 25 0 0 0 400 625 L 400 285 A 25 25 0 0 0 375 260 Z"
                    transform="rotate(8 375 285)"
                />
                <Path d="M 210 260 L 290 260 A 30 30 0 0 1 320 290 L 370 650 A 15 15 0 0 1 355 670 L 145 670 A 15 15 0 0 1 130 650 L 180 290 A 30 30 0 0 1 210 260 Z" />
                <Path d="M 320 670 L 320 892.5 A 27.5 27.5 0 0 1 265 892.5 L 265 670 Z M 235 670 L 235 892.5 A 27.5 27.5 0 0 1 180 892.5 L 180 670 Z" />
            </G>
        </Svg>
    )
}
export const MaleMannequin: React.FC<MannequinProps> = ({fill = '#000000',style}) => {
    return (
        <Svg width='100%' height='100%' viewBox='0 0 500 1000' style={style}>
            <G fill={fill}>
                <Path d="M 250 80 A 70 70 0 1 0 250 220 A 70 70 0 1 0 250 80 Z" />
                <Path d="M 135 260 A 25 25 0 0 0 110 285 L 110 625 A 25 25 0 0 0 160 625 L 160 285 A 25 25 0 0 0 135 260 Z" />
                <Path d="M 365 260 A 25 25 0 0 0 340 285 L 340 625 A 25 25 0 0 0 390 625 L 390 285 A 25 25 0 0 0 365 260 Z" />
                <Path d="M 210 260 L 290 260 A 30 30 0 0 1 320 290 L 320 892.5 A 27.5 27.5 0 0 1 265 892.5 L 265 620 A 15 15 0 0 0 235 620 L 235 892.5 A 27.5 27.5 0 0 1 180 892.5 L 180 290 A 30 30 0 0 1 210 260 Z" />
            </G>
        </Svg>
    )
}