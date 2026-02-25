import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import MenuClient from './MenuClient';

const prisma = new PrismaClient();

export default async function RestaurantPage({ params }: { params: { id: string } }) {
    // Await the params object in Next.js 15
    const resolvedParams = await params;

    const restaurant = await prisma.restaurant.findUnique({
        where: { id: resolvedParams.id },
        include: { menuItems: true },
    });

    if (!restaurant) {
        notFound();
    }

    return (
        <div className={styles.restaurantPage}>
            <div className={styles.hero}>
                <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className={styles.heroImage}
                    priority
                />
                <div className={styles.heroOverlay}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>{restaurant.name}</h1>
                        <p className={styles.description}>{restaurant.description}</p>
                        <div className={styles.meta}>
                            <span className={styles.rating}>⭐ {restaurant.rating}</span>
                            <span className={styles.delivery}>🕒 {restaurant.deliveryTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            <MenuClient restaurant={restaurant} />
        </div>
    );
}
