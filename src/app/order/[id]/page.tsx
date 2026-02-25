import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import TrackingClient from './TrackingClient';
import styles from './page.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export default async function OrderPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
        return <div className={styles.container}>Please log in to view this order.</div>;
    }

    const order = await prisma.order.findUnique({
        where: { id: resolvedParams.id },
        include: {
            items: {
                include: { menuItem: true }
            },
            restaurant: true
        }
    });

    if (!order) {
        notFound();
    }

    if (order.userId !== session.user.id) {
        return <div className={styles.container}>Unauthorized to view this order.</div>;
    }

    const safeOrder = {
        ...order,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
    };

    return (
        <div className={styles.pageContainer}>
            <TrackingClient order={safeOrder} />
        </div>
    );
}
