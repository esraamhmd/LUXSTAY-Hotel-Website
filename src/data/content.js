export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Rooms",
    href: "/rooms",
    dropdown: [
      { label: "Luxury", href: "/rooms?type=Luxury" },
      { label: "Single", href: "/rooms?type=Single" },
      { label: "Small Suite", href: "/rooms?type=Small Suite" },
      { label: "Family", href: "/rooms?type=Family" },
    ],
  },
  {
    label: "Experience",
    href: "/#experience",
    dropdown: [
      { label: "Restaurant & Bar", href: "/restaurant" },
      { label: "Spa & Wellness", href: "/spa" },
      { label: "Gallery", href: "/#gallery" },
    ],
  },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export const amenities = [
  {
    icon: "GiVacuumCleaner",
    title: "Daily Housekeeping",
    text: "Fresh linens and a tidy room every single day, handled quietly while you're out.",
  },
  {
    icon: "FaWifi",
    title: "High-Speed WiFi",
    text: "Complimentary fibre WiFi in every room, suite, and shared lounge on property.",
  },
  {
    icon: "FaCarSide",
    title: "Airport Pickup",
    text: "A private car meets your flight and brings you straight to check-in, no waiting.",
  },
  {
    icon: "FaSwimmer",
    title: "Rooftop Pool",
    text: "A heated infinity pool on the top floor, open until midnight for guests.",
  },
  {
    icon: "FaDumbbell",
    title: "Fitness Studio",
    text: "A full studio with free weights, cardio machines, and a daily yoga class.",
  },
  {
    icon: "FaConciergeBell",
    title: "24/7 Concierge",
    text: "Someone on hand around the clock for reservations, tickets, or local tips.",
  },
];

export const roomFilters = ["All Rooms", "Luxury", "Single", "Small Suite", "Family"];


const CLOUDINARY_BASE = "https://res.cloudinary.com/aknzol6r/image/upload";
const room1 = `${CLOUDINARY_BASE}/v1784459661/luxstay/room-1.avif`;
const room2 = `${CLOUDINARY_BASE}/v1784459663/luxstay/room-2.avif`;
const room3 = `${CLOUDINARY_BASE}/v1784459663/luxstay/room-3.avif`;
const room4 = `${CLOUDINARY_BASE}/v1784459666/luxstay/room-4.jpg`;
const room5 = `${CLOUDINARY_BASE}/v1784459668/luxstay/room-5.avif`;
const room6 = `${CLOUDINARY_BASE}/v1784459672/luxstay/room-6.jpg`;
const room7 = `${CLOUDINARY_BASE}/v1784459647/luxstay/oom-7.avif`;
const room8 = `${CLOUDINARY_BASE}/v1784459675/luxstay/room-8.avif`;
const room9 = `${CLOUDINARY_BASE}/v1784459677/luxstay/room-9.avif`;
const room10 = `${CLOUDINARY_BASE}/v1784459662/luxstay/room-10.avif`;

const photoPools = {
  Luxury: [room1, room2, room3, room4, room5, room6, room7, room8, room9, room10],
  Single: [room1, room10, room2, room9, room3, room8, room4, room7, room5, room6],
  "Small Suite": [room1, room3, room5, room7, room9, room2, room4, room6, room8, room10],
  Family: [room2, room5, room8, room1, room9, room4, room10, room3, room7, room6],
};

const viewOptions = ["City View", "Garden View", "Pool View", "Ocean View", "Courtyard View"];
const amenitySets = [
  ["Free WiFi", "Air Conditioning", "Mini Bar", "Room Service"],
  ["Free WiFi", "Balcony", "Rain Shower", "Smart TV"],
  ["Free WiFi", "Air Conditioning", "Work Desk", "Coffee Machine"],
  ["Free WiFi", "Bathtub", "Room Service", "Smart TV"],
  ["Free WiFi", "Air Conditioning", "Balcony", "Mini Bar"],
];

