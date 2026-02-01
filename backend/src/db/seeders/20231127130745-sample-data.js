





















const db = require('../models');
const Users = db.users;






const MenuItems = db.menu_items;

const Categories = db.categories;

const Promotions = db.promotions;

const Reservations = db.reservations;

const Pitches = db.pitches;

const Locations = db.locations;

const Orders = db.orders;

const Media = db.media;

const Pages = db.pages;







const MenuItemsData = [
    
    {
    
        
        
            
                "title": "Orange Coffee",
            
        
    
        
        
            
                "description": "Bright orange notes balanced with smooth dark chocolate finish",
            
        
    
        
        
            
                "price": 180.0,
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "item_type": "Coffee",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "ingredients": "espresso, orange zest syrup, cocoa nib garnish",
            
        
    
        
        
            
                "is_featured": true,
            
        
    
        
        
            
                "is_available": true,
            
        
    
    },
    
    {
    
        
        
            
                "title": "Spanish Latté",
            
        
    
        
        
            
                "description": "Creamy Spanish style latté, available iced or hot",
            
        
    
        
        
            
                "price": 160.0,
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "item_type": "Frappes",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "ingredients": "espresso, condensed milk, steamed milk",
            
        
    
        
        
            
                "is_featured": true,
            
        
    
        
        
            
                "is_available": true,
            
        
    
    },
    
    {
    
        
        
            
                "title": "CEO Latté",
            
        
    
        
        
            
                "description": "Signature hot latté with a smooth balanced finish",
            
        
    
        
        
            
                "price": 170.0,
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "item_type": "Cocktail",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "ingredients": "espresso, oat milk, honey drizzle",
            
        
    
        
        
            
                "is_featured": true,
            
        
    
        
        
            
                "is_available": true,
            
        
    
    },
    
    {
    
        
        
            
                "title": "Spice & Star",
            
        
    
        
        
            
                "description": "Buttery cinnamon spiced cocktail with star anise aromatics",
            
        
    
        
        
            
                "price": 250.0,
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "item_type": "Coffee",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "ingredients": "rum, butter wash, cinnamon syrup, star anise",
            
        
    
        
        
            
                "is_featured": true,
            
        
    
        
        
            
                "is_available": true,
            
        
    
    },
    
];



