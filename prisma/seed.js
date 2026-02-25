const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@foodapp.com' },
        update: {},
        create: {
            email: 'admin@foodapp.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });
    console.log(`Created admin user: ${adminUser.email}`);

    // Create basic user
    const basicUser = await prisma.user.upsert({
        where: { email: 'user@foodapp.com' },
        update: {},
        create: {
            email: 'user@foodapp.com',
            name: 'Test User',
            password: hashedPassword,
            role: 'USER',
        },
    });
    console.log(`Created test user: ${basicUser.email}`);

    // Clean existing restaurants and menu items to avoid duplicates on re-seed
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.menuItem.deleteMany({});
    await prisma.restaurant.deleteMany({});

    // Restaurants
    const r1 = await prisma.restaurant.create({
        data: {
            name: "Burger Haven",
            description: "Best burgers in the city, made with fresh organic ingredients.",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
            rating: 4.8,
            deliveryTime: "25-35 min",
            menuItems: {
                create: [
                    {
                        name: "Classic Cheeseburger",
                        description: "Angus beef patty with cheddar, lettuce, tomato, and house sauce.",
                        price: 12.99,
                        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        name: "Double Bacon Smash",
                        description: "Two smashed beef patties with crispy bacon and american cheese.",
                        price: 15.99,
                        image: "https://images.unsplash.com/photo-1594212202863-41bb331de810?auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        name: "Truffle Fries",
                        description: "Crispy fries tossed in truffle oil and parmesan cheese.",
                        price: 6.99,
                        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80"
                    }
                ]
            }
        }
    });
    console.log(`Created restaurant: ${r1.name}`);

    const r2 = await prisma.restaurant.create({
        data: {
            name: "Sushi Sakura",
            description: "Authentic japanese sushi, sashimi, and warm bowls.",
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
            rating: 4.9,
            deliveryTime: "40-55 min",
            menuItems: {
                create: [
                    {
                        name: "Spicy Tuna Roll",
                        description: "Fresh tuna, spicy mayo, cucumber, topped with sesame.",
                        price: 14.50,
                        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        name: "Dragon Roll",
                        description: "Eel, cucumber, topped with avocado and sweet eel sauce.",
                        price: 16.50,
                        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        name: "Miso Soup",
                        description: "Traditional japanese soup with tofu and seaweed.",
                        price: 4.00,
                        image: "https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&w=800&q=80"
                    }
                ]
            }
        }
    });
    console.log(`Created restaurant: ${r2.name}`);

    const r3 = await prisma.restaurant.create({
        data: {
            name: "Pizza Napoli",
            description: "Wood-fired artisanal pizzas from traditional italian recipes.",
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
            rating: 4.6,
            deliveryTime: "30-45 min",
            menuItems: {
                create: [
                    {
                        name: "Margherita",
                        description: "San Marzano tomatoes, fresh mozzarella, basil, EVOO.",
                        price: 18.00,
                        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        name: "Pepperoni Hot",
                        description: "Tomato sauce, mozzarella, spicy pepperoni, hot honey.",
                        price: 21.00,
                        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80"
                    }
                ]
            }
        }
    });
    console.log(`Created restaurant: ${r3.name}`);

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