function buildCategory(category, basePrice, baseSize, baseGuests, baseBeds, startId) {
  return Array.from({ length: 10 }).map((_, i) => {
    const n = i + 1;
    return {
      id: startId + i,
      name: `${category} ${String.fromCharCode(65 + i)}${n}`,
      category,
      price: basePrice + i * 12,
      image: photoPools[category][i % photoPools[category].length],
      size: `${baseSize + i * 2} m²`,
      guests: baseGuests,
      beds: baseBeds,
      view: viewOptions[i % viewOptions.length],
      rating: (4.4 + (i % 6) * 0.1).toFixed(1),
      description:
        `A ${category.toLowerCase()} room finished in warm oak and brushed brass, with ${viewOptions[i % viewOptions.length].toLowerCase()} and quiet, book-lined corners for slow mornings.`,
      roomAmenities: amenitySets[i % amenitySets.length],
    };
  });
}

export const rooms = [
  ...buildCategory("Luxury", 259, 48, 2, "1 King Bed", 1),
  ...buildCategory("Single", 89, 18, 1, "1 Single Bed", 11),
  ...buildCategory("Small Suite", 149, 30, 2, "1 Queen Bed", 21),
  ...buildCategory("Family", 219, 46, 4, "2 Queen Beds", 31),
];

export const testimonials = [
  {
    name: "Amelia Hart",
    role: "Travel Blogger",
    quote:
      "Every detail felt considered, from the quiet hallways to the staff remembering my name by day two. It's the calmest luxury stay I've had in years.",
    image: `${CLOUDINARY_BASE}/v1784459620/luxstay/co-1.avif`,
  },
  {
    name: "Daniel Reyes",
    role: "Architect",
    quote:
      "The room design alone is worth the trip. Clean lines, warm light, and a view that changes the whole mood of the evening.",
    image: `${CLOUDINARY_BASE}/v1784459621/luxstay/co-2.avif`,
  },
  {
    name: "Priya Nair",
    role: "Marketing Director",
    quote:
      "I booked for a work trip and stayed an extra night just for the rooftop pool. The concierge team planned my whole weekend.",
    image: `${CLOUDINARY_BASE}/v1784459622/luxstay/co-3.avif`,
  },
];


export const comments = [
  { name: "Sarah Collins", rating: 5, date: "June 2026", text: "Spotless room, the bed was ridiculously comfortable, and the rooftop pool view at sunset made the whole trip." },
  { name: "Marcus Webb", rating: 5, date: "June 2026", text: "Booked the Family suite for four nights. Staff sorted a late check-out with no fuss at all. Would come back." },
  { name: "Lina Fahmy", rating: 4, date: "May 2026", text: "Lovely, quiet property close to downtown. Breakfast was excellent. Wifi dropped once but support fixed it fast." },
  { name: "Tom Richter", rating: 5, date: "May 2026", text: "The Luxury room's balcony view alone is worth the price. Concierge got us a same-day spa slot too." },
  { name: "Aiko Tanaka", rating: 5, date: "April 2026", text: "Second stay this year. Consistent, calm, and the housekeeping team is genuinely thoughtful." },
  { name: "Omar Haddad", rating: 4, date: "April 2026", text: "Great value for a Small Suite this size. Only note: the gym gets busy around 7am." },
  { name: "Grace Kim", rating: 5, date: "March 2026", text: "Restaurant on-site is worth booking even if you're not staying. Ask for a window table." },
  { name: "Ben Osei", rating: 5, date: "March 2026", text: "Airport pickup was on time to the minute and the driver was great company on a long trip." },
  { name: "Isabelle Moreau", rating: 4, date: "February 2026", text: "Single room was compact but very smartly laid out. Perfect for a short solo work trip." },
  { name: "Ryan Coleman", rating: 5, date: "February 2026", text: "Booked online in minutes, confirmation came within the hour, check-in was seamless." },
];

// 10 gallery photos
export const galleryImages = [
  { src: `${CLOUDINARY_BASE}/v1784459631/luxstay/img-1.avif`, caption: "Lobby lounge" },
  { src: `${CLOUDINARY_BASE}/v1784459633/luxstay/img-2.avif`, caption: "Deluxe bedroom" },
  { src: `${CLOUDINARY_BASE}/v1784459634/luxstay/img-3.avif`, caption: "Rooftop pool" },
  { src: `${CLOUDINARY_BASE}/v1784459635/luxstay/img-4.avif`, caption: "Suite bathroom" },
  { src: `${CLOUDINARY_BASE}/v1784459637/luxstay/img-5.avif`, caption: "Guest bedroom" },
  { src: `${CLOUDINARY_BASE}/v1784459637/luxstay/img-6.avif`, caption: "Family suite" },
  { src: `${CLOUDINARY_BASE}/v1784459638/luxstay/img-7.avif`, caption: "The Ember Room" },
  { src: `${CLOUDINARY_BASE}/v1784459644/luxstay/img-8.jpg`, caption: "Spa & wellness" },
  { src: `${CLOUDINARY_BASE}/v1784459645/luxstay/img-9.avif`, caption: "Suite at dusk" },
  { src: `${CLOUDINARY_BASE}/v1784459632/luxstay/img-10.avif`, caption: "Penthouse view" },
];

