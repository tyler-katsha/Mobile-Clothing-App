import {ClothingItem} from "@/app/types/Clothing";

export const mockClothingData: ClothingItem[] = [
    {
        id: "item_101",
        userId: "user_55",
        title: "Vintage Denim Jacket",
        category: "OUTERWEAR",
        subCategory: "Jacket",
        colors: ["Blue"],
        seasons: ["SPRING", "AUTUMN", "WINTER"],
        occasions: ["Casual", "Everyday"],
        brand: "Levi's",
        imageDetails: {
            originalUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=400&auto=format&fit=crop",
            noBgUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=400&auto=format&fit=crop", // Placeholder
            thumbnailUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=150&auto=format&fit=crop"
        },
        processingStatus: "COMPLETED",
        archived: false,
        createdAt: "2024-10-12T14:30:00Z",
        updatedAt: "2024-10-12T14:35:00Z"
    },
    {
        id: "item_102",
        userId: "user_55",
        title: "Essential White Tee",
        category: "TOP",
        subCategory: "T-Shirt",
        colors: ["White"],
        seasons: ["SPRING", "SUMMER", "AUTUMN", "WINTER"],
        occasions: ["Casual", "Lounge", "Gym"],
        brand: "Uniqlo",
        imageDetails: {
            originalUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop",
            noBgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop",
            thumbnailUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=150&auto=format&fit=crop"
        },
        processingStatus: "COMPLETED",
        archived: false,
        createdAt: "2024-10-15T09:15:00Z",
        updatedAt: "2024-10-15T09:15:00Z"
    },
    {
        id: "item_103",
        userId: "user_55",
        title: "Classic Black Chinos",
        category: "BOTTOM",
        subCategory: "Pants",
        colors: ["Black"],
        seasons: ["SPRING", "AUTUMN", "WINTER"],
        occasions: ["Smart Casual", "Work", "Dinner"],
        brand: "Dockers",
        imageDetails: {
            originalUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop",
            noBgUrl: "", // Simulating an item that hasn't finished background removal
            thumbnailUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=150&auto=format&fit=crop"
        },
        processingStatus: "PROCESSING",
        archived: false,
        createdAt: "2024-10-20T18:45:00Z",
        updatedAt: "2024-10-20T18:45:00Z"
    }
];