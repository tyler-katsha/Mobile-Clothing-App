export interface Feature{
    name:string;
    route?:string;
    type?: 'link' | 'toggle';
    value?:boolean;
    onToggle?: (val:boolean) => void;
}
export interface SectionProps{
    title:string;
    features: Feature[];
}
export interface SectionRowProps{
    feature:Feature;
    isLastItem:boolean;
}