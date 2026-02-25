import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { items, restaurantId, deliveryDetails } = body;

        if (!items || items.length === 0 || !restaurantId) {
            return NextResponse.json({ message: 'Invalid order data' }, { status: 400 });
        }

        // Calculate total on the backend to avoid frontend tampering
        let total = 0;
        const orderItemsData = items.map((item: any) => {
            total += item.price * item.quantity;
            return {
                menuItemId: item.id,
                quantity: item.quantity,
                price: item.price
            };
        });

        const order = await prisma.order.create({
            data: {
                userId: session.user.id,
                restaurantId,
                total: total + 2.99, // Add delivery fee
                status: 'PENDING',
                items: {
                    create: orderItemsData
                }
            }
        });

        return NextResponse.json({ message: 'Order created', orderId: order.id }, { status: 201 });
    } catch (error) {
        console.error('Create order error:', error);
        return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
    }
}
