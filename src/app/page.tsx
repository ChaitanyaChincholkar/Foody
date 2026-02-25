import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import HeroClient from '@/components/HeroClient';

const prisma = new PrismaClient();

export default async function Home() {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { rating: 'desc' },
  });

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <HeroClient />

      {/* Restaurant Grid Section */}
      <section className={styles.restaurantSection}>
        <div className={styles.sectionHeader}>
          <h2>Top Rated Restaurants</h2>
        </div>

        <div className={styles.grid}>
          {restaurants.map((restaurant: any) => (
            <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.deliveryBadge}>{restaurant.deliveryTime}</div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{restaurant.name}</h3>
                  <div className={styles.ratingBadge}>
                    <span>⭐</span> {restaurant.rating}
                  </div>
                </div>
                <p className={styles.cardDescription}>{restaurant.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
