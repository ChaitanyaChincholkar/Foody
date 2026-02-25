'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';

export default function CheckoutPage() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isClient, setIsClient] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    restaurantId: items[0]?.restaurantId, // all items belong to same restaurant per cart logic
                }),
            });

            if (res.ok) {
                const data = await res.json();
                clearCart();
                router.push(`/order/{data.orderId}`);
            } else {
                const data = await res.json();
                alert(`Error: {data.message || 'Could not place order'}`);
            }
        } catch (error) {
            alert('An unexpected error occurred.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isClient || status === 'loading') return null;

    if (!session) {
        return (
            <div className={styles.emptyContainer}>
                <h2>Authentication Required</h2>
                <p>Please log in to complete your checkout.</p>
                <button className={styles.backBtn} onClick={() => router.push('/login')}>Log In</button>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <h2>Your cart is empty</h2>
                <p>Please add some delicious items before checking out.</p>
                <button className={styles.backBtn} onClick={() => router.push('/')}>Browse Restaurants</button>
            </div>
        );
    }

    return (
        <div className={styles.checkoutPage}>
            <div className={styles.headerRow}>
                <h1>Checkout</h1>
            </div>

            <div className={styles.mainGrid}>
                <div className={styles.leftCol}>
                    <div className={styles.card}>
                        <h3>Delivery Details</h3>
                        <form id="checkout-form" onSubmit={handlePlaceOrder} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Full Name</label>
                                <input type="text" placeholder="John Doe" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Address</label>
                                <input type="text" placeholder="123 Main St, Apt 4B" required />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>City</label>
                                    <input type="text" placeholder="New York" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Phone Number</label>
                                    <input type="tel" placeholder="(555) 123-4567" required />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className={styles.card}>
                        <h3>Payment Method</h3>
                        <div className={styles.paymentMethods}>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="payment" defaultChecked /> Credit/Debit Card
                            </label>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="payment" /> PayPal
                            </label>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="payment" /> Cash on Delivery
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.rightCol}>
                    <div className={styles.summaryCard}>
                        <h3>Order Summary</h3>
                        <div className={styles.summaryItems}>
                            {items.map(item => (
                                <div key={item.id} className={styles.summaryItem}>
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.totals}>
                            <div className={styles.totalRow}>
                                <span>Subtotal</span>
                                <span>{getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Delivery Fee</span>
                                <span>2.99</span>
                            </div>
                            <div className={`{styles.totalRow} {styles.grandTotal}`}>
                                <span>Total</span>
                                <span>{(getCartTotal() + 2.99).toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            className={styles.placeOrderBtn}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
