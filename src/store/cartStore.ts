import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string; // menu item id
    name: string;
    price: number;
    quantity: number;
    image?: string;
    restaurantId: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (item) => set((state) => {
                const existingItem = state.items.find((i) => i.id === item.id);

                // Prevent adding items from different restaurants
                if (state.items.length > 0 && state.items[0].restaurantId !== item.restaurantId) {
                    alert('You can only order from one restaurant at a time. Please clear your cart first.');
                    return state;
                }

                if (existingItem) {
                    return {
                        items: state.items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                        )
                    };
                }
                return { items: [...state.items, item] };
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i.id !== id)
            })),

            updateQuantity: (id, quantity) => set((state) => ({
                items: quantity <= 0
                    ? state.items.filter((i) => i.id !== id)
                    : state.items.map((i) => i.id === id ? { ...i, quantity } : i)
            })),

            clearCart: () => set({ items: [] }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            getCartTotal: () => {
                const { items } = get();
                return items.reduce((total, item) => total + (item.price * item.quantity), 0);
            }
        }),
        {
            name: 'foodapp-cart-storage',
            partialize: (state) => ({ items: state.items })
        }
    )
);
