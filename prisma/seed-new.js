const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding more restaurants (Indian Data)...');

    // We are NOT wiping users so logins still work
    // But we will wipe old restaurants to refresh data
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.menuItem.deleteMany({});
    await prisma.restaurant.deleteMany({});

    const restaurants = [
        {
            name: "Tandoori Nights",
            description: "Authentic North Indian cuisine with rich gravies and tandoor specialties.",
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
            rating: 4.8,
            deliveryTime: "30-45 min",
            menuItems: {
                create: [
                    { name: "Butter Chicken", description: "Tender chicken cooked in a rich, creamy tomato gravy.", price: 350.00, image: "https://images.unsplash.com/photo-1603894584373-baefe3ce8c73?auto=format&fit=crop&w=800&q=80" },
                    { name: "Garlic Naan", description: "Soft indian flatbread infused with garlic and butter.", price: 60.00, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80" },
                    { name: "Paneer Tikka Masala", description: "Cottage cheese chunks cooked in spiced tikka gravy.", price: 280.00, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80" },
                    { name: "Mutton Biryani", description: "Fragrant basmati rice cooked with succulent mutton pieces and aromatic spices.", price: 450.00, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80" }
                ]
            }
        },
        {
            name: "South Indian Express",
            description: "Crispy dosas, fluffy idlis, and spicy chutneys from the heart of South India.",
            image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
            rating: 4.6,
            deliveryTime: "20-35 min",
            menuItems: {
                create: [
                    { name: "Masala Dosa", description: "Crispy crepe filled with spiced potato mash.", price: 120.00, image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=800&q=80" },
                    { name: "Idli Sambar", description: "Steamed rice cakes served with lentil soup and coconut chutney.", price: 80.00, image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=800&q=80" }, // reusing placeholder visually
                    { name: "Medu Vada", description: "Crispy lentil donuts served with sambar and chutney.", price: 90.00, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80" }
                ]
            }
        },
        {
            name: "Street Chaat Corner",
            description: "Tangy, spicy, and irresistible street food delicacies.",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
            rating: 4.4,
            deliveryTime: "15-25 min",
            menuItems: {
                create: [
                    { name: "Pani Puri", description: "Crispy hollow puris filled with spicy tangy water and potatoes.", price: 60.00, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80" }, // Placeholder matching
                    { name: "Pav Bhaji", description: "Spicy mashed vegetable curry served with buttered bread rolls.", price: 150.00, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80" },
                    { name: "Samosa Chaat", description: "Crushed samosas topped with yogurt, chutneys, and spices.", price: 80.00, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80" } // Placeholder matching
                ]
            }
        },
        {
            name: "The Pizza Oven",
            description: "Wood-fired artisanal pizzas from traditional italian recipes.",
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
            rating: 4.6,
            deliveryTime: "30-45 min",
            menuItems: {
                create: [
                    { name: "Margherita", description: "San Marzano tomatoes, fresh mozzarella, basil, EVOO.", price: 300.00, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80" },
                    { name: "Pepperoni Hot", description: "Tomato sauce, mozzarella, spicy pepperoni, hot honey.", price: 450.00, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80" },
                    { name: "Truffle Mushroom", description: "White base, roasted mushrooms, truffle oil, parmesan.", price: 480.00, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" }
                ]
            }
        },
        {
            name: "Burger & Brews",
            description: "Gourmet burgers stacked high with premium ingredients and hand-cut fries.",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
            rating: 4.7,
            deliveryTime: "25-35 min",
            menuItems: {
                create: [
                    { name: "Classic Cheeseburger", description: "Angus beef patty with cheddar, lettuce, tomato, and house sauce.", price: 250.00, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" },
                    { name: "Double Bacon Smash", description: "Two smashed beef patties with crispy bacon and american cheese.", price: 380.00, image: "https://images.unsplash.com/photo-1594212202863-41bb331de810?auto=format&fit=crop&w=800&q=80" },
                    { name: "Peri Peri Fries", description: "Crispy fries tossed in spicy peri peri seasoning.", price: 120.00, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80" }
                ]
            }
        },
        {
            name: "Dessert Factory",
            description: "Decadent cakes, warm brownies, and sweet treats to satisfy your cravings.",
            image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
            rating: 4.9,
            deliveryTime: "15-25 min",
            menuItems: {
                create: [
                    { name: "Chocolate Lava Cake", description: "Warm chocolate cake with a gooey molten center.", price: 180.00, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80" },
                    { name: "Cheesecake Slice", description: "Classic New York style cheesecake with berry compote.", price: 220.00, image: "https://images.unsplash.com/photo-1533134242443-d48e24c237fc?auto=format&fit=crop&w=800&q=80" },
                    { name: "Gulab Jamun", description: "Soft, spongy milk dumplings soaked in rose-flavored sugar syrup.", price: 90.00, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80" } // Placeholder
                ]
            }
        }
    ];

    for (const r of restaurants) {
        const created = await prisma.restaurant.create({ data: r });
        console.log(`Created new restaurant: ${created.name}`);
    }

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
