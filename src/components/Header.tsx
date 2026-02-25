'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import styles from './Header.module.css';
import Cart from './Cart';

export default function Header() {
    const { toggleCart, items } = useCartStore();
    const { data: session } = useSession();

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logo}>
                        🍔 FoodApp
                    </Link>
                    <nav className={styles.nav}>
                        <button className={styles.cartBtn} onClick={toggleCart}>
                            Cart {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
                        </button>
                        {session ? (
                            <div className={styles.userMenu}>
                                <span className={styles.userName}>Hi, {session.user?.name?.split(' ')[0] || 'User'}</span>
                                <button onClick={() => signOut()} className={styles.logoutBtn}>
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className={styles.loginBtn}>
                                Log In
                            </Link>
                        )}
                    </nav>
                </div>
            </header>
            <Cart />
        </>
    );
}