const CategoriesData = [
    
    {
    
        
        
            
                "name": "Coffee",
            
        
    
        
        
            
                "description": "Specialty and signature coffee selections",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
    {
    
        
        
            
                "name": "Cocktails",
            
        
    
        
        
            
                "description": "Creative cocktails with playful flavors",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
    {
    
        
        
            
                "name": "Food",
            
        
    
        
        
            
                "description": "Collaborative food items like burgers and wings",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
    {
    
        
        
            
                "name": "Frappes",
            
        
    
        
        
            
                "description": "Blended cold beverages and frappes",
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
    },
    
];



const PromotionsData = [
    
    {
    
        
        
            
                "title": "Matcha Monday Buy 1 Free 1",
            
        
    
        
        
            
                "description": "Buy one matcha latté and get one free every Monday",
            
        
    
        
        
            
                "start": new Date('2026-02-02T00:00:00Z'),
            
        
    
        
        
            
                "end": new Date('2026-12-31T23:59:59Z'),
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "active": true,
            
        
    
        
        
            
                "discount": 50.0,
            
        
    
    },
    
    {
    
        
        
            
                "title": "Get Diego'd Event Special",
            
        
    
        
        
            
                "description": "Book an event and get a complimentary beer case for large bookings",
            
        
    
        
        
            
                "start": new Date('2026-03-01T00:00:00Z'),
            
        
    
        
        
            
                "end": new Date('2026-12-31T23:59:59Z'),
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "active": true,
            
        
    
        
        
            
                "discount": 0.0,
            
        
    
    },
    
    {
    
        
        
            
                "title": "Happy Hour Cocktails",
            
        
    
        
        
            
                "description": "Discounted cocktails from 6pm to 8pm daily",
            
        
    
        
        
            
                "start": new Date('2026-01-01T10:00:00Z'),
            
        
    
        
        
            
                "end": new Date('2026-12-31T22:00:00Z'),
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "active": true,
            
        
    
        
        
            
                "discount": 20.0,
            
        
    
    },
    
    {
    
        
        
            
                "title": "Student Discount",
            
        
    
        
        
            
                "description": "Students get 10 percent off coffee with ID",
            
        
    
        
        
            
                "start": new Date('2026-01-01T00:00:00Z'),
            
        
    
        
        
            
                "end": new Date('2026-12-31T23:59:59Z'),
            
        
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "active": true,
            
        
    
        
        
            
                "discount": 10.0,
            
        
    
    },
    
];



const ReservationsData = [
    
    {
    
        
        
            
                "name": "Ana Moreno",
            
        
    
        
        
            
                "email": "ana.moreno@example.com",
            
        
    
        
        
            
                "phone": "+63 917 000 1111",
            
        
    
        
        
            
                "message": "Birthday reservation, cake allowed",
            
        
    
        
        
            
                "reservation_start": new Date('2026-03-15T18:00:00Z'),
            
        
    
        
        
            
                "reservation_end": new Date('2026-03-15T21:00:00Z'),
            
        
    
        
        
            
                "party_size": 12,
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "status": "completed",
            
        
    
    },
    
    {
    
        
        
            
                "name": "Marco Santos",
            
        
    
        
        
            
                "email": "marco.santos@example.com",
            
        
    
        
        
            
                "phone": "+63 917 000 2222",
            
        
    
        
        
            
                "message": "Corporate small meetup",
            
        
    
        
        
            
                "reservation_start": new Date('2026-04-02T16:00:00Z'),
            
        
    
        
        
            
                "reservation_end": new Date('2026-04-02T19:00:00Z'),
            
        
    
        
        
            
                "party_size": 20,
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "status": "pending",
            
        
    
    },
    
    {
    
        
        
            
                "name": "Liza Cruz",
            
        
    
        
        
            
                "email": "liza.cruz@example.com",
            
        
    
        
        
            
                "phone": "+63 917 000 3333",
            
        
    
        
        
            
                "message": "Anniversary dinner, corner table please",
            
        
    
        
        
            
                "reservation_start": new Date('2026-02-20T19:00:00Z'),
            
        
    
        
        
            
                "reservation_end": new Date('2026-02-20T22:00:00Z'),
            
        
    
        
        
            
                "party_size": 2,
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "status": "cancelled",
            
        
    
    },
    
    {
    
        
        
            
                "name": "Team Build Inc",
            
        
    
        
        
            
                "email": "events@teambuild.com",
            
        
    
        
        
            
                "phone": "+63 917 000 4444",
            
        
    
        
        
            
                "message": "Large booking request with photobooth",
            
        
    
        
        
            
                "reservation_start": new Date('2026-05-10T15:00:00Z'),
            
        
    
        
        
            
                "reservation_end": new Date('2026-05-10T20:00:00Z'),
            
        
    
        
        
            
                "party_size": 50,
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                "status": "pending",
            
        
    
    },
    
];



const PitchesData = [
    
    {
    
        
        
            
                "name": "Sofia Martinez",
            
        
    
        
        
            
                "email": "sofia.martinez@example.com",
            
        
    
        
        
            
                "pitch_type": "collaboration",
            
        
    
        
        
            
                "message": "Request to host a small poetry night collaboration",
            
        
    
        
        
            
                "submitted_at": new Date('2026-01-20T08:30:00Z'),
            
        
    
        
        
            
                "notified": false,
            
        
    
    },
    
    {
    
        
        
            
                "name": "OhSo Social",
            
        
    
        
        
            
                "email": "ohso@socialph.com",
            
        
    
        
        
            
                "pitch_type": "sponsorship",
            
        
    
        
        
            
                "message": "Baked goods pop up collaboration proposal",
            
        
    
        
        
            
                "submitted_at": new Date('2026-01-22T10:00:00Z'),
            
        
    
        
        
            
                "notified": false,
            
        
    
    },
    
    {
    
        
        
            
                "name": "Whitecap Bakehouse",
            
        
    
        
        
            
                "email": "contact@whitecap_bakehouse.com",
            
        
    
        
        
            
                "pitch_type": "collaboration",
            
        
    
        
        
            
                "message": "Weekly pastry supply collaboration",
            
        
    
        
        
            
                "submitted_at": new Date('2026-01-25T12:00:00Z'),
            
        
    
        
        
            
                "notified": false,
            
        
    
    },
    
    {
    
        
        
            
                "name": "DJ Kito",
            
        
    
        
        
            
                "email": "dj.kito@example.com",
            
        
    
        
        
            
                "pitch_type": "sponsorship",
            
        
    
        
        
            
                "message": "Live DJ set proposal for weekend",
            
        
    
        
        
            
                "submitted_at": new Date('2026-02-01T14:30:00Z'),
            
        
    
        
        
            
                "notified": true,
            
        
    
    },
    
];



const LocationsData = [
    
    {
    
        
        
            
                "name": "Diego Lucena - Pleasantville",
            
        
    
        
        
            
                "address": "Pleasantville, Lucena City, Quezon Province",
            
        
    
        
        
            
                "latitude": 13.9415,
            
        
    
        
        
            
                "longitude": 121.6141,
            
        
    
        
        
            
                "hours": "3pm-10pm daily",
            
        
    
        
        
            
                "phone": "+63 42 123 4567",
            
        
    
        
        
            
                "city": "Lucena",
            
        
    
        
        
            
                "is_open": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "Diego Sariaya",
            
        
    
        
        
            
                "address": "Quiminiano St., Brgy 3, Arellano Subd., Sariaya, Quezon",
            
        
    
        
        
            
                "latitude": 13.969,
            
        
    
        
        
            
                "longitude": 121.542,
            
        
    
        
        
            
                "hours": "3pm-10pm daily",
            
        
    
        
        
            
                "phone": "+63 42 234 5678",
            
        
    
        
        
            
                "city": "Sariaya",
            
        
    
        
        
            
                "is_open": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "Diego Lucban",
            
        
    
        
        
            
                "address": "Lucban Town Plaza, Lucban, Quezon Province",
            
        
    
        
        
            
                "latitude": 14.0882,
            
        
    
        
        
            
                "longitude": 121.5733,
            
        
    
        
        
            
                "hours": "3pm-10pm daily",
            
        
    
        
        
            
                "phone": "+63 42 345 6789",
            
        
    
        
        
            
                "city": "Lucena",
            
        
    
        
        
            
                "is_open": true,
            
        
    
    },
    
    {
    
        
        
            
                "name": "Diego Pop Up - Beachfront",
            
        
    
        
        
            
                "address": "Seasonal beachfront pop up location",
            
        
    
        
        
            
                "latitude": 13.9,
            
        
    
        
        
            
                "longitude": 121.6,
            
        
    
        
        
            
                "hours": "4pm-11pm weekend pop up",
            
        
    
        
        
            
                "phone": "+63 42 456 7890",
            
        
    
        
        
            
                "city": "Lucban",
            
        
    
        
        
            
                "is_open": true,
            
        
    
    },
    
];



const OrdersData = [
    
    {
    
        
        
            
                "reference": "ORD-20260201-0001",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_many" field
            
        
    
        
        
            
                "total": 380.0,
            
        
    
        
        
            
                "status": "cancelled",
            
        
    
        
        
            
                "pickup_time": new Date('2026-02-01T15:30:00Z'),
            
        
    
        
        
            
                "paid": true,
            
        
    
        
        
            
                "stripe_charge": "ch_1ExampleCharge",
            
        
    
    },
    
    {
    
        
        
            
                "reference": "ORD-20260202-0002",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_many" field
            
        
    
        
        
            
                "total": 250.0,
            
        
    
        
        
            
                "status": "cancelled",
            
        
    
        
        
            
                "pickup_time": new Date('2026-02-02T19:00:00Z'),
            
        
    
        
        
            
                "paid": true,
            
        
    
        
        
            
                "stripe_charge": "ch_1ExampleCharge2",
            
        
    
    },
    
    {
    
        
        
            
                "reference": "ORD-20260203-0003",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_many" field
            
        
    
        
        
            
                "total": 170.0,
            
        
    
        
        
            
                "status": "cancelled",
            
        
    
        
        
            
                "pickup_time": new Date('2026-02-03T16:15:00Z'),
            
        
    
        
        
            
                "paid": false,
            
        
    
        
        
            
                "stripe_charge": "",
            
        
    
    },
    
    {
    
        
        
            
                "reference": "ORD-20260204-0004",
            
        
    
        
        
            
                // type code here for "relation_one" field
            
        
    
        
        
            
                // type code here for "relation_many" field
            
        
    
        
        
            
                "total": 350.0,
            
        
    
        
        
            
                "status": "preparing",
            
        
    
        
        
            
                "pickup_time": new Date('2026-02-04T13:45:00Z'),
            
        
    
        
        
            
                "paid": true,
            
        
    
        
        
            
                "stripe_charge": "ch_1ExampleCharge3",
            
        
    
    },
    
];



const MediaData = [
    
    {
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "alt_text": "vibrant orange coffee",
            
        
    
        
        
            
                "caption": "Orange Coffee hero shot",
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "alt_text": "cozy interior with string lights",
            
        
    
        
        
            
                "caption": "Diego cozy corner",
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "alt_text": "crowd enjoying live music",
            
        
    
        
        
            
                "caption": "Acoustic night",
            
        
    
    },
    
    {
    
        
        
            
                // type code here for "images" field
            
        
    
        
        
            
                "alt_text": "photobooth fun with props",
            
        
    
        
        
            
                "caption": "Photobooth gallery",
            
        
    
    },
    
];



const PagesData = [
    
    {
    
        
        
            
                "slug": "home",
            
        
    
        
        
            
                "title": "Diego Coffee & Cocktail Studio",
            
        
    
        
        
            
                "content": "Mabuhay to Diego a little playground in Lucena offering specialty coffee creative cocktails and playful chaosaccessible and fun",
            
        
    
    },
    
    {
    
        
        
            
                "slug": "about",
            
        
    
        
        
            
                "title": "Our Story",
            
        
    
        
        
            
                "content": "From beachfront brews to cozy haunts Diego brings fun to every sip with collaborations baked goods and photobooths",
            
        
    
    },
    
    {
    
        
        
            
                "slug": "menu",
            
        
    
        
        
            
                "title": "Menu",
            
        
    
        
        
            
                "content": "Explore coffee cocktails and food items with ingredient modals and filters for easy browsingdiscover your next favorite",
            
        
    
    },
    
    {
    
        
        
            
                "slug": "locations",
            
        
    
        
        
            
                "title": "Locations",
            
        
    
        
        
            
                "content": "Visit us in Lucena Lucban and Sariaya with map integration and delivery info around town proper",
            
        
    
    },
    
];




    
    
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
            // Similar logic for "relation_many"
        
    

    
    
    
    
    
        
    
        
    
        
    
        
            
            async function associateMenuItemWithCategory() {
            
                const relatedCategory0 = await Categories.findOne({
                    offset: Math.floor(Math.random() * (await Categories.count())),
                });
                const MenuItem0 = await MenuItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (MenuItem0?.setCategory)
                {
                    await
                    MenuItem0.
                    setCategory(relatedCategory0);
                }
            
                const relatedCategory1 = await Categories.findOne({
                    offset: Math.floor(Math.random() * (await Categories.count())),
                });
                const MenuItem1 = await MenuItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (MenuItem1?.setCategory)
                {
                    await
                    MenuItem1.
                    setCategory(relatedCategory1);
                }
            
                const relatedCategory2 = await Categories.findOne({
                    offset: Math.floor(Math.random() * (await Categories.count())),
                });
                const MenuItem2 = await MenuItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (MenuItem2?.setCategory)
                {
                    await
                    MenuItem2.
                    setCategory(relatedCategory2);
                }
            
                const relatedCategory3 = await Categories.findOne({
                    offset: Math.floor(Math.random() * (await Categories.count())),
                });
                const MenuItem3 = await MenuItems.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (MenuItem3?.setCategory)
                {
                    await
                    MenuItem3.
                    setCategory(relatedCategory3);
                }
            
        }
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
            
            async function associateReservationWithLocation() {
            
                const relatedLocation0 = await Locations.findOne({
                    offset: Math.floor(Math.random() * (await Locations.count())),
                });
                const Reservation0 = await Reservations.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Reservation0?.setLocation)
                {
                    await
                    Reservation0.
                    setLocation(relatedLocation0);
                }
            
                const relatedLocation1 = await Locations.findOne({
                    offset: Math.floor(Math.random() * (await Locations.count())),
                });
                const Reservation1 = await Reservations.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Reservation1?.setLocation)
                {
                    await
                    Reservation1.
                    setLocation(relatedLocation1);
                }
            
                const relatedLocation2 = await Locations.findOne({
                    offset: Math.floor(Math.random() * (await Locations.count())),
                });
                const Reservation2 = await Reservations.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Reservation2?.setLocation)
                {
                    await
                    Reservation2.
                    setLocation(relatedLocation2);
                }
            
                const relatedLocation3 = await Locations.findOne({
                    offset: Math.floor(Math.random() * (await Locations.count())),
                });
                const Reservation3 = await Reservations.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Reservation3?.setLocation)
                {
                    await
                    Reservation3.
                    setLocation(relatedLocation3);
                }
            
        }
        
    
        
    

    
    
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
            
            async function associateOrderWithCustomer() {
            
                const relatedCustomer0 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Order0 = await Orders.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Order0?.setCustomer)
                {
                    await
                    Order0.
                    setCustomer(relatedCustomer0);
                }
            
                const relatedCustomer1 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Order1 = await Orders.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Order1?.setCustomer)
                {
                    await
                    Order1.
                    setCustomer(relatedCustomer1);
                }
            
                const relatedCustomer2 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Order2 = await Orders.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Order2?.setCustomer)
                {
                    await
                    Order2.
                    setCustomer(relatedCustomer2);
                }
            
                const relatedCustomer3 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Order3 = await Orders.findOne({
                    order: [['id', 'ASC']],
                    offset: 3
                });
                if (Order3?.setCustomer)
                {
                    await
                    Order3.
                    setCustomer(relatedCustomer3);
                }
            
        }
        
    
        
            // Similar logic for "relation_many"
        
    
        
    
        
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
    

    
    
    
        
    
        
    
        
    


