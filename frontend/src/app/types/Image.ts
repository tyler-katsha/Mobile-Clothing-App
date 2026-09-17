
export interface ExtendedImageCardProps extends ImageCardProps {
    onPress?: () => void;
    favorite?:boolean;
    onFavoriteToggle?: () => void;
}
export interface ImageCardProps{
    imageUrl:string;
    title?:string;
}

export interface ImageDetails{
    originalUrl: string;
    noBgUrl?:string;
    thumbnailUrl?:string;
}

