import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
table = dynamodb.Table('QuickBiteRestaurants')

restaurants = [
    {"id": 1, "title": "The Galactic Grill", "cuisine": "Burgers", "meta": "20–30 min • 1.2 mi", "type": "$$ • Burgers", "rating": "4.7", "reviews": 1234, "badge": "30% OFF", "badgeClass": "discount", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", "description": "Galactic Grill serves out-of-this-world smash burgers stacked with house-smoked bacon, aged cheddar, and signature cosmic sauce.", "menu": [
        {"id": "m1", "name": "Cosmic Smash Burger", "price": Decimal("12.99"), "desc": "Double smash patty, aged cheddar, cosmic sauce", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"},
        {"id": "m2", "name": "Nebula Chicken Sandwich", "price": Decimal("11.49"), "desc": "Crispy fried chicken, pickled slaw, chipotle aioli", "image": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=400&q=80"},
        {"id": "m3", "name": "Asteroid Fries", "price": Decimal("4.99"), "desc": "Thick-cut seasoned fries with dipping sauce", "image": "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=80"},
        {"id": "m4", "name": "Galaxy Milkshake", "price": Decimal("6.49"), "desc": "Hand-spun shake in chocolate, vanilla, or strawberry", "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"},
    ]},
    {"id": 2, "title": "Ocean's Eleven Sushi", "cuisine": "Sushi", "meta": "20–35 min • 1.5 mi", "type": "$$$ • Sushi", "rating": "4.8", "reviews": 2456, "badge": "BESTSELLER", "badgeClass": "bestseller", "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80", "description": "Ocean's Eleven brings chef-crafted nigiri, inventive rolls, and premium omakase sets straight to your door.", "menu": [
        {"id": "m1", "name": "Spicy Tuna Roll (8pc)", "price": Decimal("14.99"), "desc": "Fresh tuna, sriracha, cucumber, sesame", "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80"},
        {"id": "m2", "name": "Dragon Roll (8pc)", "price": Decimal("16.99"), "desc": "Shrimp tempura, avocado, eel sauce", "image": "https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=400&q=80"},
        {"id": "m3", "name": "Salmon Nigiri (2pc)", "price": Decimal("7.49"), "desc": "Premium Atlantic salmon over sushi rice", "image": "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=400&q=80"},
        {"id": "m4", "name": "Miso Soup", "price": Decimal("2.99"), "desc": "Traditional dashi, tofu, wakame", "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80"},
    ]},
    {"id": 3, "title": "Sizzle Ramen Bar", "cuisine": "Ramen", "meta": "20–35 min • 2.0 mi", "type": "$$ • Ramen", "rating": "4.6", "reviews": 987, "badge": "20% OFF", "badgeClass": "discount", "image": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80", "description": "Sizzle Ramen Bar slow-simmers rich tonkotsu and miso broths for 18 hours.", "menu": [
        {"id": "m1", "name": "Tonkotsu Ramen", "price": Decimal("15.99"), "desc": "18-hour pork broth, chashu, soft egg, nori", "image": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=400&q=80"},
        {"id": "m2", "name": "Spicy Miso Ramen", "price": Decimal("14.99"), "desc": "Miso broth, ground pork, corn, butter", "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80"},
        {"id": "m3", "name": "Pan-Fried Gyoza (6pc)", "price": Decimal("8.49"), "desc": "Crispy pork-cabbage dumplings, ponzu dip", "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80"},
        {"id": "m4", "name": "Matcha Latte", "price": Decimal("5.49"), "desc": "Ceremonial-grade matcha, oat milk, light sweetness", "image": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80"},
    ]},
    {"id": 4, "title": "The Burrito Bandito", "cuisine": "Mexican", "meta": "20–30 min • 1.0 mi", "type": "$$ • Burritos", "rating": "4.6", "reviews": 3210, "badge": "20% OFF", "badgeClass": "discount", "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80", "description": "Bandito-style burritos stuffed to bursting with slow-braised meats, house guac, pico, and charred jalapeños.", "menu": [
        {"id": "m1", "name": "Carne Asada Burrito", "price": Decimal("13.49"), "desc": "Grilled steak, rice, black beans, guac, pico", "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=400&q=80"},
        {"id": "m2", "name": "Chicken Quesadilla", "price": Decimal("10.99"), "desc": "Grilled chicken, pepper jack, crema", "image": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=400&q=80"},
        {"id": "m3", "name": "Nachos Loaded", "price": Decimal("11.49"), "desc": "Tortilla chips, queso, jalapeños, sour cream", "image": "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80"},
        {"id": "m4", "name": "Horchata", "price": Decimal("3.99"), "desc": "House-made rice drink, cinnamon, vanilla", "image": "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=400&q=80"},
    ]},
    {"id": 5, "title": "Spice Garden Bangkok", "cuisine": "Thai", "meta": "25–35 min • 1.8 mi", "type": "$$ • Thai", "rating": "4.7", "reviews": 1997, "badge": "BESTSELLER", "badgeClass": "bestseller", "image": "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80", "description": "Authentic Bangkok street food from a family recipe passed down three generations.", "menu": [
        {"id": "m1", "name": "Pad Thai (Shrimp)", "price": Decimal("14.49"), "desc": "Rice noodles, shrimp, tamarind, crushed peanuts", "image": "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=400&q=80"},
        {"id": "m2", "name": "Green Curry (Chicken)", "price": Decimal("13.99"), "desc": "Coconut milk, Thai basil, bamboo shoots", "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=400&q=80"},
        {"id": "m3", "name": "Tom Yum Soup", "price": Decimal("9.49"), "desc": "Spicy lemongrass broth, mushrooms, shrimp", "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80"},
        {"id": "m4", "name": "Mango Sticky Rice", "price": Decimal("7.99"), "desc": "Glutinous rice, fresh mango, coconut cream", "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80"},
    ]},
    {"id": 6, "title": "Green Fork Kitchen", "cuisine": "Healthy", "meta": "15–25 min • 0.8 mi", "type": "$$ • Bowls", "rating": "4.8", "reviews": 1120, "badge": "NEW", "badgeClass": "new", "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80", "description": "Green Fork serves nutrient-dense grain bowls, cold-pressed juices, and plant-forward plates.", "menu": [
        {"id": "m1", "name": "Harvest Grain Bowl", "price": Decimal("13.99"), "desc": "Farro, roasted veg, tahini dressing, pepitas", "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80"},
        {"id": "m2", "name": "Avocado Power Toast", "price": Decimal("9.99"), "desc": "Sourdough, smashed avocado, everything bagel seasoning", "image": "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?auto=format&fit=crop&w=400&q=80"},
        {"id": "m3", "name": "Green Detox Juice", "price": Decimal("6.49"), "desc": "Kale, cucumber, apple, ginger, lemon", "image": "https://images.unsplash.com/photo-1570696516188-ade861b84a49?auto=format&fit=crop&w=400&q=80"},
        {"id": "m4", "name": "Protein Smoothie", "price": Decimal("7.99"), "desc": "Almond milk, banana, pea protein, cacao", "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=400&q=80"},
    ]},
    {"id": 7, "title": "Inferno Pizza Co.", "cuisine": "Pizza", "meta": "25–35 min • 1.4 mi", "type": "$$ • Pizza", "rating": "4.8", "reviews": 2891, "badge": "BESTSELLER", "badgeClass": "bestseller", "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", "description": "Inferno Pizza Co. fires every pie in a 900°F wood-burning oven.", "menu": [
        {"id": "m1", "name": "Margherita Classica", "price": Decimal("13.99"), "desc": "San Marzano tomato, fresh mozzarella, basil, olive oil", "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80"},
        {"id": "m2", "name": "Diavola (Spicy)", "price": Decimal("15.99"), "desc": "Spicy salami, nduja, chili flakes, smoked mozzarella", "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80"},
        {"id": "m3", "name": "Truffle Mushroom", "price": Decimal("16.99"), "desc": "Wild mushrooms, truffle oil, fontina, fresh thyme", "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80"},
        {"id": "m4", "name": "BBQ Chicken Pizza", "price": Decimal("15.49"), "desc": "Smoky BBQ sauce, grilled chicken, red onion, cilantro", "image": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=400&q=80"},
        {"id": "m5", "name": "Garlic Knots (6pc)", "price": Decimal("5.99"), "desc": "House-made dough, roasted garlic butter, parmesan", "image": "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=400&q=80"},
        {"id": "m6", "name": "Tiramisu", "price": Decimal("6.99"), "desc": "Classic Italian dessert, espresso-soaked ladyfingers, mascarpone", "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80"},
    ]},
    {"id": 8, "title": "Grounds & Glory", "cuisine": "Coffee", "meta": "10–20 min • 0.6 mi", "type": "$ • Coffee", "rating": "4.9", "reviews": 3102, "badge": "BESTSELLER", "badgeClass": "bestseller", "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80", "description": "Your neighborhood specialty coffee bar with single-origin espresso and freshly baked pastries.", "menu": [
        {"id": "m1", "name": "Signature Latte", "price": Decimal("5.99"), "desc": "Double espresso, steamed oat milk, house vanilla syrup", "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80"},
        {"id": "m2", "name": "Cold Brew Float", "price": Decimal("6.49"), "desc": "18-hour cold brew, vanilla ice cream, caramel drizzle", "image": "https://images.unsplash.com/photo-1517959105821-eaf2591984d2?auto=format&fit=crop&w=400&q=80"},
        {"id": "m3", "name": "Matcha Oat Latte", "price": Decimal("6.49"), "desc": "Ceremonial matcha, oat milk, honey", "image": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80"},
        {"id": "m4", "name": "Butter Croissant", "price": Decimal("3.99"), "desc": "Freshly baked, flaky, golden French-style croissant", "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"},
        {"id": "m5", "name": "Avocado Toast", "price": Decimal("8.99"), "desc": "Sourdough, smashed avocado, chili flakes, microgreens", "image": "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?auto=format&fit=crop&w=400&q=80"},
    ]},
    {"id": 9, "title": "Sugar Rush Creamery", "cuisine": "Desserts", "meta": "15–25 min • 1.1 mi", "type": "$ • Desserts", "rating": "4.8", "reviews": 1876, "badge": "20% OFF", "badgeClass": "discount", "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80", "description": "Handcrafted ice cream, decadent cakes, and gourmet dessert boxes made fresh daily.", "menu": [
        {"id": "m1", "name": "Cookie Dough Sundae", "price": Decimal("8.99"), "desc": "Vanilla ice cream, edible cookie dough, hot fudge, whipped cream", "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80"},
        {"id": "m2", "name": "Strawberry Cheesecake", "price": Decimal("7.49"), "desc": "New York-style cheesecake, fresh strawberry compote", "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=400&q=80"},
        {"id": "m3", "name": "Churro Waffle", "price": Decimal("9.49"), "desc": "Crispy waffle, cinnamon sugar, dulce de leche drizzle", "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80"},
        {"id": "m4", "name": "Brownie Bliss Box", "price": Decimal("12.99"), "desc": "Six fudgy brownies, salted caramel, dark chocolate", "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80"},
        {"id": "m5", "name": "Mango Sorbet (2 scoops)", "price": Decimal("5.49"), "desc": "Dairy-free, fresh mango, lime zest", "image": "https://images.unsplash.com/photo-1567206563114-c179706a56d5?auto=format&fit=crop&w=400&q=80"},
    ]},
]

for r in restaurants:
    table.put_item(Item=r)
    print(f"✅ Seeded: {r['title']} with {len(r['menu'])} menu items")

print("\n🎉 All restaurants and menus seeded successfully!")