module.exports = {
    up: async (queryInterface, Sequelize) => {
        
            
            
            
            
            
                
                await MenuItems.bulkCreate(MenuItemsData);
                
            
            
                
                await Categories.bulkCreate(CategoriesData);
                
            
            
                
                await Promotions.bulkCreate(PromotionsData);
                
            
            
                
                await Reservations.bulkCreate(ReservationsData);
                
            
            
                
                await Pitches.bulkCreate(PitchesData);
                
            
            
                
                await Locations.bulkCreate(LocationsData);
                
            
            
                
                await Orders.bulkCreate(OrdersData);
                
            
            
                
                await Media.bulkCreate(MediaData);
                
            
            
                
                await Pages.bulkCreate(PagesData);
                
            
            await Promise.all([
            
                
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                        // Similar logic for "relation_many"
                    
                
            
                
                
                
                
                    
                
                    
                
                    
                
                    
                        
                        await associateMenuItemWithCategory(),
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                        
                        await associateReservationWithLocation(),
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                        
                        await associateOrderWithCustomer(),
                    
                
                    
                        // Similar logic for "relation_many"
                    
                
                    
                
                    
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
            
                
                
                    
                
                    
                
                    
                
            
            ]);
        
    },

    down: async (queryInterface, Sequelize) => {
        
            
            
            
            
            
            await queryInterface.bulkDelete('menu_items', null, {});
            
            
            await queryInterface.bulkDelete('categories', null, {});
            
            
            await queryInterface.bulkDelete('promotions', null, {});
            
            
            await queryInterface.bulkDelete('reservations', null, {});
            
            
            await queryInterface.bulkDelete('pitches', null, {});
            
            
            await queryInterface.bulkDelete('locations', null, {});
            
            
            await queryInterface.bulkDelete('orders', null, {});
            
            
            await queryInterface.bulkDelete('media', null, {});
            
            
            await queryInterface.bulkDelete('pages', null, {});
            
        
    },
};