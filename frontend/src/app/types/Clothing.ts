import {Category, ProcessingStatus, Season} from "@/app/types/type";
import {ImageDetails} from "@/app/types/Image";

export type GENDER = 'MALE' | 'FEMALE';

export interface ClothingLayer{
    id:string;
    canvasImageUrl:string;
    zIndex:number; // e.g., 1 for bottoms, 2 for tops, 3 for jackets
}

export interface OutfitDisplayProps{
    bodyType: GENDER;
    clothingLayers: ClothingLayer[];
}
export interface ClothingItem{
    id:string;
    userId:string;
    title:string;
    category:Category;
    subCategory:string;
    colors:string[];
    seasons:Season[];
    occasions:string[];
    brand:string;
    imageDetails:ImageDetails;
    processingStatus:ProcessingStatus;
    archived:boolean;
    createdAt:string;
    updatedAt:string;
    favorite?: boolean;
}
export interface ClothingRowData {
    id: string;
    title: string;
    items: ClothingItem[];
}

export interface ClothingRowProps {
    items: ClothingItem[];
    currentIndex: number;
    onPrev: () => void;
    onNext: () => void;
    backgroundColor?: string;
    borderColor?: string;
}