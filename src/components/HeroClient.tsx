'use client';

import { useState, MouseEvent, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/page.module.css';

export default function HeroClient() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        if (!isMounted) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
        const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
        setMousePos({ x, y });
    };

    // Safe defaults for SSR
    const rotateX = isMounted ? mousePos.y * -15 : 0;
    const rotateY = isMounted ? mousePos.x * 15 : 0;

    return (
        <section className={styles.hero} onMouseMove={handleMouseMove}>
            {/* Background glowing orbs */}
            <div className={styles.orb1}></div>
            <div className={styles.orb2}></div>
            <div className={styles.orb3}></div>

            {/* Main 3D Container */}
            <div
                className={styles.heroContent}
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`
                }}
            >
                {/* Floating Abstract Food Images */}
                <div
                    className={`${styles.floatingElement} ${styles.floatBurger}`}
                    style={{ transform: `translateZ(120px) translateX(${mousePos.x * -40}px) translateY(${mousePos.y * -40}px)` }}
                >
                    <div className={styles.imageCard}>
                        <Image src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" alt="Burger" width={140} height={140} className={styles.floatImg} />
                    </div>
                </div>

                <div
                    className={`${styles.floatingElement} ${styles.floatPizza}`}
                    style={{ transform: `translateZ(160px) translateX(${mousePos.x * 50}px) translateY(${mousePos.y * 50}px)` }}
                >
                    <div className={styles.imageCard}>
                        <Image src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80" alt="Pizza" width={160} height={160} className={styles.floatImg} />
                    </div>
                </div>

                <div
                    className={`${styles.floatingElement} ${styles.floatNoodles}`}
                    style={{ transform: `translateZ(90px) translateX(${mousePos.x * -30}px) translateY(${mousePos.y * 60}px)` }}
                >
                    <div className={styles.imageCard}>
                        <Image src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80" alt="Snacks" width={120} height={120} className={styles.floatImg} />
                    </div>
                </div>

                {/* Text and Search */}
                <div className={styles.heroTextContainer}>
                    <div className={styles.badge3d}>Premium Delivery</div>
                    <h1 className={styles.heroTitle}>Craving Something Delicious?</h1>
                    <p className={styles.heroSubtitle}>
                        Order from the best local restaurants with fast, reliable delivery right to your door.
                    </p>
                    <div className={styles.searchBarContainer}>
                        <div className={styles.searchBar}>
                            <input type="text" placeholder="Search for restaurants, cuisines..." className={styles.searchInput} />
                            <button className={styles.searchBtn}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
