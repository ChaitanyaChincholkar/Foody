'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import styles from './Cart.module.css';

export default function Cart() {
    const { items, isOpen, toggleCart, updateQuantity, removeItem, getCartTotal, clearCart } = useCartStore();

    if (!isOpen) return null;

    return (
        <div className={styles.cartOverlay}>
            <div className={styles.cartBackdrop} onClick={toggleCart} />
            <div className={styles.cartPanel}>
                <div className={styles.cartHeader}>
                    <h2>Your Cart</h2>
                    <button className={styles.closeBtn} onClick={toggleCart}>✕</button>
                </div>

                <div className={styles.cartContent}>
                    {items.length === 0 ? (
                        <div className={styles.emptyCart}>
                            <p>Your cart is empty.</p>
                            <button className={styles.continueBtn} onClick={toggleCart}>Browse Restaurants</button>
                        </div>
                    ) : (
                        <div className={styles.itemsList}>
                            {items.map((item) => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemInfo}>
                                        <h4>{item.name}</h4>
                                        <p className={styles.itemPrice}>{item.price.toFixed(2)}</p>
                                    </div>
                                    <div className={styles.itemControls}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>🗑️</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className={styles.cartFooter}>
                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span>{getCartTotal().toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" onClick={toggleCart} className={styles.checkoutBtn}>
                            Proceed to Checkout
                        </Link>
                        <button className={styles.clearBtn} onClick={clearCart}>Clear Cart</button>
                    </div>
                )}
            </div>
        </div>
    );
}
