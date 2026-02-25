'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

const steps = ['PENDING', 'PREPARING', 'OUT FOR DELIVERY', 'DELIVERED'];

export default function TrackingClient({ order }: { order: any }) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Simulate live tracking progression
        const timer1 = setTimeout(() => setCurrentStep(1), 5000); // 5s: Preparing
        const timer2 = setTimeout(() => setCurrentStep(2), 15000); // 15s: Out for Delivery
        const timer3 = setTimeout(() => setCurrentStep(3), 30000); // 30s: Delivered

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const progressPercentage = (currentStep / (steps.length - 1)) * 100;

    return (
        <div className={styles.trackingContainer}>
            <div className={styles.header}>
                <h1>Live Order Tracking 🛵</h1>
                <p className={styles.orderIdText}>Order ID: <strong>{order.id}</strong></p>
                <p className={styles.restaurantName}>from <strong>{order.restaurant.name}</strong></p>
            </div>

            <div className={styles.progressSection}>
                <h2 className={styles.statusText}>{steps[currentStep]}</h2>

                <div className={styles.progressBarBg}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                <div className={styles.stepsRow}>
                    {steps.map((step, index) => (
                        <div
                            key={step}
                            className={`${styles.stepIndicator} ${index <= currentStep ? styles.stepActive : ''}`}
                        >
                            <div className={styles.stepDot}></div>
                            <span className={styles.stepLabel}>{step}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.orderDetails}>
                <h3>Order Summary</h3>
                <div className={styles.itemsList}>
                    {order.items.map((item: any) => (
                        <div key={item.id} className={styles.orderItem}>
                            <span>{item.quantity}x {item.menuItem.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.totalRow}>
                    <span>Total Paid</span>
                    <span className={styles.totalPrice}>${order.total.toFixed(2)}</span>
                </div>
            </div>

            <div className={styles.actions}>
                <Link href="/" className={styles.homeBtn}>Back to Home</Link>
            </div>
        </div>
    );
}
