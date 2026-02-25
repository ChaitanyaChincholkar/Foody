'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import styles from './page.module.css';

// Using a Client component because we are importing it inside the server component RestaurantPage
export default function MenuClient({ restaurant }: { restaurant: any }) {
    const { addItem, toggleCart } = useCartStore();

    const handleAddToCart = (item: any) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
            restaurantId: restaurant.id
        });
        toggleCart(); // open cart automatically after adding
    };

    return (
        <div className={styles.menuSection}>
            <h2 className={styles.sectionTitle}>Menu</h2>
            <div className={styles.menuGrid}>
                {restaurant.menuItems.map((item: any) => (
                    <div key={item.id} className={styles.menuItem}>
                        <div className={styles.itemImageWrapper}>
                            <Image src={item.image} alt={item.name} fill className={styles.itemImage} sizes="140px" />
                        </div>
                        <div className={styles.itemInfo}>
                            <div className={styles.itemHeader}>
                                <h3 className={styles.itemName}>{item.name}</h3>
                                <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                            </div>
                            <p className={styles.itemDesc}>{item.description}</p>
                            <button className={styles.addBtn} onClick={() => handleAddToCart(item)}>
                                + Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
