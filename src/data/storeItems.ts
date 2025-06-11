export interface StoreItem {
    id: string;
    name: string;
    description: string;
    url?: string;
    alt?: string;
    cost: number;
}

export const storeItems: StoreItem[] = [
    {
        id: "1",
        name: "Coders Hub Backpack",
        description: "Stylish and durable backpack for your coding gear",
        url: "/bag.png",
        alt: "Picture of the bag",
        cost: 8000,
    },
    {
        id: "2",
        name: "Programmer's Water Bottle",
        description: "Keep hydrated while coding with this premium bottle",
        url: "/bottle.png",
        alt: "Picture of the bag",
        cost: 1000,
    },
    {
        id: "3",
        name: "Developer Notebook",
        description: "High-quality notebook for sketching your ideas",
        url: "/notebook.png",
        alt: "Picture of the bag",
        cost: 500,
    },
    {
        id: "4",
        name: "Keyboard Keychain",
        description: "Cute keyboard-shaped keychain for your keys",
        url: "/keychain.png",
        alt: "Picture of the bag",
        cost: 250,
    },
    {
        id: "5",
        name: "Coders Hub T-Shirt",
        description: "Comfortable cotton t-shirt with Coders Hub logo",
        url: "/tshirt.png",
        alt: "Picture of the bag",
        cost: 6000,
    },
    {
        id: "6",
        name: "Code Mug",
        description: "Perfect mug for your coffee/tea coding sessions",
        url: "/mug.png",
        alt: "Picture of the bag",
        cost: 4000,
    },
];