// Slideshow images 
export const heroSlideshow = [
  `${CLOUDINARY_BASE}/v1784459623/luxstay/hero-1.avif`,
  `${CLOUDINARY_BASE}/v1784459624/luxstay/hero-2.avif`,
  `${CLOUDINARY_BASE}/v1784459626/luxstay/hero-3.avif`,
  `${CLOUDINARY_BASE}/v1784459629/luxstay/hero-4.avif`,
  `${CLOUDINARY_BASE}/v1784459630/luxstay/hero-5.avif`,
];

// Full detail for the two Experience pages (Restaurant & Bar, Spa & Wellness)
export const experiences = {
  restaurant: {
    slug: "restaurant",
    eyebrow: "Our Food",
    title: "The Ember Room",
    tagline: "A seasonal, farm-to-table restaurant and bar",
    heroImage: `${CLOUDINARY_BASE}/v1784459660/luxstay/rest.jpg`,
    description:
      "A seasonal, farm-to-table menu served in a dining room built for long, unhurried evenings. Breakfast, lunch, and a tasting menu after dark, with a bar program built around small producers and slow-poured cocktails.",
    hours: [
      { label: "Breakfast", time: "7:00 AM – 10:30 AM" },
      { label: "Lunch", time: "12:00 PM – 3:00 PM" },
      { label: "Dinner", time: "6:00 PM – 11:00 PM" },
      { label: "Bar", time: "5:00 PM – 1:00 AM" },
    ],
    features: [
      "Seasonal tasting menu, changed monthly",
      "Farm-to-table produce from local growers",
      "Extensive natural wine list",
      "Private dining room for up to 12 guests",
      "Live acoustic sets on Friday evenings",
      "Full vegetarian and gluten-free menus",
    ],
    gallery: [
     `${CLOUDINARY_BASE}/v1784459648/luxstay/rest-1.webp`,
     `${CLOUDINARY_BASE}/v1784459648/luxstay/rest-2.webp`,
     `${CLOUDINARY_BASE}/v1784459649/luxstay/rest-3.webp`,
     `${CLOUDINARY_BASE}/v1784459650/luxstay/rest-4.webp`,
    ],
  },
  spa: {
    slug: "spa",
    eyebrow: "Wind Down",
    title: "Spa & Wellness",
    tagline: "Steam, sauna, and treatments built around local ingredients",
    heroImage: `${CLOUDINARY_BASE}/v1784459687/luxstay/spa-4.jpg`,
    description:
      "A quiet, low-lit floor built for slowing down — steam room, dry sauna, and a treatment menu using ingredients sourced from growers within a short drive of the property. Book a slot at check-in or reserve ahead for your whole stay.",
    hours: [
      { label: "Spa Floor", time: "8:00 AM – 9:00 PM" },
      { label: "Treatments", time: "9:00 AM – 8:00 PM (by appointment)" },
      { label: "Steam & Sauna", time: "8:00 AM – 9:00 PM" },
    ],
    features: [
      "Full-body massage, 60 or 90 minute sessions",
      "Steam room and dry Finnish sauna",
      "Locally-sourced facial treatments",
      "Couples treatment suite",
      "Daily 7am and 6pm yoga sessions",
      "Robes, slippers, and herbal tea included",
    ],
    gallery: [
      `${CLOUDINARY_BASE}/v1784459681/luxstay/spa-1.jpg`,
      `${CLOUDINARY_BASE}/v1784459682/luxstay/spa-2.avif`,
      `${CLOUDINARY_BASE}/v1784459683/luxstay/spa-3.avif`,
      `${CLOUDINARY_BASE}/v1784459687/luxstay/spa-4.jpg`,
    ],
  },
};